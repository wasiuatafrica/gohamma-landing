import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Question, Quiz } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, HelpCircle, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface QuizContentProps {
  quiz: Quiz;
  onComplete: () => void;
}

export function QuizContent({ quiz, onComplete }: QuizContentProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [score, setScore] = useState(0);
  
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const { data: questions = [] } = useQuery<Question[]>({
    queryKey: ["/api/university/quizzes", quiz.id, "questions"],
    enabled: !!quiz.id,
  });
  
  const currentQuestion = questions[currentQuestionIndex] || null;
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  
  const submitQuizMutation = useMutation({
    mutationFn: async ({ score, totalQuestions }: { score: number, totalQuestions: number }) => {
      return apiRequest("POST", "/api/university/user/quiz-results", {
        quizId: quiz.id,
        score,
        totalQuestions,
        completed: true
      });
    },
    onSuccess: () => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ["/api/university/user/quiz-results"] });
      queryClient.invalidateQueries({ queryKey: ["/api/university/leaderboard"] });
      
      toast({
        title: "Quiz completed!",
        description: `You scored ${score} out of ${questions.length}`,
      });
      
      onComplete();
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to submit quiz",
        description: error.message,
        variant: "destructive",
      });
    }
  });
  
  const handleSelectOption = (optionIndex: number) => {
    setSelectedOption(optionIndex);
  };
  
  const handleNextQuestion = () => {
    if (selectedOption === null) return;
    
    // Save the answer
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = selectedOption;
    setAnswers(newAnswers);
    
    // Check if answer is correct
    if (currentQuestion && selectedOption === currentQuestion.correctOption) {
      setScore(score + 1);
    }
    
    // Reset selection
    setSelectedOption(null);
    setShowExplanation(false);
    
    // Move to next question or complete quiz
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsComplete(true);
      
      // Submit results if user is logged in
      if (user) {
        submitQuizMutation.mutate({
          score: score + (selectedOption === currentQuestion?.correctOption ? 1 : 0),
          totalQuestions: questions.length
        });
      }
    }
  };
  
  const isAnswerCorrect = (questionIndex: number, optionIndex: number) => {
    const question = questions[questionIndex];
    return question && question.correctOption === optionIndex;
  };
  
  const calculateFinalScore = () => {
    return answers.reduce((total, answer, index) => {
      return total + (isAnswerCorrect(index, answer) ? 1 : 0);
    }, 0);
  };
  
  if (questions.length === 0) {
    return (
      <div className="text-center py-8">
        <HelpCircle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <p className="text-muted-foreground">This quiz has no questions yet.</p>
      </div>
    );
  }
  
  if (isComplete) {
    const finalScore = calculateFinalScore();
    const percentage = (finalScore / questions.length) * 100;
    
    // Determine result message based on score
    let resultMessage = "You need more practice. Try again!";
    let resultIcon = <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />;
    
    if (percentage >= 90) {
      resultMessage = "Excellent! You've mastered this subject!";
      resultIcon = <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />;
    } else if (percentage >= 70) {
      resultMessage = "Good job! You're on the right track!";
      resultIcon = <CheckCircle className="h-12 w-12 text-blue-500 mx-auto mb-4" />;
    } else if (percentage >= 50) {
      resultMessage = "Keep practicing to improve your knowledge!";
      resultIcon = <HelpCircle className="h-12 w-12 text-amber-500 mx-auto mb-4" />;
    }
    
    return (
      <div className="py-8 ">
        <Card className="max-w-xl mx-auto !overflow-y-scroll !max-h-[75vh]">
          <CardHeader>
            <CardTitle>Quiz Results</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            {resultIcon}
            
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-2">
                You scored {finalScore} out of {questions.length}
              </h3>
              <Progress value={percentage} className="h-3 mb-2" />
              <p className="text-muted-foreground">{resultMessage}</p>
            </div>
            
            {!user && (
              <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-6">
                <p className="text-amber-800 dark:text-amber-300">
                  Sign in to save your progress and appear on the leaderboard!
                </p>
              </div>
            )}
            
            <div className="space-y-4">
              <h4 className="font-medium text-lg text-left">Question Review</h4>
              
              {questions.map((question, index) => (
                <div 
                  key={question.id} 
                  className="text-left border rounded-lg p-4"
                >
                  <div className="flex items-start gap-3">
                    {isAnswerCorrect(index, answers[index]) ? (
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                    )}
                    
                    <div>
                      <p className="font-medium">{question.questionText}</p>
                      
                      <div className="mt-2 space-y-1">
                        {question.options.map((option, optionIndex) => (
                          <div 
                            key={optionIndex}
                            className={`flex items-center gap-2 text-sm rounded px-2 py-1 ${
                              optionIndex === question.correctOption
                                ? "bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300"
                                : optionIndex === answers[index] && optionIndex !== question.correctOption
                                ? "bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300"
                                : ""
                            }`}
                          >
                            {optionIndex === question.correctOption && (
                              <CheckCircle className="h-3.5 w-3.5 text-green-500" />
                            )}
                            {optionIndex === answers[index] && optionIndex !== question.correctOption && (
                              <XCircle className="h-3.5 w-3.5 text-red-500" />
                            )}
                            {option}
                          </div>
                        ))}
                      </div>
                      
                      {question.explanation && (
                        <p className="mt-2 text-sm text-muted-foreground">
                          <span className="font-medium">Explanation:</span> {question.explanation}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={() => {
                setCurrentQuestionIndex(0);
                setSelectedOption(null);
                setAnswers([]);
                setShowExplanation(false);
                setIsComplete(false);
                setScore(0);
              }}
              variant="outline"
              className="mr-2"
            >
              Restart Quiz
            </Button>
            <Button onClick={onComplete}>Close</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
  
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm font-medium">
          Question {currentQuestionIndex + 1} of {questions.length}
        </div>
        {user ? (
          <Badge variant="outline" className="text-xs">
            Score: {score}/{currentQuestionIndex}
          </Badge>
        ) : (
          <Badge variant="outline" className="text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-300">
            Sign in to track progress
          </Badge>
        )}
      </div>
      
      <Progress value={progress} className="h-1 mb-6" />
      
      {currentQuestion && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg">{currentQuestion.questionText}</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup 
              value={selectedOption?.toString() || ""} 
              onValueChange={(value) => handleSelectOption(parseInt(value))}
              className="space-y-3"
            >
              {currentQuestion.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 rounded-md p-2 hover:bg-muted">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label 
                    htmlFor={`option-${index}`}
                    className="cursor-pointer flex-1 text-base leading-relaxed font-normal"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            
            {showExplanation && currentQuestion.explanation && (
              <div className="mt-4 p-3 bg-muted rounded-md">
                <p className="text-sm">
                  <span className="font-medium">Explanation:</span> {currentQuestion.explanation}
                </p>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={() => setShowExplanation(!showExplanation)}
              disabled={!currentQuestion.explanation}
            >
              {showExplanation ? "Hide Explanation" : "Show Explanation"}
            </Button>
            <Button 
              onClick={handleNextQuestion} 
              disabled={selectedOption === null}
            >
              {currentQuestionIndex < questions.length - 1 ? "Next Question" : "Complete Quiz"}
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}