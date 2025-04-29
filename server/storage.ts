import {
  users, courses, lessons, quizzes, questions, userQuizResults,
  type User, type InsertUser, type Course, type Lesson,
  type Quiz, type Question, type UserQuizResult,
  insertUserSchema, // Added missing import
  insertUserQuizResultSchema, insertCourseSchema, insertLessonSchema, insertQuizSchema, insertQuestionSchema
} from "@shared/schema";
import { drizzle } from 'drizzle-orm/node-postgres'; // Changed from neon-http
import { Pool } from 'pg'; // Import Pool from pg
import { eq, desc, and } from 'drizzle-orm'; // Import necessary Drizzle operators

// Ensure DATABASE_URL is set
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set.");
}

// Create the Drizzle client instance using pg Pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Add SSL configuration if required by Supabase (often needed)
  ssl: {
    rejectUnauthorized: false // Adjust based on your security requirements
  }
});
export const db = drizzle(pool); // Export the db instance

// Define the interface for storage operations
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>; // Changed from getUserByUsername
  createUser(user: InsertUser): Promise<User>;

  // University methods
  getCourses(): Promise<Course[]>;
  getCourseById(id: number): Promise<Course | undefined>;
  createCourse(course: Omit<Course, 'id' | 'createdAt'>): Promise<Course>;

  getLessonsByCourseId(courseId: number): Promise<Lesson[]>;
  getLessonById(id: number): Promise<Lesson | undefined>;
  createLesson(lesson: Omit<Lesson, 'id'>): Promise<Lesson>;

  getQuizzesByCourseId(courseId: number): Promise<Quiz[]>;
  getQuizById(id: number): Promise<Quiz | undefined>;
  createQuiz(quiz: Omit<Quiz, 'id'>): Promise<Quiz>;

  getQuestionsByQuizId(quizId: number): Promise<Question[]>;
  createQuestion(question: Omit<Question, 'id'>): Promise<Question>;

  getUserQuizResults(userId: number): Promise<UserQuizResult[]>;
  getUserQuizResultById(userId: number, quizId: number): Promise<UserQuizResult | undefined>;
  createUserQuizResult(result: Omit<UserQuizResult, 'id' | 'completedAt' | 'grade'> & { completed: boolean }): Promise<UserQuizResult>;
  updateUserQuizResult(id: number, result: Partial<Omit<UserQuizResult, 'id' | 'userId' | 'quizId' | 'grade'>> & { completed?: boolean }): Promise<UserQuizResult>;

  getLeaderboard(): Promise<UserQuizResult[]>;
}

