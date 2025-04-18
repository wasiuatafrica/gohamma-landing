import { 
  users, courses, lessons, quizzes, questions, userQuizResults,
  type User, type InsertUser, type Course, type Lesson, 
  type Quiz, type Question, type UserQuizResult 
} from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  sessionStore: session.Store;
  
  // University methods
  getCourses(): Promise<Course[]>;
  getCourseById(id: number): Promise<Course | undefined>;
  createCourse(course: any): Promise<Course>;
  
  getLessonsByCourseId(courseId: number): Promise<Lesson[]>;
  getLessonById(id: number): Promise<Lesson | undefined>;
  createLesson(lesson: any): Promise<Lesson>;
  
  getQuizzesByCourseId(courseId: number): Promise<Quiz[]>;
  getQuizById(id: number): Promise<Quiz | undefined>;
  createQuiz(quiz: any): Promise<Quiz>;
  
  getQuestionsByQuizId(quizId: number): Promise<Question[]>;
  createQuestion(question: any): Promise<Question>;
  
  getUserQuizResults(userId: number): Promise<UserQuizResult[]>;
  getUserQuizResultById(userId: number, quizId: number): Promise<UserQuizResult | undefined>;
  createUserQuizResult(result: any): Promise<UserQuizResult>;
  updateUserQuizResult(id: number, result: Partial<UserQuizResult>): Promise<UserQuizResult>;
  
  getLeaderboard(): Promise<UserQuizResult[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private courses: Map<number, Course>;
  private lessons: Map<number, Lesson>;
  private quizzes: Map<number, Quiz>;
  private questions: Map<number, Question>;
  private userQuizResults: Map<number, UserQuizResult>;
  
  private userIdCounter: number;
  private courseIdCounter: number;
  private lessonIdCounter: number;
  private quizIdCounter: number;
  private questionIdCounter: number;
  private resultIdCounter: number;
  
  sessionStore: session.Store;

  constructor() {
    this.users = new Map();
    this.courses = new Map();
    this.lessons = new Map();
    this.quizzes = new Map();
    this.questions = new Map();
    this.userQuizResults = new Map();
    
    this.userIdCounter = 1;
    this.courseIdCounter = 1;
    this.lessonIdCounter = 1;
    this.quizIdCounter = 1;
    this.questionIdCounter = 1;
    this.resultIdCounter = 1;
    
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000, // prune expired entries every 24h
    });
    
    // Initialize with sample data
    this.initializeSampleData();
  }
  
  private async initializeSampleData() {
    // Add sample courses
    const stockBasicsCourse = await this.createCourse({
      title: "Stock Market Basics",
      description: "Learn the fundamentals of stock markets and how they work",
      imageUrl: "/assets/course-stocks-basics.jpg",
      type: "text",
      level: "beginner"
    });
    
    const technicalAnalysisCourse = await this.createCourse({
      title: "Technical Analysis",
      description: "Learn how to analyze stock charts and identify patterns",
      imageUrl: "/assets/course-technical-analysis.jpg",
      type: "video",
      level: "intermediate"
    });
    
    const fundamentalAnalysisCourse = await this.createCourse({
      title: "Fundamental Analysis",
      description: "Learn how to analyze company financials and valuations",
      imageUrl: "/assets/course-fundamental-analysis.jpg",
      type: "text",
      level: "intermediate"
    });
    
    // Add sample lessons
    await this.createLesson({
      courseId: stockBasicsCourse.id,
      title: "What is a Stock?",
      content: "A stock (also known as equity) is a security that represents the ownership of a fraction of a corporation. This entitles the owner of the stock to a proportion of the corporation's assets and profits equal to how much stock they own.",
      order: 1
    });
    
    await this.createLesson({
      courseId: stockBasicsCourse.id,
      title: "How Stock Markets Work",
      content: "Stock markets are where buyers and sellers of stocks come together to trade shares in companies. Stock markets operate like auctions, where potential buyers name their highest price ('the bid') and potential sellers name their lowest price ('the ask').",
      order: 2
    });
    
    await this.createLesson({
      courseId: technicalAnalysisCourse.id,
      title: "Introduction to Chart Patterns",
      content: "Chart patterns are specific formations on stock charts that can help predict future price movements. These patterns form when the price of an asset moves in a way that resembles a common shape or formation.",
      videoUrl: "https://www.youtube.com/embed/example1",
      order: 1
    });
    
    // Add sample quizzes
    const stockBasicsQuiz = await this.createQuiz({
      courseId: stockBasicsCourse.id,
      title: "Stock Market Basics Quiz",
      description: "Test your knowledge of stock market fundamentals"
    });
    
    // Add sample questions
    await this.createQuestion({
      quizId: stockBasicsQuiz.id,
      questionText: "What does a stock represent?",
      options: ["Ownership in a company", "A loan to a company", "A government bond", "A foreign currency"],
      correctOption: 0,
      explanation: "A stock represents ownership (equity) in a company, proportional to how many shares you own relative to the total number of shares.",
      order: 1
    });
    
    await this.createQuestion({
      quizId: stockBasicsQuiz.id,
      questionText: "Which of the following is NOT a major stock exchange in Nigeria?",
      options: ["Nigerian Stock Exchange (NSE)", "NASDAQ Nigeria", "FMDQ Securities Exchange", "Abuja Securities and Commodities Exchange"],
      correctOption: 1,
      explanation: "NASDAQ Nigeria does not exist. The major exchanges in Nigeria are the Nigerian Stock Exchange (NSE), FMDQ Securities Exchange, and Abuja Securities and Commodities Exchange.",
      order: 2
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    // Handle optional phone field
    const phone = insertUser.phone || null;
    const user: User = { 
      ...insertUser, 
      id,
      phone 
    };
    this.users.set(id, user);
    return user;
  }
  
  // Course methods
  async getCourses(): Promise<Course[]> {
    return Array.from(this.courses.values());
  }
  
  async getCourseById(id: number): Promise<Course | undefined> {
    return this.courses.get(id);
  }
  
  async createCourse(courseData: any): Promise<Course> {
    const id = this.courseIdCounter++;
    const now = new Date();
    const course: Course = {
      id,
      title: courseData.title,
      description: courseData.description,
      imageUrl: courseData.imageUrl,
      type: courseData.type,
      level: courseData.level,
      createdAt: now
    };
    this.courses.set(id, course);
    return course;
  }
  
  // Lesson methods
  async getLessonsByCourseId(courseId: number): Promise<Lesson[]> {
    return Array.from(this.lessons.values())
      .filter(lesson => lesson.courseId === courseId)
      .sort((a, b) => a.order - b.order);
  }
  
  async getLessonById(id: number): Promise<Lesson | undefined> {
    return this.lessons.get(id);
  }
  
  async createLesson(lessonData: any): Promise<Lesson> {
    const id = this.lessonIdCounter++;
    const lesson: Lesson = {
      id,
      courseId: lessonData.courseId,
      title: lessonData.title,
      content: lessonData.content,
      videoUrl: lessonData.videoUrl || null,
      order: lessonData.order
    };
    this.lessons.set(id, lesson);
    return lesson;
  }
  
  // Quiz methods
  async getQuizzesByCourseId(courseId: number): Promise<Quiz[]> {
    return Array.from(this.quizzes.values())
      .filter(quiz => quiz.courseId === courseId);
  }
  
  async getQuizById(id: number): Promise<Quiz | undefined> {
    return this.quizzes.get(id);
  }
  
  async createQuiz(quizData: any): Promise<Quiz> {
    const id = this.quizIdCounter++;
    const quiz: Quiz = {
      id,
      courseId: quizData.courseId,
      title: quizData.title,
      description: quizData.description || null
    };
    this.quizzes.set(id, quiz);
    return quiz;
  }
  
  // Question methods
  async getQuestionsByQuizId(quizId: number): Promise<Question[]> {
    return Array.from(this.questions.values())
      .filter(question => question.quizId === quizId)
      .sort((a, b) => a.order - b.order);
  }
  
  async createQuestion(questionData: any): Promise<Question> {
    const id = this.questionIdCounter++;
    const question: Question = {
      id,
      quizId: questionData.quizId,
      questionText: questionData.questionText,
      options: questionData.options,
      correctOption: questionData.correctOption,
      explanation: questionData.explanation || null,
      order: questionData.order
    };
    this.questions.set(id, question);
    return question;
  }
  
  // User Quiz Results methods
  async getUserQuizResults(userId: number): Promise<UserQuizResult[]> {
    return Array.from(this.userQuizResults.values())
      .filter(result => result.userId === userId);
  }
  
  async getUserQuizResultById(userId: number, quizId: number): Promise<UserQuizResult | undefined> {
    return Array.from(this.userQuizResults.values())
      .find(result => result.userId === userId && result.quizId === quizId);
  }
  
  async createUserQuizResult(resultData: any): Promise<UserQuizResult> {
    const id = this.resultIdCounter++;
    const now = new Date();
    
    // Calculate grade based on score percentage
    const scorePercentage = (resultData.score / resultData.totalQuestions) * 100;
    let grade = "3rd Class";
    
    if (scorePercentage >= 90) {
      grade = "1st Class";
    } else if (scorePercentage >= 70) {
      grade = "2nd Class";
    }
    
    const result: UserQuizResult = {
      id,
      userId: resultData.userId,
      quizId: resultData.quizId,
      score: resultData.score,
      totalQuestions: resultData.totalQuestions,
      completed: resultData.completed || false,
      completedAt: resultData.completed ? now : null,
      grade: grade
    };
    this.userQuizResults.set(id, result);
    return result;
  }
  
  async updateUserQuizResult(id: number, resultData: Partial<UserQuizResult>): Promise<UserQuizResult> {
    const existingResult = this.userQuizResults.get(id);
    if (!existingResult) {
      throw new Error(`User quiz result with id ${id} not found`);
    }
    
    // Calculate grade if score or totalQuestions changes
    let grade = existingResult.grade;
    if (resultData.score !== undefined && resultData.totalQuestions !== undefined) {
      const scorePercentage = (resultData.score / resultData.totalQuestions) * 100;
      
      if (scorePercentage >= 90) {
        grade = "1st Class";
      } else if (scorePercentage >= 70) {
        grade = "2nd Class";
      } else {
        grade = "3rd Class";
      }
    }
    
    const updatedResult: UserQuizResult = {
      ...existingResult,
      ...resultData,
      grade,
      completedAt: resultData.completed ? new Date() : existingResult.completedAt
    };
    
    this.userQuizResults.set(id, updatedResult);
    return updatedResult;
  }
  
  async getLeaderboard(): Promise<UserQuizResult[]> {
    // Get all completed quiz results
    const completedResults = Array.from(this.userQuizResults.values())
      .filter(result => result.completed);
    
    // Sort by score percentage (high to low)
    return completedResults.sort((a, b) => {
      const scorePercentageA = (a.score / a.totalQuestions) * 100;
      const scorePercentageB = (b.score / b.totalQuestions) * 100;
      return scorePercentageB - scorePercentageA;
    });
  }
}

export const storage = new MemStorage();
