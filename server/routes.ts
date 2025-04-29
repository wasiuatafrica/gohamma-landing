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
      req.user = profileResponse.data; // Attach user to request
      next(); // pass the execution off to whatever request the client intended
    } else {
      res.sendStatus(401); // Invalid token or user not found
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
      console.error("Error fetching courses:", error);
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
      res.status(500).json({ error: 'Failed to fetch questions' });
    }
  });

  // Quiz Results (Protected by authenticateToken middleware)
  app.get('/api/university/user/quiz-results', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
    // User is attached to req.user by the middleware if authenticated
    if (!req.user) {
       // This case should ideally be handled by the middleware, but added as a safeguard
      return res.status(401).json({ error: 'Authentication failed or user not found' });
    }

    try {
      const userId = req.user.id; // Get user ID from the authenticated user object
      const results = await storage.getUserQuizResults(userId);

      res.json(results);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch quiz results' });
    }
  });

  app.post('/api/university/user/quiz-results', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
     // User is attached to req.user by the middleware if authenticated
    if (!req.user) {
      // This case should ideally be handled by the middleware, but added as a safeguard
      return res.status(401).json({ error: 'Authentication failed or user not found' });
    }

    try {
      const userId = req.user.id; // Get user ID from the authenticated user object
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
      
      // Create a new result
      const newResult = await storage.createUserQuizResult({
        userId,
        quizId,
        score,
        totalQuestions,
        completed: true
      });
      
      res.status(201).json(newResult);
    } catch (error) {
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
      res.status(500).json({ error: 'Failed to fetch leaderboard' });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