// Implementation using Drizzle ORM and PostgreSQL
export class DbStorage implements IStorage {

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
    return result[0];
  }

  // Note: createUser might need password hashing if not handled elsewhere
  async createUser(insertUser: InsertUser): Promise<User> {
     // Ensure the input conforms to the insert schema (drizzle-zod helps here)
     // Password hashing should happen *before* calling this storage method
    const validatedData = insertUserSchema.parse(insertUser);
    const result = await db.insert(users).values(validatedData).returning();
    return result[0];
  }

  // Course methods
  async getCourses(): Promise<Course[]> {
    return await db.select().from(courses);
  }

  async getCourseById(id: number): Promise<Course | undefined> {
    const result = await db.select().from(courses).where(eq(courses.id, id)).limit(1);
    return result[0];
  }

  async createCourse(courseData: Omit<Course, 'id' | 'createdAt'>): Promise<Course> {
    const validatedData = insertCourseSchema.parse(courseData);
    const result = await db.insert(courses).values(validatedData).returning();
    return result[0];
  }

  // Lesson methods
  async getLessonsByCourseId(courseId: number): Promise<Lesson[]> {
    return await db.select().from(lessons).where(eq(lessons.courseId, courseId)).orderBy(lessons.order);
  }

  async getLessonById(id: number): Promise<Lesson | undefined> {
    const result = await db.select().from(lessons).where(eq(lessons.id, id)).limit(1);
    return result[0];
  }

  async createLesson(lessonData: Omit<Lesson, 'id'>): Promise<Lesson> {
    const validatedData = insertLessonSchema.parse(lessonData);
    const result = await db.insert(lessons).values(validatedData).returning();
    return result[0];
  }

  // Quiz methods
  async getQuizzesByCourseId(courseId: number): Promise<Quiz[]> {
    return await db.select().from(quizzes).where(eq(quizzes.courseId, courseId));
  }

  async getQuizById(id: number): Promise<Quiz | undefined> {
    const result = await db.select().from(quizzes).where(eq(quizzes.id, id)).limit(1);
    return result[0];
  }

  async createQuiz(quizData: Omit<Quiz, 'id'>): Promise<Quiz> {
    const validatedData = insertQuizSchema.parse(quizData);
    const result = await db.insert(quizzes).values(validatedData).returning();
    return result[0];
  }

  // Question methods
  async getQuestionsByQuizId(quizId: number): Promise<Question[]> {
    return await db.select().from(questions).where(eq(questions.quizId, quizId)).orderBy(questions.order);
  }

  async createQuestion(questionData: Omit<Question, 'id'>): Promise<Question> {
    const validatedData = insertQuestionSchema.parse(questionData);
    const result = await db.insert(questions).values(validatedData).returning();
    return result[0];
  }

  // User Quiz Results methods
  async getUserQuizResults(userId: number): Promise<UserQuizResult[]> {
    return await db.select().from(userQuizResults).where(eq(userQuizResults.userId, userId));
  }

  async getUserQuizResultById(userId: number, quizId: number): Promise<UserQuizResult | undefined> {
    const result = await db.select().from(userQuizResults)
      .where(and(eq(userQuizResults.userId, userId), eq(userQuizResults.quizId, quizId)))
      .limit(1);
    return result[0];
  }

  // Helper to calculate grade
  private calculateGrade(score: number, totalQuestions: number): string {
    if (totalQuestions === 0) return "N/A"; // Avoid division by zero
    const scorePercentage = (score / totalQuestions) * 100;
    if (scorePercentage >= 90) return "1st Class";
    if (scorePercentage >= 70) return "2nd Class";
    return "3rd Class";
  }

  async createUserQuizResult(resultData: Omit<UserQuizResult, 'id' | 'completedAt' | 'grade'> & { completed: boolean }): Promise<UserQuizResult> {
    const grade = this.calculateGrade(resultData.score, resultData.totalQuestions);
    const completedAt = resultData.completed ? new Date() : null;

    const dataToInsert = {
      ...resultData,
      grade,
      completedAt,
    };
     // Validate before inserting
    const validatedData = insertUserQuizResultSchema.parse(dataToInsert);
    const result = await db.insert(userQuizResults).values(validatedData).returning();
    return result[0];
  }

  async updateUserQuizResult(id: number, resultData: Partial<Omit<UserQuizResult, 'id' | 'userId' | 'quizId' | 'grade'>> & { completed?: boolean }): Promise<UserQuizResult> {
    const existingResult = await db.select().from(userQuizResults).where(eq(userQuizResults.id, id)).limit(1);
    if (!existingResult[0]) {
      throw new Error(`User quiz result with id ${id} not found`);
    }

    const dataToUpdate: Partial<UserQuizResult> = { ...resultData };

    // Recalculate grade if score or totalQuestions changed
    const newScore = resultData.score ?? existingResult[0].score;
    const newTotalQuestions = resultData.totalQuestions ?? existingResult[0].totalQuestions;
    if (resultData.score !== undefined || resultData.totalQuestions !== undefined) {
        dataToUpdate.grade = this.calculateGrade(newScore, newTotalQuestions);
    }

    // Update completedAt if completed status changed
    if (resultData.completed !== undefined) {
        dataToUpdate.completedAt = resultData.completed ? new Date() : null;
    }

    // Remove fields that shouldn't be directly updated if they exist in resultData
    delete (dataToUpdate as any).id;
    delete (dataToUpdate as any).userId;
    delete (dataToUpdate as any).quizId;

    if (Object.keys(dataToUpdate).length === 0) {
        return existingResult[0]; // No actual changes
    }

    const result = await db.update(userQuizResults)
      .set(dataToUpdate)
      .where(eq(userQuizResults.id, id))
      .returning();

    return result[0];
  }

  async getLeaderboard(): Promise<UserQuizResult[]> {
    // Get all completed quiz results, ordered by score percentage descending
    // Note: Calculating percentage in the query might be complex depending on DB.
    // Fetching and sorting in application layer is simpler here.
    const completedResults = await db.select().from(userQuizResults)
      .where(eq(userQuizResults.completed, true));

    // Sort by score percentage (high to low)
    return completedResults.sort((a, b) => {
      const scorePercentageA = a.totalQuestions === 0 ? 0 : (a.score / a.totalQuestions) * 100;
      const scorePercentageB = b.totalQuestions === 0 ? 0 : (b.score / b.totalQuestions) * 100;
      return scorePercentageB - scorePercentageA;
    });
  }
}

// Instantiate and export the DbStorage
export const storage = new DbStorage();
