import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Brain,
  Globe,
  Microscope,
  BookOpen,
  Scale,
  Trophy,
  Flame,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Clock,
  Zap,
  User,
} from "lucide-react";
import confetti from "canvas-confetti";

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface QuizTopic {
  id: string;
  name: string;
  icon: typeof Brain;
  color: string;
  description: string;
  questions: QuizQuestion[];
}

// Sample quiz data
const quizTopics: QuizTopic[] = [
  {
    id: "history",
    name: "History",
    icon: Brain,
    color: "from-amber-500 to-orange-600",
    description: "Test your knowledge of world history and historical events",
    questions: [
      {
        id: "h1",
        question: "Who was the first President of the United States?",
        options: [
          "Thomas Jefferson",
          "George Washington",
          "John Adams",
          "Benjamin Franklin",
        ],
        correctAnswer: 1,
        explanation:
          "George Washington served as the first President from 1789 to 1797.",
      },
      {
        id: "h2",
        question: "In which year did World War II end?",
        options: ["1944", "1945", "1946", "1947"],
        correctAnswer: 1,
        explanation:
          "World War II ended in 1945 with the surrender of Japan in September.",
      },
    ],
  },
  {
    id: "geography",
    name: "Geography",
    icon: Globe,
    color: "from-blue-500 to-cyan-600",
    description: "Explore world geography, countries, and landmarks",
    questions: [
      {
        id: "g1",
        question: "What is the capital of Australia?",
        options: ["Sydney", "Melbourne", "Canberra", "Perth"],
        correctAnswer: 2,
        explanation:
          "Canberra is the capital city of Australia, located in the Australian Capital Territory.",
      },
      {
        id: "g2",
        question: "Which is the longest river in the world?",
        options: ["Amazon River", "Nile River", "Yangtze River", "Mississippi River"],
        correctAnswer: 1,
        explanation:
          "The Nile River in Africa is generally considered the longest river in the world at about 6,650 km.",
      },
    ],
  },
  {
    id: "science",
    name: "Science & Tech",
    icon: Microscope,
    color: "from-purple-500 to-indigo-600",
    description: "Challenge yourself with science and technology questions",
    questions: [
      {
        id: "s1",
        question: "What is the chemical symbol for gold?",
        options: ["Go", "Gd", "Au", "Ag"],
        correctAnswer: 2,
        explanation:
          "Au is the chemical symbol for gold, derived from the Latin word 'aurum'.",
      },
      {
        id: "s2",
        question: "Who developed the theory of relativity?",
        options: [
          "Isaac Newton",
          "Albert Einstein",
          "Galileo Galilei",
          "Stephen Hawking",
        ],
        correctAnswer: 1,
        explanation:
          "Albert Einstein developed both the special and general theories of relativity.",
      },
    ],
  },
  {
    id: "english",
    name: "English",
    icon: BookOpen,
    color: "from-green-500 to-emerald-600",
    description: "Test your English language and literature knowledge",
    questions: [
      {
        id: "e1",
        question: "Who wrote the novel 'Pride and Prejudice'?",
        options: [
          "Charlotte Brontë",
          "Jane Austen",
          "Emily Dickinson",
          "Virginia Woolf",
        ],
        correctAnswer: 1,
        explanation: "Jane Austen wrote 'Pride and Prejudice', published in 1813.",
      },
      {
        id: "e2",
        question: "What is the plural form of 'child'?",
        options: ["childs", "childrens", "children", "child"],
        correctAnswer: 2,
        explanation: "'Children' is the correct plural form of 'child'.",
      },
    ],
  },
  {
    id: "polity",
    name: "Polity",
    icon: Scale,
    color: "from-red-500 to-rose-600",
    description: "Learn about government, politics, and civic knowledge",
    questions: [
      {
        id: "p1",
        question: "How many branches are there in the U.S. government?",
        options: ["Two", "Three", "Four", "Five"],
        correctAnswer: 1,
        explanation:
          "The U.S. government has three branches: Executive, Legislative, and Judicial.",
      },
      {
        id: "p2",
        question: "What is the term length for a U.S. Senator?",
        options: ["2 years", "4 years", "6 years", "8 years"],
        correctAnswer: 2,
        explanation: "U.S. Senators serve six-year terms.",
      },
    ],
  },
];

