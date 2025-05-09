import type { Express, Request, Response, NextFunction } from "express"; // Added Request, Response, NextFunction
import { createServer, type Server } from "http";
import { storage } from "./storage";
// Removed: import { setupAuth } from "./auth";
import axios from 'axios'; // Added axios
import { User as SelectUser } from "@shared/schema"; // Added User import

// Define a type for the request object after authentication
interface AuthenticatedRequest extends Request {
  user?: SelectUser; // Add user property
}

// Middleware to authenticate token using api-hamma
const authenticateToken = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (token == null) {
    return res.sendStatus(401); // if there isn't any token
  }

  try {
    const profileResponse = await axios.get<SelectUser>('https://api-hamma-f0bcaabf77ea.herokuapp.com/auth/profile/', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (profileResponse.status === 200 && profileResponse.data) {
      // User profile fetched successfully from external API
      const externalUser = profileResponse.data;

      // --- BEGIN REVISED EMAIL HANDLING ---
      // Extract email, checking top-level first, then nested 'user' property
      const email = externalUser.email ?? externalUser.user?.email;

      // Ensure we found a valid email
      if (!email || typeof email !== 'string') {
        console.error("External user profile is missing a valid email at top-level or nested 'user':", externalUser);
        // Send 401 as the token might be valid but the user data is incomplete for our system
        return res.status(401).json({ error: 'User profile incomplete (missing email)' });
      }

      // If email was nested, ensure the top-level externalUser object has it for findOrCreateUser
      // This assumes findOrCreateUser expects a flat structure matching BaseUser for creation.
      // We might need to adjust findOrCreateUser if it should handle nested data directly.
      // For now, let's ensure the object passed has the email property directly.
      const userPayloadForStorage = {
        ...externalUser, // Spread the original data
        ...(externalUser.user ?? {}), // Spread nested user data if it exists, potentially overwriting some top-level fields if names clash
        email: email // Explicitly set the validated email
      };
      // --- END REVISED EMAIL HANDLING ---


      // Find or create the user in the local database using the potentially adjusted payload
      // Note: findOrCreateUser uses the email from userPayloadForStorage now
      const localUser = await storage.findOrCreateUser(userPayloadForStorage as SelectUser); // Cast needed as we modified the structure

      // Attach the *local* user object (returned from storage) to the request
      req.user = localUser;
      next(); // pass the execution off to whatever request the client intended
    } else {
      res.sendStatus(401); // Invalid token or user not found by external API
    }
  } catch (error) {
    console.error("Token verification failed:", error);
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      return res.sendStatus(401); // Unauthorized from api-hamma
    }
    res.sendStatus(500); // Internal server error during verification
  }
};


