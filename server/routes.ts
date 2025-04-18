import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication
  setupAuth(app);

  // API routes
  app.get('/api/stocks', (req, res) => {
    const stocks = [
      { symbol: 'DANGCEM', price: 240.50, change: 2.5 },
      { symbol: 'GTCO', price: 28.75, change: 0.35 },
      { symbol: 'ZENITHBANK', price: 23.15, change: -0.45 },
      { symbol: 'MTN', price: 167.80, change: 1.2 },
      { symbol: 'NESTLE', price: 1250.00, change: -15.5 },
    ];
    
    res.json(stocks);
  });
  
  app.get('/api/market-summary', (req, res) => {
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
  app.get('/api/university/courses', async (req, res) => {
    try {
      const courses = await storage.getCourses();
      res.json(courses);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch courses' });
    }
  });
  
  app.get('/api/university/courses/:id', async (req, res) => {
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
  app.get('/api/university/courses/:courseId/lessons', async (req, res) => {
    try {
      const courseId = parseInt(req.params.courseId);
      const lessons = await storage.getLessonsByCourseId(courseId);
      
      res.json(lessons);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch lessons' });
    }
  });
  
  app.get('/api/university/lessons/:id', async (req, res) => {
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
  app.get('/api/university/courses/:courseId/quizzes', async (req, res) => {
    try {
      const courseId = parseInt(req.params.courseId);
      const quizzes = await storage.getQuizzesByCourseId(courseId);
      
      res.json(quizzes);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch quizzes' });
    }
  });
  
  app.get('/api/university/quizzes/:id', async (req, res) => {
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
  app.get('/api/university/quizzes/:quizId/questions', async (req, res) => {
    try {
      const quizId = parseInt(req.params.quizId);
      const questions = await storage.getQuestionsByQuizId(quizId);
      
      res.json(questions);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch questions' });
    }
  });
  
  // Quiz Results
  app.get('/api/university/user/quiz-results', async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: 'You must be logged in to view quiz results' });
    }
    
    try {
      const userId = req.user.id;
      const results = await storage.getUserQuizResults(userId);
      
      res.json(results);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch quiz results' });
    }
  });
  
  app.post('/api/university/user/quiz-results', async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: 'You must be logged in to submit quiz results' });
    }
    
    try {
      const userId = req.user.id;
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
  app.get('/api/university/leaderboard', async (req, res) => {
    try {
      const leaderboard = await storage.getLeaderboard();
      
      // Get user details for each leaderboard entry
      const leaderboardWithUserDetails = await Promise.all(
        leaderboard.map(async (result) => {
          const user = await storage.getUser(result.userId);
          return {
            ...result,
            username: user ? user.username : 'Unknown User'
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