// Fake competitors with names and nationalities
const competitors = [
  { name: "Emma Johnson", nationality: "🇺🇸 USA", accuracy: 0.85 },
  { name: "Hiroshi Tanaka", nationality: "🇯🇵 Japan", accuracy: 0.82 },
  { name: "Sophie Müller", nationality: "🇩🇪 Germany", accuracy: 0.88 },
  { name: "Priya Sharma", nationality: "🇮🇳 India", accuracy: 0.9 },
  { name: "Lucas Silva", nationality: "🇧🇷 Brazil", accuracy: 0.86 },
  { name: "Marie Dubois", nationality: "🇫🇷 France", accuracy: 0.84 },
];

interface QuizState {
  currentTopic: QuizTopic | null;
  currentQuestionIndex: number;
  selectedAnswer: number | null;
  showResult: boolean;
  score: number;
  streak: number;
  completedQuestions: string[];
  showExplanation: boolean;
  timeLeft: number;
  answerTime: number | null;
  competitor: (typeof competitors)[0];
  competitorScore: number;
  competitorAnswerTime: number | null;
  competitorAnswer: number | null;
  showPairing: boolean;
  quizStarted: boolean;
}

const QuizApp: React.FC = () => {
  const [quizState, setQuizState] = useState<QuizState>({
    currentTopic: null,
    currentQuestionIndex: 0,
    selectedAnswer: null,
    showResult: false,
    score: 0,
    streak: parseInt(localStorage.getItem("quizStreak") || "0"),
    completedQuestions: [],
    showExplanation: false,
    timeLeft: 10,
    answerTime: null,
    competitor: competitors[Math.floor(Math.random() * competitors.length)],
    competitorScore: 0,
    competitorAnswerTime: null,
    competitorAnswer: null,
    showPairing: false,
    quizStarted: false,
  });

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const competitorTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pairingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const celebrationFiredRef = useRef(false);

  const selectTopic = (topic: QuizTopic) => {
    celebrationFiredRef.current = false;
    const newCompetitor =
      competitors[Math.floor(Math.random() * competitors.length)];
    setQuizState((prev) => ({
      ...prev,
      currentTopic: topic,
      currentQuestionIndex: 0,
      selectedAnswer: null,
      showResult: false,
      score: 0,
      completedQuestions: [],
      showExplanation: false,
      timeLeft: 10,
      answerTime: null,
      competitor: newCompetitor,
      competitorScore: 0,
      competitorAnswerTime: null,
      competitorAnswer: null,
      showPairing: true,
      quizStarted: false,
    }));
  };

  const selectAnswer = (answerIndex: number) => {
    if (quizState.showResult || quizState.answerTime !== null) return;

    const timeToAnswer = 10 - quizState.timeLeft;

    setQuizState((prev) => ({
      ...prev,
      selectedAnswer: answerIndex,
      answerTime: timeToAnswer,
    }));
  };

  const calculateScore = (isCorrect: boolean, timeToAnswer: number | null) => {
    if (!isCorrect) return 0;
    if (timeToAnswer === null) return 0; // No answer given

    // Score based on speed: 1000 points for instant answer, decreasing linearly
    const baseScore = 1000;
    const speedBonus = Math.max(0, baseScore - timeToAnswer * 100);
    return Math.round(speedBonus);
  };

  const nextQuestion = () => {
    if (!quizState.currentTopic) return;

    const isCorrect =
      quizState.selectedAnswer ===
      quizState.currentTopic.questions[quizState.currentQuestionIndex].correctAnswer;
    const scoreToAdd = calculateScore(isCorrect, quizState.answerTime);
    const newScore = quizState.score + scoreToAdd;

    // Competitor score calculation
    const competitorIsCorrect =
      quizState.competitorAnswer ===
      quizState.currentTopic.questions[quizState.currentQuestionIndex].correctAnswer;
    const competitorScoreToAdd = calculateScore(
      competitorIsCorrect,
      quizState.competitorAnswerTime
    );
    const newCompetitorScore = quizState.competitorScore + competitorScoreToAdd;

    const newStreak = isCorrect ? quizState.streak + 1 : 0;
    localStorage.setItem("quizStreak", newStreak.toString());

    if (
      quizState.currentQuestionIndex <
      quizState.currentTopic.questions.length - 1
    ) {
      setQuizState((prev) => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
        selectedAnswer: null,
        showResult: false,
        score: newScore,
        competitorScore: newCompetitorScore,
        streak: newStreak,
        completedQuestions: [
          ...prev.completedQuestions,
          prev.currentTopic!.questions[prev.currentQuestionIndex].id,
        ],
        showExplanation: false,
        timeLeft: 10,
        answerTime: null,
        competitorAnswerTime: null,
        competitorAnswer: null,
        quizStarted: true,
      }));
    } else {
      // Quiz completed
      setQuizState((prev) => ({
        ...prev,
        score: newScore,
        competitorScore: newCompetitorScore,
        streak: newStreak,
        completedQuestions: [
          ...prev.completedQuestions,
          prev.currentTopic!.questions[prev.currentQuestionIndex].id,
        ],
      }));
    }
  };

  const resetQuiz = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (competitorTimerRef.current) clearTimeout(competitorTimerRef.current);
    if (pairingTimerRef.current) clearTimeout(pairingTimerRef.current);
    celebrationFiredRef.current = false;

    setQuizState((prev) => ({
      ...prev,
      currentTopic: null,
      currentQuestionIndex: 0,
      selectedAnswer: null,
      showResult: false,
      score: 0,
      completedQuestions: [],
      showExplanation: false,
      timeLeft: 10,
      answerTime: null,
      competitorScore: 0,
      competitorAnswerTime: null,
      competitorAnswer: null,
      showPairing: false,
      quizStarted: false,
    }));
  };

  // Pairing effect
  useEffect(() => {
    if (quizState.showPairing) {
      pairingTimerRef.current = setTimeout(() => {
        setQuizState((prev) => ({
          ...prev,
          showPairing: false,
          quizStarted: true,
        }));
      }, 3000); // 3 seconds pairing time
    }

    return () => {
      if (pairingTimerRef.current) clearTimeout(pairingTimerRef.current);
    };
  }, [quizState.showPairing]);

  // Timer effect for questions
  useEffect(() => {
    if (
      quizState.currentTopic &&
      !quizState.showResult &&
      quizState.timeLeft > 0 &&
      quizState.quizStarted
    ) {
      timerRef.current = setTimeout(() => {
        setQuizState((prev) => ({
          ...prev,
          timeLeft: prev.timeLeft - 1,
        }));
      }, 1000);
    } else if (quizState.timeLeft === 0 && !quizState.showResult) {
      // Time's up - reveal and finalize unanswered times
      setQuizState((prev) => ({
        ...prev,
        showResult: true,
        showExplanation: true,
        answerTime: prev.answerTime ?? 10,
      }));
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [
    quizState.timeLeft,
    quizState.showResult,
    quizState.currentTopic,
    quizState.quizStarted,
  ]);

  // Reveal when both have answered
  useEffect(() => {
    if (!quizState.currentTopic || quizState.showResult || !quizState.quizStarted)
      return;
    const bothAnswered =
      quizState.answerTime !== null && quizState.competitorAnswerTime !== null;
    if (bothAnswered) {
      setQuizState((prev) => ({
        ...prev,
        showResult: true,
        showExplanation: true,
      }));
    }
  }, [
    quizState.answerTime,
    quizState.competitorAnswerTime,
    quizState.currentTopic,
    quizState.quizStarted,
    quizState.showResult,
  ]);

  // Competitor AI effect
  useEffect(() => {
    if (
      quizState.currentTopic &&
      !quizState.showResult &&
      quizState.competitorAnswerTime === null &&
      quizState.quizStarted
    ) {
      const currentQuestion =
        quizState.currentTopic.questions[quizState.currentQuestionIndex];
      if (currentQuestion) {
        // Competitor answers after 5-6 seconds initially, then 3-7 seconds for subsequent questions
        const minTime = quizState.currentQuestionIndex === 0 ? 5 : 3;
        const maxTime = quizState.currentQuestionIndex === 0 ? 6 : 7;
        const baseTime = minTime + Math.random() * (maxTime - minTime);
        const accuracyFactor = quizState.competitor.accuracy;
        const answerTime = Math.min(10, baseTime + (1 - accuracyFactor) * 1);

        competitorTimerRef.current = setTimeout(() => {
          // Determine if competitor gets it right based on their accuracy
          const isCorrect = Math.random() < accuracyFactor;
          let competitorChoice: number;

          if (isCorrect) {
            competitorChoice = currentQuestion.correctAnswer;
          } else {
            // Pick a random wrong answer
            const wrongAnswers = currentQuestion.options
              .map((_, index) => index)
              .filter((i) => i !== currentQuestion.correctAnswer);
            competitorChoice =
              wrongAnswers[Math.floor(Math.random() * wrongAnswers.length)];
          }

          setQuizState((prev) => ({
            ...prev,
            competitorAnswer: competitorChoice,
            competitorAnswerTime: answerTime,
          }));
        }, answerTime * 1000);
      }
    }

    return () => {
      if (competitorTimerRef.current) clearTimeout(competitorTimerRef.current);
    };
  }, [
    quizState.currentQuestionIndex,
    quizState.currentTopic,
    quizState.showResult,
    quizState.quizStarted,
  ]);

  // Auto-advance after reveal
  useEffect(() => {
    if (!quizState.showResult || !quizState.currentTopic) return;
    const delay = 3000 + Math.floor(Math.random() * 1000);
    const id = setTimeout(() => {
      nextQuestion();
    }, delay);
    return () => clearTimeout(id);
  }, [
    quizState.showResult,
    quizState.currentTopic,
    quizState.currentQuestionIndex,
  ]);
  useEffect(() => {
    if (!quizState.currentTopic) return;
    const completed =
      quizState.completedQuestions.length === quizState.currentTopic.questions.length;
    if (completed && !celebrationFiredRef.current) {
      celebrationFiredRef.current = true;
      const playerWon = quizState.score > quizState.competitorScore;
      if (playerWon) {
        const end = Date.now() + 1200;
        const colors = ["#22c55e", "#60a5fa", "#f59e0b", "#a78bfa"];
        const frame = () => {
          confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 }, colors });
          confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 }, colors });
          if (Date.now() < end) requestAnimationFrame(frame);
        };
        frame();
      }
    }
  }, [quizState.currentTopic, quizState.completedQuestions.length, quizState.score, quizState.competitorScore]);

  const currentQuestion =
    quizState.currentTopic?.questions[quizState.currentQuestionIndex];
  const isQuizCompleted =
    quizState.currentTopic &&
    quizState.completedQuestions.length ===
      quizState.currentTopic.questions.length;

  // Topic Selection Screen
  if (!quizState.currentTopic) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-primary-glow/20 p-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 pt-12">
            <h1 className="text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6">
              Competitive Quiz Arena
            </h1>
            <p className="text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Face off against competitors worldwide in real-time quiz battles!
            </p>

            {/* Main CTA */}
            <div className="mb-12">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-primary-glow text-white px-12 py-6 text-xl font-semibold rounded-full shadow-glow hover:shadow-elevation transform hover:scale-105 transition-all duration-300 border-0"
                onClick={() =>
                  document.getElementById("topics")?.scrollIntoView({
                    behavior: "smooth",
                  })
                }
              >
                <Brain className="h-6 w-6 mr-3" />
                Start Your Quiz Journey
              </Button>
            </div>

            {/* Streak Display */}
            <div className="flex items-center justify-center gap-6 mb-8">
              <div className="flex items-center gap-3 bg-gradient-card rounded-full px-8 py-4 shadow-card">
                <Flame className="h-7 w-7 text-quiz-streak animate-pulse" />
                <span className="text-3xl font-bold text-quiz-streak">
                  {quizState.streak}
                </span>
                <span className="text-lg text-muted-foreground">day streak</span>
              </div>
              <div className="flex items-center gap-3 bg-gradient-card rounded-full px-8 py-4 shadow-card">
                <Trophy className="h-7 w-7 text-primary" />
                <span className="text-lg text-muted-foreground font-medium">
                  Quiz Master
                </span>
              </div>
            </div>
          </div>

          {/* Topic Grid */}
          <div id="topics" className="scroll-mt-8">
            <h2 className="text-3xl font-bold text-center mb-8">
              Choose Your Challenge
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {quizTopics.map((topic) => {
                const IconComponent = topic.icon;
                return (
                  <Card
                    key={topic.id}
                    className="group hover:shadow-elevation transition-all duration-300 cursor-pointer transform hover:scale-105 bg-gradient-card border-0 overflow-hidden"
                    onClick={() => selectTopic(topic)}
                  >
                    <CardContent className="p-8 relative">
                      <div
                        className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${topic.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                      >
                        <IconComponent className="h-10 w-10 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                        {topic.name}
                      </h3>
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {topic.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="text-sm py-1 px-3">
                          {topic.questions.length} questions
                        </Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-gradient-to-r from-primary to-primary-glow text-white border-0 px-6 py-2 rounded-full font-semibold hover:shadow-glow transition-all duration-300"
                        >
                          Start Quiz
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Pairing Screen
  if (quizState.showPairing && quizState.currentTopic) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-primary-glow/20 p-4 flex items-center justify-center">
        <Card className="w-full max-w-2xl bg-gradient-card border-0 shadow-elevation">
          <CardContent className="p-8 text-center">
            <div className="animate-pulse mb-8">
              <h2 className="text-3xl font-bold mb-4">Finding Your Opponent...</h2>
              <div className="w-16 h-1 bg-primary mx-auto rounded-full animate-pulse"></div>
            </div>

            <div className="grid grid-cols-2 gap-8 mb-8">
              {/* User */}
              <div className="text-center p-6 bg-primary/10 rounded-xl">
                <User className="h-16 w-16 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">You</h3>
                <p className="text-muted-foreground">Ready to compete!</p>
              </div>

              {/* Competitor */}
              <div className="text-center p-6 bg-destructive/10 rounded-xl">
                <div className="w-16 h-16 mx-auto mb-4 bg-destructive/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl">
                    {quizState.competitor.nationality.split(" ")[0]}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2">
                  {quizState.competitor.name}
                </h3>
                <p className="text-muted-foreground">
                  {quizState.competitor.nationality.split(" ")[1]}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {Math.round(quizState.competitor.accuracy * 100)}% accuracy
                </p>
              </div>
            </div>

            <div className="text-4xl font-bold text-primary animate-pulse mb-6">
              VS
            </div>

            <div className="text-lg text-muted-foreground animate-bounce">
              Battle begins in moments...
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Quiz Completed Screen
  if (isQuizCompleted) {
    const playerWon = quizState.score > quizState.competitorScore;
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-primary-glow/20 p-4 flex items-center justify-center">
        <Card className="w-full max-w-3xl bg-gradient-card border-0 shadow-elevation">
          <CardContent className="p-8 text-center">
            <div className={`relative ${playerWon ? "animate-enter" : "animate-slide-in-right shake-hard"}`}>
              {playerWon && <div className="victory-rays animate-spin-slower"></div>}
              <div className="relative z-10">
                <div className={`${playerWon ? "winner-glow" : ""} mx-auto mb-6 inline-block`}>
                  <Trophy
                    className={`h-20 w-20 ${playerWon ? 'text-quiz-streak' : 'text-muted-foreground'}`}
                  />
                </div>
                <h2 className="text-4xl font-bold mb-2">
                  {playerWon ? 'Victory!' : 'Defeat!'}
                </h2>
                <p className="text-xl text-muted-foreground mb-8">
                  {playerWon ? 'You dominated the competition!' : 'Better luck next time!'}
                </p>
                
                {/* Final Scores */}
                <div className="grid grid-cols-2 gap-8 mb-8">
                  <div className={`rounded-xl p-6 ${playerWon ? 'bg-gradient-success' : 'bg-secondary'}`}>
                    <div className={`text-3xl font-bold ${playerWon ? 'text-white' : 'text-foreground'} mb-2`}>{quizState.score}</div>
                    <div className={`text-sm ${playerWon ? 'text-white/80' : 'text-muted-foreground'} mb-3`}>Your Score</div>
                    <div className="flex items-center justify-center gap-2">
                      <User className="h-4 w-4" />
                      <span className="text-sm font-medium">You</span>
                    </div>
                  </div>
                  <div className={`rounded-xl p-6 ${!playerWon ? 'bg-gradient-success' : 'bg-secondary'}`}>
                    <div className={`text-3xl font-bold ${!playerWon ? 'text-white' : 'text-foreground'} mb-2`}>{quizState.competitorScore}</div>
                    <div className={`text-sm ${!playerWon ? 'text-white/80' : 'text-muted-foreground'} mb-3`}>Opponent Score</div>
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-lg">{quizState.competitor.nationality.split(' ')[0]}</span>
                      <span className="text-sm font-medium">{quizState.competitor.name}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 mb-6">
                  <Flame className="h-6 w-6 text-quiz-streak" />
                  <span className="text-xl font-semibold">Streak: {quizState.streak} days</span>
                </div>

                <div className="flex gap-4 justify-center">
                  <Button 
                    onClick={resetQuiz}
                    variant="outline"
                    size="lg"
                  >
                    <RotateCcw className="h-5 w-5 mr-2" />
                    New Challenge
                  </Button>
                  <Button 
                    onClick={() => selectTopic(quizState.currentTopic!)}
                    size="lg"
                    className="bg-gradient-primary border-0"
                  >
                    Rematch
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Quiz Interface
  if (quizState.quizStarted) {
    return (
      <div className="h-screen overflow-hidden bg-gradient-to-br from-background via-primary/5 to-primary-glow/20 p-4">
        <div className="max-w-4xl mx-auto h-full pt-4 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" onClick={resetQuiz} className="hover:bg-secondary">
              ← Back to Arena
            </Button>

            <div className="flex items-center gap-4">
              <Badge variant="secondary">
                Question {quizState.currentQuestionIndex + 1} / {" "}
                {quizState.currentTopic.questions.length}
              </Badge>
            </div>
          </div>

          {/* Competitor Scoreboard */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            <Card className="bg-gradient-card border-0">
              <CardContent className="p-3">
                <div className="flex items-center gap-3 mb-1">
                  <User className="h-5 w-5 text-primary" />
                  <span className="font-semibold">You</span>
                </div>
                <div className="text-xl font-bold text-primary">
                  {quizState.score}
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-card border-0">
              <CardContent className="p-3">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-lg">
                    {quizState.competitor.nationality.split(" ")[0]}
                  </span>
                  <span className="font-semibold text-sm">
                    {quizState.competitor.name}
                  </span>
                </div>
                <div className="text-xl font-bold text-destructive">
                  {quizState.competitorScore}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Timer */}
          <div className="text-center mb-4">
            <div className="flex flex-col items-center">
              <div className={`relative inline-flex items-center justify-center ${quizState.timeLeft <= 3 ? 'timer-critical' : ''}`}>
                <svg width="80" height="80" viewBox="0 0 80 80" className="rotate-[-90deg]">
                  <circle cx="40" cy="40" r="28" stroke="hsl(var(--muted-foreground) / 0.25)" strokeWidth="8" fill="none" />
                  <circle
                    cx="40"
                    cy="40"
                    r="28"
                    stroke={quizState.timeLeft <= 3 ? 'hsl(var(--destructive))' : 'hsl(var(--primary-glow))'}
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                    style={{
                      strokeDasharray: `${2 * Math.PI * 28}`,
                      strokeDashoffset: `${(2 * Math.PI * 28) * (1 - Math.max(0, quizState.timeLeft) / 10)}`,
                      transition: 'stroke-dashoffset 0.5s ease, stroke 0.3s ease'
                    }}
                  />
                </svg>
                <div className="absolute text-center">
                  <div className={`flex items-center justify-center gap-1 ${quizState.timeLeft <= 3 ? 'text-destructive' : 'text-primary'}`}>
                    <Clock className="h-4 w-4" />
                    <span className="text-xl font-bold">{Math.max(0, quizState.timeLeft)}s</span>
                  </div>
                </div>
              </div>
              {quizState.competitorAnswerTime && (
                <div className="mt-2 text-sm text-muted-foreground">
                  {quizState.competitor.name} answered in {quizState.competitorAnswerTime.toFixed(1)}s
                </div>
              )}
            </div>
          </div>

          {/* Progress */}
          <div className="mb-4">
            <Progress
              value={
                ((quizState.currentQuestionIndex + (quizState.showResult ? 1 : 0)) /
                  quizState.currentTopic.questions.length) * 100
              }
              className="h-2 bg-secondary"
            />
          </div>

          {/* Question Card */}
          <Card className="bg-gradient-card border-0 shadow-card mb-4">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-6 leading-relaxed">
                {currentQuestion?.question}
              </h2>

              <div className="grid gap-3">
                {currentQuestion?.options.map((option, index) => {
                  let buttonVariant: "outline" | "default" | "destructive" | "secondary" =
                    "outline";
                  let className =
                    "h-auto p-4 text-left justify-start hover:shadow-card transition-all duration-200 relative";

                  if (quizState.showResult) {
                    if (index === currentQuestion.correctAnswer) {
                      buttonVariant = "default";
                      className += " bg-gradient-success text-white border-success";
                    } else if (
                      index === quizState.selectedAnswer &&
                      index !== currentQuestion.correctAnswer
                    ) {
                      buttonVariant = "destructive";
                      className += " bg-quiz-incorrect text-white";
                    }

                    // Show competitor's choice
                    if (index === quizState.competitorAnswer) {
                      className += " border-2 border-orange-400";
                    }
                  } else if (quizState.selectedAnswer === index) {
                    buttonVariant = "secondary";
                  }

                  return (
                    <Button
                      key={index}
                      variant={buttonVariant}
                      onClick={() => selectAnswer(index)}
                      className={className}
                      disabled={
                        quizState.showResult ||
                        quizState.timeLeft === 0 ||
                        quizState.answerTime !== null
                      }
                    >
                      <div className="flex items-center gap-3 w-full">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold">
                          {String.fromCharCode(65 + index)}
                        </div>
                        <span className="text-base">{option}</span>
                        <div className="ml-auto flex items-center gap-2">
                          {quizState.showResult &&
                            index === quizState.competitorAnswer && (
                              <span className="text-xs text-orange-400 font-medium">
                                {quizState.competitor.name.split(" ")[0]}
                              </span>
                            )}
                          {quizState.showResult &&
                            index === currentQuestion.correctAnswer && (
                              <CheckCircle2 className="h-5 w-5" />
                            )}
                          {quizState.showResult &&
                            index === quizState.selectedAnswer &&
                            index !== currentQuestion.correctAnswer && (
                              <XCircle className="h-5 w-5" />
                            )}
                          {quizState.answerTime !== null &&
                            index === quizState.selectedAnswer && (
                              <div className="flex items-center gap-1">
                                <Zap className="h-4 w-4 text-yellow-400" />
                                <span className="text-xs">
                                  {quizState.answerTime.toFixed(1)}s
                                </span>
                              </div>
                            )}
                        </div>
                      </div>
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Next Button */}
          {quizState.showResult && (
            <div className="text-center mt-auto">
              <Button
                onClick={nextQuestion}
                size="lg"
                className="bg-gradient-primary border-0 animate-bounce-in"
              >
                {quizState.currentQuestionIndex <
                quizState.currentTopic.questions.length - 1
                  ? "Next Battle"
                  : "Final Results"}
                →
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Return null if quiz not started (shouldn't happen but good fallback)
  return null;
};

export default QuizApp;