export async function registerRoutes(app: Express): Promise<Server> {
  // Removed: setupAuth(app);

  // API routes
  app.get('/api/stocks', (req: Request, res: Response) => { // Added types
    const stocks = [
      { symbol: 'DANGCEM', price: 240.50, change: 2.5 },
      { symbol: 'GTCO', price: 28.75, change: 0.35 },
      { symbol: 'ZENITHBANK', price: 23.15, change: -0.45 },
      { symbol: 'MTN', price: 167.80, change: 1.2 },
      { symbol: 'NESTLE', price: 1250.00, change: -15.5 },
    ];
    
    res.json(stocks);
  });

  app.get('/api/market-summary', (req: Request, res: Response) => { // Added types
    const marketSummary = {
      nseIndex: 45862.32,
      change: 324.21,
      percentChange: 0.71,
      volume: '143.5M',
      marketCap: '23.7T',
      advancers: 24,
      decliners: 18,
      unchanged: 4,
      lastUpdated: new Date().toISOString()
    };
    
    res.json(marketSummary);
  });

  // Hamma University API Routes

  // Courses
  app.get('/api/university/courses', async (req: Request, res: Response) => { // Added types
    try {
      const courses = await storage.getCourses();
      res.json(courses);
    } catch (error) {
      console.error("Detailed error in GET /api/university/courses:", error); // Add detailed logging
      res.status(500).json({ error: 'Failed to fetch courses' });
    }
  });

  app.get('/api/university/courses/:id', async (req: Request, res: Response) => { // Added types
    try {
      const courseId = parseInt(req.params.id);
      const course = await storage.getCourseById(courseId);
      
      if (!course) {
        return res.status(404).json({ error: 'Course not found' });
      }
      
      res.json(course);
    } catch (error) {
      console.error("Detailed error in GET /api/university/courses/:id:", error); // Add detailed logging
      res.status(500).json({ error: 'Failed to fetch course' });
    }
  });

  // Lessons
  app.get('/api/university/courses/:courseId/lessons', async (req: Request, res: Response) => { // Added types
    try {
      const courseId = parseInt(req.params.courseId);
      const lessons = await storage.getLessonsByCourseId(courseId);
      
      res.json(lessons);
    } catch (error) {
      console.error("Detailed error in GET /api/university/courses/:courseId/lessons:", error); // Add detailed logging
      res.status(500).json({ error: 'Failed to fetch lessons' });
    }
  });

  app.get('/api/university/lessons/:id', async (req: Request, res: Response) => { // Added types
    try {
      const lessonId = parseInt(req.params.id);
      const lesson = await storage.getLessonById(lessonId);
      
      if (!lesson) {
        return res.status(404).json({ error: 'Lesson not found' });
      }
      
      res.json(lesson);
    } catch (error) {
      console.error("Detailed error in GET /api/university/lessons/:id:", error); // Add detailed logging
      res.status(500).json({ error: 'Failed to fetch lesson' });
    }
  });

  // Quizzes
  app.get('/api/university/courses/:courseId/quizzes', async (req: Request, res: Response) => { // Added types
    try {
      const courseId = parseInt(req.params.courseId);
      const quizzes = await storage.getQuizzesByCourseId(courseId);
      
      res.json(quizzes);
    } catch (error) {
      console.error("Detailed error in GET /api/university/courses/:courseId/quizzes:", error); // Add detailed logging
      res.status(500).json({ error: 'Failed to fetch quizzes' });
    }
  });

  app.get('/api/university/quizzes/:id', async (req: Request, res: Response) => { // Added types
    try {
      const quizId = parseInt(req.params.id);
      const quiz = await storage.getQuizById(quizId);
      
      if (!quiz) {
        return res.status(404).json({ error: 'Quiz not found' });
      }
      
      res.json(quiz);
    } catch (error) {
      console.error("Detailed error in GET /api/university/quizzes/:id:", error); // Add detailed logging
      res.status(500).json({ error: 'Failed to fetch quiz' });
    }
  });

  // Questions
  app.get('/api/university/quizzes/:quizId/questions', async (req: Request, res: Response) => { // Added types
    try {
      const quizId = parseInt(req.params.quizId);
      const questions = await storage.getQuestionsByQuizId(quizId);
      
      res.json(questions);
    } catch (error) {
      console.error("Detailed error in GET /api/university/quizzes/:quizId/questions:", error); // Add detailed logging
      res.status(500).json({ error: 'Failed to fetch questions' });
    }
  });

  // Quiz Results (Protected by authenticateToken middleware)
  app.get('/api/university/user/quiz-results', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
    // User (local user record) is attached to req.user by the middleware if authenticated
    if (!req.user) {
       // This case should ideally be handled by the middleware, but added as a safeguard
      return res.status(401).json({ error: 'Authentication failed or user not found' });
    }

    try {
      // req.user now holds the local User object from our database
      const userId = req.user.id; // Get user ID from the local user object
      const results = await storage.getUserQuizResults(userId);

      res.json(results);
    } catch (error) {
      console.error("Detailed error in GET /api/university/user/quiz-results:", error); // Add detailed logging
      res.status(500).json({ error: 'Failed to fetch quiz results' });
    }
  });

  app.post('/api/university/user/quiz-results', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
     // User (local user record) is attached to req.user by the middleware if authenticated
    if (!req.user) {
      // This case should ideally be handled by the middleware, but added as a safeguard
      return res.status(401).json({ error: 'Authentication failed or user not found' });
    }

    try {
      // req.user now holds the local User object from our database
      const userId = req.user.id; // Get user ID directly from the local user object

      // No need for the complex check anymore, userId should be a number here
      if (typeof userId !== 'number') {
        // This check is now more of a safeguard against unexpected issues
        console.error("Invalid userId found after authentication:", req.user);
        return res.status(500).json({ error: 'Internal server error processing user ID' });
      }

      const { quizId, score, totalQuestions } = req.body;

      if (typeof quizId !== 'number' || typeof score !== 'number' || typeof totalQuestions !== 'number') {
        return res.status(400).json({ error: 'Invalid quiz result data' });
      }
      
      // Check if user has already completed this quiz
      const existingResult = await storage.getUserQuizResultById(userId, quizId);
      
      if (existingResult) {
        // Update the existing result
        const updatedResult = await storage.updateUserQuizResult(existingResult.id, {
          score,
          totalQuestions,
          completed: true,
          completedAt: new Date()
       });
       return res.json(updatedResult);
       }
       
       // --- Fetch quiz title before creating result ---
       const quiz = await storage.getQuizById(quizId);
       if (!quiz) {
         // This should ideally not happen if quizId is valid, but good to check
         return res.status(404).json({ error: 'Quiz not found for the provided quizId' });
       }
       const quizTitle = quiz.title;
       // --- End fetch quiz title ---

       // Create a new result, now including the quizTitle
       const newResult = await storage.createUserQuizResult({
         userId,
         quizId,
         quizTitle, // Add the fetched quiz title here
        score,
        totalQuestions,
        completed: true
      });
      
      res.status(201).json(newResult);
    } catch (error) {
      console.error("Detailed error saving quiz result:", error); // Add detailed logging
      res.status(500).json({ error: 'Failed to save quiz result' });
    }
  });

  // Leaderboard
  app.get('/api/university/leaderboard', async (req: Request, res: Response) => { // Added types
    try {
      const leaderboard = await storage.getLeaderboard();
      
      // Get user details for each leaderboard entry
      const leaderboardWithUserDetails = await Promise.all(
        leaderboard.map(async (result) => {
          const user = await storage.getUser(result.userId);
          // Use firstname as the display name, or fallback if user not found
          const displayName = user ? user.firstname : 'Unknown User';
          return {
            ...result,
            username: displayName // Keep the key as 'username' for consistency if frontend expects it, but use firstname value
          };
        })
      );
      
      res.json(leaderboardWithUserDetails);
    } catch (error) {
      console.error("Detailed error in GET /api/university/leaderboard:", error); // Add detailed logging
      res.status(500).json({ error: 'Failed to fetch leaderboard' });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
