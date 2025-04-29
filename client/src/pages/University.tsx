import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Check, ChevronRight, Trophy, Video, FileText, BadgeCheck, Award } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useQuery } from "@tanstack/react-query";
import { Course, Lesson, Quiz, UserQuizResult } from "@shared/schema";
import { useAuth } from "@/hooks/use-auth";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { apiRequest } from "@/lib/queryClient";
import { QuizContent } from "@/components/university/QuizContent";

type LeaderboardEntry = UserQuizResult & {
  username: string;
};

const University = () => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [isQuizDialogOpen, setIsQuizDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("courses"); // State for the main tabs
  const [location, navigate] = useLocation();
  const { user } = useAuth();

  const { data: courses = [] } = useQuery<Course[]>({
    queryKey: ["/api/university/courses"],
  });

  const { data: lessons = [] } = useQuery<Lesson[]>({
    queryKey: ["/api/university/courses", selectedCourse?.id, "lessons"],
    enabled: !!selectedCourse,
  });

  const { data: quizzes = [] } = useQuery<Quiz[]>({
    queryKey: ["/api/university/courses", selectedCourse?.id, "quizzes"],
    enabled: !!selectedCourse,
  });

  const { data: quizResults = [] } = useQuery<UserQuizResult[]>({
    queryKey: ["/api/university/user/quiz-results"],
    enabled: !!user,
  });

  const { data: leaderboard = [] } = useQuery<LeaderboardEntry[]>({
    queryKey: ["/api/university/leaderboard"],
  });

  // Set first course as selected when data loads
  useEffect(() => {
    if (courses.length > 0 && !selectedCourse) {
      setSelectedCourse(courses[0]);
    }
  }, [courses, selectedCourse]);

  // Set first lesson as selected when course changes
  useEffect(() => {
    if (lessons.length > 0) {
      setSelectedLesson(lessons[0]);
    } else {
      setSelectedLesson(null);
    }
  }, [lessons, selectedCourse]);

  // Set first quiz as selected when course changes
  useEffect(() => {
    if (quizzes.length > 0) {
      setSelectedQuiz(quizzes[0]);
    } else {
      setSelectedQuiz(null);
    }
  }, [quizzes, selectedCourse]);

  const getBadgeColor = (level: string) => {
    switch (level) {
      case "beginner":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100";
      case "intermediate":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100";
      case "advanced":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100";
    }
  };

  const getGradeColor = (grade: string | null) => {
    if (!grade) return "bg-gray-100 text-gray-800";
    
    switch (grade) {
      case "1st Class":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100";
      case "2nd Class":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100";
      case "3rd Class":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100";
    }
  };

  const getGradeIcon = (grade: string | null) => {
    if (!grade) return null;
    
    switch (grade) {
      case "1st Class":
        return <Award className="h-4 w-4 mr-1" />;
      case "2nd Class":
        return <BadgeCheck className="h-4 w-4 mr-1" />;
      case "3rd Class":
        return <Check className="h-4 w-4 mr-1" />;
      default:
        return null;
    }
  };

  const handleStartQuiz = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setIsQuizDialogOpen(true);
  };

  // Find completed quiz for the current user and selected course
  const findCompletedQuiz = (quizId: number) => {
    return quizResults.find((result: UserQuizResult) => result.quizId === quizId);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto py-8 px-4">
          <div className="flex flex-col items-center text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Hamma University</h1>
            <p className="text-muted-foreground max-w-2xl text-lg">
              Learn the fundamentals of stock trading, technical analysis, and investment
              strategies through our comprehensive courses and interactive quizzes.
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="my-progress">My Progress</TabsTrigger>
              <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            </TabsList>

            {/* Courses Tab */}
            <TabsContent value="courses" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Course List Sidebar */}
                <div className="md:col-span-1 border rounded-lg p-4">
                  <h2 className="font-semibold mb-3">Available Courses</h2>
                  <div className="space-y-2">
                    {courses.map((course: Course) => (
                      <div
                        key={course.id}
                        className={`p-3 rounded-md cursor-pointer transition-colors ${
                          selectedCourse?.id === course.id
                            ? "bg-primary/10 border-l-4 border-primary"
                            : "hover:bg-muted"
                        }`}
                        onClick={() => setSelectedCourse(course)}
                      >
                        <div className="font-medium">{course.title}</div>
                        <div className="flex items-center mt-1">
                          {course.type === "video" ? (
                            <Video className="h-3 w-3 mr-1 text-muted-foreground" />
                          ) : (
                            <FileText className="h-3 w-3 mr-1 text-muted-foreground" />
                          )}
                          <span className="text-xs text-muted-foreground capitalize">
                            {course.type} Course
                          </span>
                          <span className="mx-1 text-muted-foreground">•</span>
                          <Badge
                            variant="outline"
                            className={`text-xs ${getBadgeColor(course.level)}`}
                          >
                            {course.level}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Course Content */}
                <div className="md:col-span-3 border rounded-lg p-6">
                  {selectedCourse ? (
                    <>
                      <div className="mb-6">
                        <h2 className="text-2xl font-bold mb-2">{selectedCourse.title}</h2>
                        <p className="text-muted-foreground">{selectedCourse.description}</p>
                      </div>

                      <Tabs defaultValue="lessons">
                        <TabsList>
                          <TabsTrigger value="lessons">Lessons</TabsTrigger>
                          <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
                        </TabsList>

                        {/* Lessons Content */}
                        <TabsContent value="lessons" className="space-y-4 mt-4">
                          {lessons.length > 0 ? (
                            <div className="grid grid-cols-1 gap-4">
                              {/* Lesson Navigation */}
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {lessons.map((lesson: Lesson) => (
                                  <Card
                                    key={lesson.id}
                                    className={`cursor-pointer transition-all ${
                                      selectedLesson?.id === lesson.id
                                        ? "border-primary ring-2 ring-primary ring-opacity-20"
                                        : ""
                                    }`}
                                    onClick={() => setSelectedLesson(lesson)}
                                  >
                                    <CardHeader className="pb-2">
                                      <CardTitle className="text-lg">
                                        {lesson.title}
                                      </CardTitle>
                                      {lesson.videoUrl && (
                                        <Badge variant="outline" className="w-fit">
                                          <Video className="h-3 w-3 mr-1" /> Video
                                        </Badge>
                                      )}
                                    </CardHeader>
                                    <CardFooter className="pt-2">
                                      <Button
                                        variant="ghost"
                                        className="ml-auto p-0 h-auto font-normal"
                                        onClick={() => setSelectedLesson(lesson)}
                                      >
                                        View <ChevronRight className="h-4 w-4 ml-1" />
                                      </Button>
                                    </CardFooter>
                                  </Card>
                                ))}
                              </div>

                              {/* Selected Lesson Content */}
                              {selectedLesson && (
                                <Card>
                                  <CardHeader>
                                    <CardTitle>{selectedLesson.title}</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="prose dark:prose-invert max-w-none">
                                      <p>{selectedLesson.content}</p>
                                    </div>
                                    {selectedLesson.videoUrl && (
                                      <div className="mt-6 aspect-video">
                                        <iframe
                                          src={selectedLesson.videoUrl}
                                          className="w-full h-full rounded-lg border"
                                          allowFullScreen
                                          referrerPolicy="strict-origin-when-cross-origin"
                                          frameBorder="0"
                                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                          title={selectedLesson.title}
                                        ></iframe>
                                      </div>
                                    )}
                                  </CardContent>
                                </Card>
                              )}
                            </div>
                          ) : (
                            <div className="text-center py-12 text-muted-foreground">
                              No lessons available for this course yet.
                            </div>
                          )}
                        </TabsContent>

                        {/* Quizzes Content */}
                        <TabsContent value="quizzes" className="space-y-4 mt-4">
                          {quizzes.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {quizzes.map((quiz: Quiz) => {
                                const completedQuiz = findCompletedQuiz(quiz.id);
                                const scorePercentage = completedQuiz
                                  ? (completedQuiz.score / completedQuiz.totalQuestions) * 100
                                  : 0;

                                return (
                                  <Card key={quiz.id}>
                                    <CardHeader>
                                      <CardTitle>{quiz.title}</CardTitle>
                                      <CardDescription>
                                        {quiz.description}
                                      </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                      {completedQuiz ? (
                                        <div className="space-y-3">
                                          <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium">
                                              Your score: {completedQuiz.score}/{completedQuiz.totalQuestions}
                                            </span>
                                            <Badge className={getGradeColor(completedQuiz.grade)}>
                                              {getGradeIcon(completedQuiz.grade)}
                                              {completedQuiz.grade}
                                            </Badge>
                                          </div>
                                          <Progress value={scorePercentage} className="h-2" />
                                          <Button
                                            onClick={() => handleStartQuiz(quiz)}
                                            className="w-full"
                                          >
                                            Take Again
                                          </Button>
                                        </div>
                                      ) : (
                                        <Button
                                          onClick={() => handleStartQuiz(quiz)}
                                          className="w-full"
                                        >
                                          Start Quiz
                                        </Button>
                                      )}
                                    </CardContent>
                                  </Card>
                                );
                              })}
                            </div>
                          ) : (
                            <div className="text-center py-12 text-muted-foreground">
                              No quizzes available for this course yet.
                            </div>
                          )}
                        </TabsContent>
                      </Tabs>
                    </>
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      Select a course to view content.
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            {/* My Progress Tab */}
            <TabsContent value="my-progress">
              {user ? (
                <div>
                  <h2 className="text-2xl font-bold mb-4">My Learning Progress</h2>
                  {quizResults.length > 0 ? (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {quizResults.map((result: UserQuizResult) => {
                          const quiz = quizzes.find((q: Quiz) => q.id === result.quizId);
                          const course = courses.find(
                            (c: Course) => c.id === quiz?.courseId
                          );
                          const scorePercentage =
                            (result.score / result.totalQuestions) * 100;

                          return (
                            <Card key={result.id}>
                              <CardHeader className="pb-2">
                                <CardTitle className="text-lg">
                                  {quiz?.title || "Unknown Quiz"}
                                </CardTitle>
                                <CardDescription>
                                  {course?.title || "Unknown Course"}
                                </CardDescription>
                              </CardHeader>
                              <CardContent>
                                <div className="space-y-3">
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">
                                      Score: {result.score}/{result.totalQuestions}
                                    </span>
                                    <Badge
                                      className={getGradeColor(result.grade)}
                                    >
                                      {getGradeIcon(result.grade)}
                                      {result.grade}
                                    </Badge>
                                  </div>
                                  <Progress
                                    value={scorePercentage}
                                    className="h-2"
                                  />
                                  <div className="text-xs text-muted-foreground mt-1">
                                    Completed{" "}
                                    {result.completedAt
                                      ? new Date(result.completedAt).toLocaleDateString()
                                      : ""}
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 border rounded-lg">
                      <Trophy className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                      <p className="text-muted-foreground">
                        You haven't completed any quizzes yet. Start learning and
                        test your knowledge!
                      </p>
                      <Button
                        className="mt-4"
                        onClick={() => setActiveTab("courses")}
                      >
                        Browse Courses
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12 border rounded-lg">
                  <p className="text-muted-foreground mb-4">
                    Sign in to track your learning progress and take quizzes.
                  </p>
                  <Button onClick={() => navigate("/auth")}>Sign In</Button>
                </div>
              )}
            </TabsContent>

            {/* Leaderboard Tab */}
            <TabsContent value="leaderboard">
              <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
              <div className="border rounded-lg overflow-hidden">
                {leaderboard.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-muted">
                          <th className="px-4 py-3 text-left">Rank</th>
                          <th className="px-4 py-3 text-left">Student</th>
                          <th className="px-4 py-3 text-left">Quiz</th>
                          <th className="px-4 py-3 text-left">Score</th>
                          <th className="px-4 py-3 text-left">Grade</th>
                          <th className="px-4 py-3 text-left">Completed</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {leaderboard.map((result: LeaderboardEntry, index: number) => {
                          const quiz = quizzes.find(
                            (q) => q.id === result.quizId
                          );
                          const scorePercentage =
                            (result.score / result.totalQuestions) * 100;

                          return (
                            <tr
                              key={result.id}
                              className={
                                user?.id === result.userId
                                  ? "bg-primary/5"
                                  : "hover:bg-muted/50"
                              }
                            >
                              <td className="px-4 py-3 font-medium">
                                {index + 1}
                                {index === 0 && (
                                  <Trophy className="h-4 w-4 inline ml-1 text-yellow-500" />
                                )}
                              </td>
                              <td className="px-4 py-3">
                                {(result as LeaderboardEntry).username}
                                {user?.id === result.userId && " (You)"}
                              </td>
                              <td className="px-4 py-3">
                                {quiz?.title || "Unknown Quiz"}
                              </td>
                              <td className="px-4 py-3">
                                {result.score}/{result.totalQuestions}{" "}
                                <span className="text-muted-foreground text-sm">
                                  ({scorePercentage.toFixed(0)}%)
                                </span>
                              </td>
                              <td className="px-4 py-3">
                                <Badge
                                  className={getGradeColor(result.grade)}
                                >
                                  {getGradeIcon(result.grade)}
                                  {result.grade}
                                </Badge>
                              </td>
                              <td className="px-4 py-3 text-muted-foreground">
                                {result.completedAt
                                  ? new Date(result.completedAt).toLocaleDateString()
                                  : ""}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Trophy className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                    <p className="text-muted-foreground">
                      No quiz results yet. Be the first to take a quiz and top
                      the leaderboard!
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Quiz Dialog */}
      <Dialog open={isQuizDialogOpen} onOpenChange={setIsQuizDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>
              {selectedQuiz?.title || "Quiz"}
            </DialogTitle>
            <DialogDescription>
              {selectedQuiz?.description}
            </DialogDescription>
          </DialogHeader>

          {selectedQuiz ? (
            <QuizContent 
              quiz={selectedQuiz} 
              onComplete={() => setIsQuizDialogOpen(false)} 
            />
          ) : (
            <div className="py-4 text-center">
              <p className="text-muted-foreground mb-4">Quiz not found</p>
              <Button onClick={() => setIsQuizDialogOpen(false)}>
                Close
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default University;
