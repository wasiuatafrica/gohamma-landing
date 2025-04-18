import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Update table definition to match backend response
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  // Adjust column names/casing if needed for Drizzle, but keep JS properties matching backend
  firstname: text("first_name").notNull(), // Keep property lowercase 'firstname'
  lastname: text("last_name").notNull(),  // Keep property lowercase 'lastname'
  email: text("email").notNull().unique(),
  phone: text("phone"), // Keep phone as it might be used elsewhere or added later
  // username: text("username").notNull().unique(), // Remove username if not in backend response
  password: text("password").notNull(), // Keep for insert schema, won't be selected
  // Add fields from backend response
  has_2fa: boolean("has_2fa").default(false),
  twofa_type: text("twofa_type"), // e.g., 'email', 'app'
  is_active: boolean("is_active").default(false),
  totp_url: text("totp_url"),
  date_joined: timestamp("date_joined").defaultNow(),
  last_login: timestamp("last_login"),
  signup_route: text("signup_route"),
});

// Update insert schema - Note: registration form uses userSignupSchema in use-auth.tsx
// This schema might not be directly used for the API call if userSignupSchema is different
export const insertUserSchema = createInsertSchema(users).pick({
  firstname: true, // Use lowercase to match table definition property
  lastname: true,  // Use lowercase to match table definition property
  email: true,
  phone: true,
  // username: true, // Remove username as it's no longer in the users table
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Hamma University Schema
export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url"),
  type: text("type").notNull(), // "text", "video"
  level: text("level").notNull(), // "beginner", "intermediate", "advanced"
  createdAt: timestamp("created_at").defaultNow(),
});

export const lessons = pgTable("lessons", {
  id: serial("id").primaryKey(),
  courseId: integer("course_id").references(() => courses.id).notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  videoUrl: text("video_url"),
  order: integer("order").notNull(),
});

export const quizzes = pgTable("quizzes", {
  id: serial("id").primaryKey(),
  courseId: integer("course_id").references(() => courses.id).notNull(),
  title: text("title").notNull(),
  description: text("description"),
});

export const questions = pgTable("questions", {
  id: serial("id").primaryKey(),
  quizId: integer("quiz_id").references(() => quizzes.id).notNull(),
  questionText: text("question_text").notNull(),
  options: text("options").array().notNull(),
  correctOption: integer("correct_option").notNull(),
  explanation: text("explanation"),
  order: integer("order").notNull(),
});

export const userQuizResults = pgTable("user_quiz_results", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  quizId: integer("quiz_id").references(() => quizzes.id).notNull(),
  score: integer("score").notNull(),
  totalQuestions: integer("total_questions").notNull(),
  completed: boolean("completed").notNull().default(false),
  completedAt: timestamp("completed_at"),
  grade: text("grade"), // "1st Class", "2nd Class", "3rd Class"
});

export const insertCourseSchema = createInsertSchema(courses).pick({
  title: true,
  description: true,
  imageUrl: true,
  type: true,
  level: true,
});

export const insertLessonSchema = createInsertSchema(lessons).pick({
  courseId: true,
  title: true,
  content: true,
  videoUrl: true,
  order: true,
});

export const insertQuizSchema = createInsertSchema(quizzes).pick({
  courseId: true,
  title: true,
  description: true,
});

export const insertQuestionSchema = createInsertSchema(questions).pick({
  quizId: true,
  questionText: true,
  options: true,
  correctOption: true,
  explanation: true,
  order: true,
});

export const insertUserQuizResultSchema = createInsertSchema(userQuizResults).pick({
  userId: true,
  quizId: true,
  score: true,
  totalQuestions: true,
  completed: true,
  completedAt: true,
  grade: true,
});

export type Course = typeof courses.$inferSelect;
export type Lesson = typeof lessons.$inferSelect;
export type Quiz = typeof quizzes.$inferSelect;
export type Question = typeof questions.$inferSelect;
export type UserQuizResult = typeof userQuizResults.$inferSelect;
