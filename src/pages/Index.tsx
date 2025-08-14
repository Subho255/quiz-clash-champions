import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import confetti from "canvas-confetti";

// SVG Icons
const BrainIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M9.5 2C8.46 2 7.5 2.53 6.93 3.4C6.62 3.14 6.22 3 5.8 3C4.81 3 4 3.81 4 4.8C4 5.22 4.14 5.62 4.4 5.93C3.53 6.5 3 7.46 3 8.5V16.5C3 18.43 4.57 20 6.5 20H9.5C11.43 20 13 18.43 13 16.5V8.5C13 6.57 11.43 5 9.5 5C8.46 5 7.5 5.53 6.93 6.4C6.62 6.14 6.22 6 5.8 6C5.36 6 4.96 6.14 4.65 6.4C4.08 5.53 3.12 5 2.08 5C2.08 3.57 3.15 2.5 4.58 2.5H9.5C11.43 2.5 13 4.07 13 6V8.5H15.5C17.43 8.5 19 10.07 19 12V16.5C19 18.43 17.43 20 15.5 20H12.5C10.57 20 9 18.43 9 16.5V14.5H6.5C4.57 14.5 3 12.93 3 11V8.5C3 6.57 4.57 5 6.5 5H9.5Z"/>
  </svg>
);

const GlobeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2ZM11 19.93C7.05 19.44 4 16.08 4 12C4 11.38 4.08 10.79 4.21 10.21L9 15V16C9 17.1 9.9 18 11 18V19.93ZM17.9 17.39C17.64 16.58 16.9 16 16 16H15V13C15 12.45 14.55 12 14 12H8V10H10C10.55 10 11 9.55 11 9V7H13C14.1 7 15 6.1 15 5V4.59C17.93 5.77 20 8.65 20 12C20 14.08 19.2 15.97 17.9 17.39Z"/>
  </svg>
);

const MicroscopeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M9.5 2V4H11V13.85C11 14.72 11.44 15.54 12.18 16L14.18 17.45C14.6 17.78 15.16 17.95 15.74 17.95H18V20H5V18H8.26C7.68 17.95 7.12 17.78 6.7 17.45L4.7 16C3.96 15.54 3.52 14.72 3.52 13.85V4H4.5V2H9.5ZM18 16V14H16V16H18ZM18 12V10H16V12H18Z"/>
  </svg>
);

const BookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19ZM17 7H7V9H17V7ZM17 11H7V13H17V11ZM17 15H7V17H17V15Z"/>
  </svg>
);

const ScaleIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M7 8C7 6.9 6.1 6 5 6S3 6.9 3 8 3.9 10 5 10 7 9.1 7 8ZM5 2C3.9 2 3 2.9 3 4S3.9 6 5 6 7 5.1 7 4 6.1 2 5 2ZM19 14C20.1 14 21 13.1 21 12S20.1 10 19 10 17 10.9 17 12 17.9 14 19 14ZM5 16C3.9 16 3 16.9 3 18S3.9 20 5 20 7 19.1 7 18 6.1 16 5 16ZM12 2C10.9 2 10 2.9 10 4V6H14V4C14 2.9 13.1 2 12 2ZM12 8C13.1 8 14 8.9 14 10S13.1 12 12 12 10 11.1 10 10 10.9 8 12 8Z"/>
  </svg>
);

const TrophyIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20.38C20.8 4 21.11 4.42 20.96 4.82L20.76 5.26C20.17 6.69 19 7.73 17.62 8.02C16.84 8.18 16.05 8.1 15.34 7.82C14.36 9.5 12.84 10.76 11 11.35V19H15C15.55 19 16 19.45 16 20S15.55 21 15 21H9C8.45 21 8 20.55 8 20S8.45 19 9 19H13V11.35C11.16 10.76 9.64 9.5 8.66 7.82C7.95 8.1 7.16 8.18 6.38 8.02C5 7.73 3.83 6.69 3.24 5.26L3.04 4.82C2.89 4.42 3.2 4 3.62 4H7Z"/>
  </svg>
);

const FlameIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M12.45 16.5C12.45 16.5 15 14.4 15 11.47C15 8.5 12.45 6.5 12.45 6.5S9.9 8.5 9.9 11.47C9.9 14.4 12.45 16.5 12.45 16.5ZM12.45 2C12.45 2 18 6.27 18 12.22C18 17.5 15.31 22 12.45 22S6.9 17.5 6.9 12.22C6.9 6.27 12.45 2 12.45 2Z"/>
  </svg>
);

const CheckCircleIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"/>
  </svg>
);

const XCircleIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M12 2C6.47 2 2 6.47 2 12S6.47 22 12 22 22 17.53 22 12 17.53 2 12 2ZM17 15.59L15.59 17L12 13.41L8.41 17L7 15.59L10.59 12L7 8.41L8.41 7L12 10.59L15.59 7L17 8.41L13.41 12L17 15.59Z"/>
  </svg>
);

const RotateIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M12 4V1L8 5L12 9V6C15.31 6 18 8.69 18 12S15.31 18 12 18 6 15.31 6 12H4C4 16.42 7.58 20 12 20S20 16.42 20 12 16.42 4 12 4Z"/>
  </svg>
);

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2ZM13 17L11 15.5V7H13V14.5L15.5 16.5L13 17Z"/>
  </svg>
);

const ZapIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z"/>
  </svg>
);

const UserIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M12 12C14.21 12 16 10.21 16 8S14.21 4 12 4 8 5.79 8 8 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"/>
  </svg>
);

const CrownIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M5 16L3 5L7.5 7L12 2L16.5 7L21 5L19 16H5ZM5 19H19V21H5V19Z"/>
  </svg>
);

const FrownIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2ZM8.5 8C9.33 8 10 8.67 10 9.5S9.33 11 8.5 11 7 10.33 7 9.5 7.67 8 8.5 8ZM16.5 17H7.5C7.22 17 7 16.78 7 16.5S7.5 14 12 14 17 16.22 17 16.5 16.78 17 16.5 17ZM15.5 11C14.67 11 14 10.33 14 9.5S14.67 8 15.5 8 17 8.67 17 9.5 16.33 11 15.5 11Z"/>
  </svg>
);

const ListIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M3 13H5V11H3V13ZM3 17H5V15H3V17ZM3 9H5V7H3V9ZM7 13H21V11H7V13ZM7 17H21V15H7V17ZM7 7V9H21V7H7Z"/>
  </svg>
);

const MedalIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M12 8C13.1 8 14 8.9 14 10S13.1 12 12 12 10 11.1 10 10 10.9 8 12 8ZM12 6C9.79 6 8 7.79 8 10S9.79 14 12 14 16 12.21 16 10 14.21 6 12 6ZM7.5 2L9 6L12 4L15 6L16.5 2L12 4L7.5 2ZM6 16L8 20L12 18L16 20L18 16L12 18L6 16Z"/>
  </svg>
);

const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
  </svg>
);

const LifelineIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12S7.59 4 12 4 20 7.59 20 12 16.41 20 12 20ZM9.5 8C8.67 8 8 8.67 8 9.5S8.67 11 9.5 11 11 10.33 11 9.5 10.33 8 9.5 8ZM14.5 8C13.67 8 13 8.67 13 9.5S13.67 11 14.5 11 16 10.33 16 9.5 15.33 8 14.5 8ZM8 15C8.55 15 9 14.55 9 14C9 13.45 8.55 13 8 13S7 13.45 7 14C7 14.55 7.45 15 8 15ZM16 15C16.55 15 17 14.55 17 14C17 13.45 16.55 13 16 13S15 13.45 15 14C15 14.55 15.45 15 16 15Z"/>
  </svg>
);

const ShareIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M18 16.08C17.24 16.08 16.56 16.38 16.04 16.85L8.91 12.7C8.96 12.47 9 12.24 9 12S8.96 11.53 8.91 11.3L15.96 7.19C16.5 7.69 17.21 8 18 8C19.66 8 21 6.66 21 5S19.66 2 18 2 15 3.34 15 5C15 5.24 15.04 5.47 15.09 5.7L8.04 9.81C7.5 9.31 6.79 9 6 9C4.34 9 3 10.34 3 12S4.34 15 6 15C6.79 15 7.5 14.69 8.04 14.19L15.16 18.34C15.11 18.55 15.08 18.77 15.08 19C15.08 20.61 16.39 21.92 18 21.92S20.92 20.61 20.92 19C20.92 17.39 19.61 16.08 18 16.08Z"/>
  </svg>
);

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
  icon: React.ComponentType;
  color: string;
  description: string;
  questions: QuizQuestion[];
}

// Sample quiz data
const quizTopics: QuizTopic[] = [
  {
    id: "history",
    name: "History",
    icon: BrainIcon,
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
      {
        id: "h3",
        question: "Which ancient wonder of the world was located in Alexandria?",
        options: ["Hanging Gardens", "Lighthouse of Alexandria", "Colossus of Rhodes", "Temple of Artemis"],
        correctAnswer: 1,
        explanation: "The Lighthouse of Alexandria was one of the Seven Wonders of the Ancient World.",
      },
      {
        id: "h4",
        question: "Who was the first person to walk on the moon?",
        options: ["Buzz Aldrin", "Neil Armstrong", "John Glenn", "Alan Shepard"],
        correctAnswer: 1,
        explanation: "Neil Armstrong was the first person to walk on the moon during Apollo 11 in 1969.",
      },
      {
        id: "h5",
        question: "The Berlin Wall fell in which year?",
        options: ["1987", "1988", "1989", "1990"],
        correctAnswer: 2,
        explanation: "The Berlin Wall fell in 1989, marking the beginning of German reunification.",
      },
      {
        id: "h6",
        question: "Which empire was ruled by Julius Caesar?",
        options: ["Greek Empire", "Roman Empire", "Byzantine Empire", "Ottoman Empire"],
        correctAnswer: 1,
        explanation: "Julius Caesar was a Roman general and statesman who ruled the Roman Empire.",
      },
      {
        id: "h7",
        question: "The Titanic sank in which year?",
        options: ["1910", "1911", "1912", "1913"],
        correctAnswer: 2,
        explanation: "The Titanic sank on April 15, 1912, during its maiden voyage.",
      },
      {
        id: "h8",
        question: "Who was the first female pharaoh of Egypt?",
        options: ["Cleopatra", "Nefertiti", "Hatshepsut", "Ankhesenamun"],
        correctAnswer: 2,
        explanation: "Hatshepsut was one of the first documented female pharaohs of Egypt.",
      },
      {
        id: "h9",
        question: "The Renaissance began in which country?",
        options: ["France", "Italy", "Spain", "England"],
        correctAnswer: 1,
        explanation: "The Renaissance began in Italy during the 14th century.",
      },
      {
        id: "h10",
        question: "Which war was fought between 1861-1865 in America?",
        options: ["Revolutionary War", "Civil War", "War of 1812", "Spanish-American War"],
        correctAnswer: 1,
        explanation: "The American Civil War was fought from 1861 to 1865.",
      },
    ],
  },
  {
    id: "geography",
    name: "Geography",
    icon: GlobeIcon,
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
      {
        id: "g3",
        question: "Which mountain range contains Mount Everest?",
        options: ["Andes", "Rocky Mountains", "Himalayas", "Alps"],
        correctAnswer: 2,
        explanation: "Mount Everest is located in the Himalayas on the border between Nepal and China.",
      },
      {
        id: "g4",
        question: "What is the smallest country in the world?",
        options: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"],
        correctAnswer: 1,
        explanation: "Vatican City is the smallest country in the world with an area of 0.17 square miles.",
      },
      {
        id: "g5",
        question: "Which desert is the largest in the world?",
        options: ["Sahara", "Gobi", "Antarctic Desert", "Arabian Desert"],
        correctAnswer: 2,
        explanation: "The Antarctic Desert is the largest desert in the world by area.",
      },
      {
        id: "g6",
        question: "Which country has the most time zones?",
        options: ["Russia", "United States", "China", "France"],
        correctAnswer: 0,
        explanation: "Russia spans 11 time zones, the most of any country in the world.",
      },
      {
        id: "g7",
        question: "What is the deepest ocean trench?",
        options: ["Puerto Rico Trench", "Java Trench", "Mariana Trench", "Peru-Chile Trench"],
        correctAnswer: 2,
        explanation: "The Mariana Trench in the Pacific Ocean is the deepest part of Earth's oceans.",
      },
      {
        id: "g8",
        question: "Which African country was never colonized?",
        options: ["Ethiopia", "Liberia", "Both Ethiopia and Liberia", "Morocco"],
        correctAnswer: 2,
        explanation: "Both Ethiopia and Liberia were never fully colonized by European powers.",
      },
      {
        id: "g9",
        question: "What is the highest waterfall in the world?",
        options: ["Niagara Falls", "Angel Falls", "Victoria Falls", "Iguazu Falls"],
        correctAnswer: 1,
        explanation: "Angel Falls in Venezuela is the world's highest uninterrupted waterfall.",
      },
      {
        id: "g10",
        question: "Which strait separates Europe and Africa?",
        options: ["Bering Strait", "Strait of Gibraltar", "Strait of Hormuz", "Strait of Malacca"],
        correctAnswer: 1,
        explanation: "The Strait of Gibraltar separates Europe (Spain) from Africa (Morocco).",
      },
    ],
  },
  {
    id: "science",
    name: "Science & Tech",
    icon: MicroscopeIcon,
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
      {
        id: "s3",
        question: "What is the powerhouse of the cell?",
        options: ["Nucleus", "Mitochondria", "Ribosome", "Endoplasmic Reticulum"],
        correctAnswer: 1,
        explanation: "Mitochondria are often called the powerhouse of the cell as they produce ATP energy.",
      },
      {
        id: "s4",
        question: "What is the speed of light in vacuum?",
        options: ["299,792,458 m/s", "300,000,000 m/s", "299,000,000 m/s", "301,000,000 m/s"],
        correctAnswer: 0,
        explanation: "The speed of light in vacuum is exactly 299,792,458 meters per second.",
      },
      {
        id: "s5",
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correctAnswer: 1,
        explanation: "Mars is known as the Red Planet due to iron oxide (rust) on its surface.",
      },
      {
        id: "s6",
        question: "What is the hardest natural substance on Earth?",
        options: ["Quartz", "Diamond", "Granite", "Steel"],
        correctAnswer: 1,
        explanation: "Diamond is the hardest naturally occurring substance on Earth.",
      },
      {
        id: "s7",
        question: "How many chromosomes do humans have?",
        options: ["44", "46", "48", "50"],
        correctAnswer: 1,
        explanation: "Humans have 46 chromosomes arranged in 23 pairs.",
      },
      {
        id: "s8",
        question: "What gas makes up about 78% of Earth's atmosphere?",
        options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Argon"],
        correctAnswer: 1,
        explanation: "Nitrogen makes up approximately 78% of Earth's atmosphere.",
      },
      {
        id: "s9",
        question: "What is the smallest unit of matter?",
        options: ["Molecule", "Atom", "Proton", "Electron"],
        correctAnswer: 1,
        explanation: "An atom is the smallest unit of matter that retains the properties of an element.",
      },
      {
        id: "s10",
        question: "Which scientist proposed the laws of motion?",
        options: ["Albert Einstein", "Isaac Newton", "Galileo Galilei", "Johannes Kepler"],
        correctAnswer: 1,
        explanation: "Sir Isaac Newton formulated the three laws of motion in his work Principia Mathematica.",
      },
    ],
  },
  {
    id: "english",
    name: "English",
    icon: BookIcon,
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
      {
        id: "e3",
        question: "Which Shakespeare play features the character Hamlet?",
        options: ["Macbeth", "Romeo and Juliet", "Hamlet", "Othello"],
        correctAnswer: 2,
        explanation: "Hamlet is the protagonist of Shakespeare's tragedy 'Hamlet'.",
      },
      {
        id: "e4",
        question: "What is a synonym for 'happy'?",
        options: ["Sad", "Joyful", "Angry", "Tired"],
        correctAnswer: 1,
        explanation: "'Joyful' is a synonym for 'happy', meaning feeling great pleasure and happiness.",
      },
      {
        id: "e5",
        question: "Which word is an antonym of 'hot'?",
        options: ["Warm", "Cold", "Boiling", "Heated"],
        correctAnswer: 1,
        explanation: "'Cold' is the opposite or antonym of 'hot'.",
      },
      {
        id: "e6",
        question: "What is the past tense of 'run'?",
        options: ["Runned", "Ran", "Running", "Runs"],
        correctAnswer: 1,
        explanation: "'Ran' is the correct past tense form of the verb 'run'.",
      },
      {
        id: "e7",
        question: "Who wrote '1984'?",
        options: ["George Orwell", "Aldous Huxley", "Ray Bradbury", "H.G. Wells"],
        correctAnswer: 0,
        explanation: "George Orwell wrote the dystopian novel '1984', published in 1949.",
      },
      {
        id: "e8",
        question: "What type of word describes a noun?",
        options: ["Verb", "Adjective", "Adverb", "Preposition"],
        correctAnswer: 1,
        explanation: "An adjective is a word that describes or modifies a noun.",
      },
      {
        id: "e9",
        question: "Which is correct: 'There', 'Their', or 'They're' in 'The students left ___ books'?",
        options: ["There", "Their", "They're", "All are correct"],
        correctAnswer: 1,
        explanation: "'Their' is possessive and shows that the books belong to the students.",
      },
      {
        id: "e10",
        question: "What is the superlative form of 'good'?",
        options: ["Gooder", "Better", "Best", "Goodest"],
        correctAnswer: 2,
        explanation: "'Best' is the superlative form of 'good' (good, better, best).",
      },
    ],
  },
  {
    id: "polity",
    name: "Polity",
    icon: ScaleIcon,
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
      {
        id: "p3",
        question: "Which amendment gave women the right to vote?",
        options: ["18th", "19th", "20th", "21st"],
        correctAnswer: 1,
        explanation: "The 19th Amendment, ratified in 1920, gave women the right to vote.",
      },
      {
        id: "p4",
        question: "How many justices are on the Supreme Court?",
        options: ["7", "8", "9", "10"],
        correctAnswer: 2,
        explanation: "The U.S. Supreme Court has nine justices.",
      },
      {
        id: "p5",
        question: "What is the minimum age to be President?",
        options: ["30", "35", "40", "45"],
        correctAnswer: 1,
        explanation: "The Constitution requires the President to be at least 35 years old.",
      },
      {
        id: "p6",
        question: "Which house of Congress has the power to impeach?",
        options: ["Senate", "House of Representatives", "Both", "Neither"],
        correctAnswer: 1,
        explanation: "The House of Representatives has the sole power to impeach federal officials.",
      },
      {
        id: "p7",
        question: "How many electoral votes are needed to win the presidency?",
        options: ["270", "280", "290", "300"],
        correctAnswer: 0,
        explanation: "A candidate needs 270 electoral votes out of 538 total to win the presidency.",
      },
      {
        id: "p8",
        question: "Which amendment protects freedom of speech?",
        options: ["First", "Second", "Fourth", "Fifth"],
        correctAnswer: 0,
        explanation: "The First Amendment protects freedom of speech, religion, press, and assembly.",
      },
      {
        id: "p9",
        question: "What is the term length for a U.S. Representative?",
        options: ["2 years", "4 years", "6 years", "8 years"],
        correctAnswer: 0,
        explanation: "U.S. Representatives serve two-year terms.",
      },
      {
        id: "p10",
        question: "Who presides over the Senate?",
        options: ["President", "Vice President", "Speaker of the House", "Chief Justice"],
        correctAnswer: 1,
        explanation: "The Vice President serves as the President of the Senate.",
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
  { name: "Ahmed Hassan", nationality: "🇪🇬 Egypt", accuracy: 0.87 },
  { name: "Isabella Rodriguez", nationality: "🇪🇸 Spain", accuracy: 0.83 },
  { name: "Chen Wei", nationality: "🇨🇳 China", accuracy: 0.91 },
  { name: "Olaf Larsen", nationality: "🇳🇴 Norway", accuracy: 0.89 },
  { name: "Amara Okafor", nationality: "🇳🇬 Nigeria", accuracy: 0.85 },
  { name: "Viktor Petrov", nationality: "🇷🇺 Russia", accuracy: 0.88 },
  { name: "Giulia Romano", nationality: "🇮🇹 Italy", accuracy: 0.86 },
  { name: "Jin Park", nationality: "🇰🇷 South Korea", accuracy: 0.89 },
  { name: "Ana Silva", nationality: "🇵🇹 Portugal", accuracy: 0.84 },
  { name: "Raj Patel", nationality: "🇮🇳 India", accuracy: 0.92 },
  { name: "Sarah O'Connor", nationality: "🇮🇪 Ireland", accuracy: 0.87 },
  { name: "Mohammed Al-Rashid", nationality: "🇸🇦 Saudi Arabia", accuracy: 0.85 },
  { name: "Lisa Anderson", nationality: "🇸🇪 Sweden", accuracy: 0.88 },
  { name: "Carlos Mendoza", nationality: "🇲🇽 Mexico", accuracy: 0.83 },
  { name: "Fatima Ben Ali", nationality: "🇹🇳 Tunisia", accuracy: 0.86 },
  { name: "Hans Schmidt", nationality: "🇦🇹 Austria", accuracy: 0.87 },
  { name: "Natasha Volkov", nationality: "🇺🇦 Ukraine", accuracy: 0.89 },
  { name: "James Wilson", nationality: "🇦🇺 Australia", accuracy: 0.85 },
  { name: "Maria Garcia", nationality: "🇨🇴 Colombia", accuracy: 0.84 },
  { name: "Aleksandr Novak", nationality: "🇨🇿 Czech Republic", accuracy: 0.86 },
  { name: "Leila Hosseini", nationality: "🇮🇷 Iran", accuracy: 0.88 },
  { name: "Tom Clarke", nationality: "🇳🇿 New Zealand", accuracy: 0.87 },
  { name: "Ingrid Johansson", nationality: "🇩🇰 Denmark", accuracy: 0.89 },
  { name: "David Kim", nationality: "🇨🇦 Canada", accuracy: 0.86 },
  { name: "Elena Popov", nationality: "🇧🇬 Bulgaria", accuracy: 0.85 },
  { name: "Ravi Gupta", nationality: "🇧🇩 Bangladesh", accuracy: 0.84 },
  { name: "Anna Kowalski", nationality: "🇵🇱 Poland", accuracy: 0.87 },
  { name: "Miguel Santos", nationality: "🇦🇷 Argentina", accuracy: 0.83 },
  { name: "Yuki Sato", nationality: "🇯🇵 Japan", accuracy: 0.90 },
  { name: "Rachel Cohen", nationality: "🇮🇱 Israel", accuracy: 0.88 },
  { name: "Finn Eriksen", nationality: "🇫🇮 Finland", accuracy: 0.89 },
  { name: "Grace Choi", nationality: "🇸🇬 Singapore", accuracy: 0.91 },
  { name: "Omar Farouk", nationality: "🇱🇧 Lebanon", accuracy: 0.86 },
  { name: "Petra Novakova", nationality: "🇸🇰 Slovakia", accuracy: 0.85 },
  { name: "Roberto Costa", nationality: "🇧🇷 Brazil", accuracy: 0.84 },
  { name: "Zara Khan", nationality: "🇵🇰 Pakistan", accuracy: 0.87 },
  { name: "Lars Hansen", nationality: "🇳🇱 Netherlands", accuracy: 0.88 },
  { name: "Maya Patel", nationality: "🇬🇧 UK", accuracy: 0.89 },
  { name: "Stefan Mueller", nationality: "🇨🇭 Switzerland", accuracy: 0.90 },
  { name: "Yusuf Ozkan", nationality: "🇹🇷 Turkey", accuracy: 0.86 },
  { name: "Noor Al-Zahra", nationality: "🇯🇴 Jordan", accuracy: 0.85 },
  { name: "Pierre Dubois", nationality: "🇧🇪 Belgium", accuracy: 0.87 },
  { name: "Kenji Nakamura", nationality: "🇯🇵 Japan", accuracy: 0.88 },
  { name: "Sofia Reyes", nationality: "🇨🇱 Chile", accuracy: 0.84 },
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
  showLeaderboard: boolean;
  isMatching: boolean;
  showNextQuestionLoader: boolean;
  questionStartTime: number | null;
  consecutiveCorrect: number;
  showCelebration: boolean;
  lifelinesUsed: number;
  usedLifeline: boolean;
  showSharing: boolean;
}

// Leaderboard data
const getLeaderboardData = (currentScore: number) => [
  { name: "Sarah Chen", score: Math.max(currentScore + 50, 2450), country: "🇸🇬", rank: 1 },
  { name: "Alex Rodriguez", score: Math.max(currentScore + 20, 2380), country: "🇲🇽", rank: 2 },
  { name: "Yuki Tanaka", score: Math.max(currentScore + 10, 2350), country: "🇯🇵", rank: 3 },
  { name: "You", score: currentScore, country: "🏳️", rank: currentScore > 2450 ? 1 : currentScore > 2380 ? 2 : currentScore > 2350 ? 3 : 4 },
  { name: "Emma Wilson", score: Math.max(currentScore - 100, 2200), country: "🇬🇧", rank: 5 },
  { name: "Lucas Silva", score: Math.max(currentScore - 150, 2100), country: "🇧🇷", rank: 6 },
];

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
    showLeaderboard: false,
    isMatching: false,
    showNextQuestionLoader: false,
    questionStartTime: null,
    consecutiveCorrect: 0,
    showCelebration: false,
    lifelinesUsed: 0,
    usedLifeline: false,
    showSharing: false,
  });

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const competitorTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pairingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const celebrationFiredRef = useRef(false);

  const selectTopic = (topic: QuizTopic) => {
    celebrationFiredRef.current = false;
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
      competitor: competitors[0], // Placeholder during matching
      competitorScore: 0,
      competitorAnswerTime: null,
      competitorAnswer: null,
      showPairing: false,
      quizStarted: false,
      isMatching: true,
      showNextQuestionLoader: false,
      questionStartTime: null,
      consecutiveCorrect: 0,
      showCelebration: false,
      lifelinesUsed: 0,
      usedLifeline: false,
      showSharing: false,
    }));
    
    // Show matching animation first
    setTimeout(() => {
      const newCompetitor = competitors[Math.floor(Math.random() * competitors.length)];
      setQuizState(prev => ({
        ...prev,
        competitor: newCompetitor,
        isMatching: false,
        showPairing: true,
      }));
      
      // Then start quiz after pairing screen
      setTimeout(() => {
        setQuizState(prev => ({
          ...prev,
          quizStarted: true,
          showPairing: false,
          questionStartTime: Date.now(),
        }));
      }, 3000);
    }, 2000);
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

    // Max 20 points per question (200 total for 10 questions), based on speed
    const baseScore = 20;
    const speedMultiplier = Math.max(0, (10 - timeToAnswer) / 10); // 0 to 1 based on speed
    return Math.round(baseScore * speedMultiplier);
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
    const newConsecutiveCorrect = isCorrect ? quizState.consecutiveCorrect + 1 : 0;
    localStorage.setItem("quizStreak", newStreak.toString());

    // Check for celebration
    const shouldCelebrate = newConsecutiveCorrect === 3;
    if (shouldCelebrate) {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#22c55e', '#10b981', '#059669']
      });
    }

    // Show loading animation first
    setQuizState((prev) => ({
      ...prev,
      showNextQuestionLoader: true,
      score: newScore,
      competitorScore: newCompetitorScore,
      streak: newStreak,
      consecutiveCorrect: newConsecutiveCorrect,
      showCelebration: shouldCelebrate,
    }));

    // Then move to next question after delay
    setTimeout(() => {
      if (
        quizState.currentQuestionIndex <
        quizState.currentTopic.questions.length - 1
      ) {
        setQuizState((prev) => ({
          ...prev,
          currentQuestionIndex: prev.currentQuestionIndex + 1,
          selectedAnswer: null,
          showResult: false,
          showNextQuestionLoader: false,
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
          questionStartTime: Date.now(),
          usedLifeline: false,
        }));
      } else {
        // Quiz completed
        setQuizState((prev) => ({
          ...prev,
          showNextQuestionLoader: false,
          completedQuestions: [
            ...prev.completedQuestions,
            prev.currentTopic!.questions[prev.currentQuestionIndex].id,
          ],
        }));
      }
    }, 2000);
  };

  const useLifeline = () => {
    if (quizState.lifelinesUsed >= 2 || quizState.usedLifeline || !currentQuestion) return;
    
    const correctIndex = currentQuestion.correctAnswer;
    const wrongIndexes = currentQuestion.options
      .map((_, index) => index)
      .filter(i => i !== correctIndex);
    
    // Remove 2 wrong answers randomly
    const toRemove = wrongIndexes.sort(() => Math.random() - 0.5).slice(0, 2);
    
    setQuizState(prev => ({
      ...prev,
      lifelinesUsed: prev.lifelinesUsed + 1,
      usedLifeline: true,
      // Mark which options to hide
      hiddenOptions: toRemove,
    }));
  };

  const shareScore = async () => {
    const shareText = `I just scored ${quizState.score} points in the Competitive Quiz Arena! Can you beat my score? 🧠🏆`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Quiz Arena Score',
          text: shareText,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(shareText + ' ' + window.location.href);
        // Show toast or notification
        setQuizState(prev => ({ ...prev, showSharing: true }));
        setTimeout(() => {
          setQuizState(prev => ({ ...prev, showSharing: false }));
        }, 2000);
      } catch (err) {
        console.error('Failed to copy to clipboard');
      }
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

  // Leaderboard Screen
  if (quizState.showLeaderboard) {
    const leaderboardData = getLeaderboardData(quizState.score);
    const sortedLeaderboard = leaderboardData.sort((a, b) => b.score - a.score);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-primary-glow/20 p-4">
        <div className="max-w-4xl mx-auto pt-8">
          <div className="flex items-center justify-between mb-8">
            <Button variant="ghost" onClick={() => setQuizState(prev => ({ ...prev, showLeaderboard: false }))}>
              ← Back
            </Button>
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 text-yellow-400">
                <TrophyIcon />
              </div>
              <h1 className="text-4xl font-bold">Global Leaderboard</h1>
            </div>
            <div></div>
          </div>

          <Card className="bg-gradient-card border-0 shadow-card">
            <CardContent className="p-8">
              <div className="space-y-4">
                {sortedLeaderboard.map((player, index) => {
                  const actualRank = index + 1;
                  const isCurrentUser = player.name === "You";
                  
                  return (
                    <div
                      key={`${player.name}-${index}`}
                      className={`flex items-center gap-6 p-6 rounded-xl transition-all duration-300 ${
                        isCurrentUser 
                          ? 'bg-gradient-to-r from-emerald-500/20 to-green-400/20 ring-2 ring-emerald-400/30 shadow-lg' 
                          : 'bg-secondary/50 hover:bg-secondary/80'
                      }`}
                    >
                      {/* Rank */}
                      <div className={`flex items-center justify-center w-16 h-16 rounded-full text-2xl font-black ${
                        actualRank === 1 ? 'bg-yellow-400/20 text-yellow-400' :
                        actualRank === 2 ? 'bg-slate-400/20 text-slate-400' :
                        actualRank === 3 ? 'bg-amber-600/20 text-amber-600' :
                        'bg-primary/20 text-primary'
                      }`}>
                        {actualRank === 1 ? (
                          <div className="h-8 w-8"><CrownIcon /></div>
                        ) : actualRank === 2 ? (
                          <div className="h-8 w-8"><MedalIcon /></div>
                        ) : actualRank === 3 ? (
                          <div className="h-8 w-8"><StarIcon /></div>
                        ) : (
                          actualRank
                        )}
                      </div>

                      {/* Player Info */}
                      <div className="flex items-center gap-4 flex-1">
                        <div className="text-3xl">{player.country}</div>
                        <div>
                          <div className={`text-xl font-bold ${isCurrentUser ? 'text-emerald-100' : 'text-foreground'}`}>
                            {player.name}
                          </div>
                          <div className={`text-sm ${isCurrentUser ? 'text-emerald-200' : 'text-muted-foreground'}`}>
                            Quiz Champion
                          </div>
                        </div>
                      </div>

                      {/* Score */}
                      <div className="text-right">
                        <div className={`text-3xl font-black ${
                          actualRank === 1 ? 'text-yellow-400' :
                          actualRank === 2 ? 'text-slate-400' :
                          actualRank === 3 ? 'text-amber-600' :
                          isCurrentUser ? 'text-emerald-300' :
                          'text-primary'
                        }`}>
                          {player.score.toLocaleString()}
                        </div>
                        <div className={`text-sm ${isCurrentUser ? 'text-emerald-200' : 'text-muted-foreground'}`}>
                          points
                        </div>
                      </div>

                      {/* Special Effects */}
                      {actualRank <= 3 && (
                        <div className="flex items-center">
                          <div className={`h-6 w-6 ${
                            actualRank === 1 ? 'text-yellow-400' :
                            actualRank === 2 ? 'text-slate-400' :
                            'text-amber-600'
                          }`}>
                            <ZapIcon />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 text-center">
                <Button
                  onClick={() => setQuizState(prev => ({ ...prev, showLeaderboard: false }))}
                  size="lg"
                  className="bg-gradient-primary border-0"
                >
                  Start Playing to Climb!
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Topic Selection Screen
  if (!quizState.currentTopic) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-primary-glow/20 p-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 md:mb-16 pt-6 md:pt-12">
            <h1 className="text-3xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4 md:mb-6">
              Competitive Quiz Arena
            </h1>
            <p className="text-lg md:text-2xl text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed">
              Face off against competitors worldwide in real-time quiz battles!
            </p>

            {/* Main CTA */}
            <div className="mb-8 md:mb-12 flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-primary-glow text-white px-6 md:px-12 py-4 md:py-6 text-lg md:text-xl font-semibold rounded-full shadow-glow hover:shadow-elevation transform hover:scale-105 transition-all duration-300 border-0"
                onClick={() =>
                  document.getElementById("topics")?.scrollIntoView({
                    behavior: "smooth",
                  })
                }
              >
                <div className="h-5 w-5 md:h-6 md:w-6 mr-2 md:mr-3">
                  <BrainIcon />
                </div>
                Start Your Quiz Journey
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="px-6 md:px-12 py-4 md:py-6 text-lg md:text-xl font-semibold rounded-full transform hover:scale-105 transition-all duration-300"
                onClick={() => setQuizState(prev => ({ ...prev, showLeaderboard: true }))}
              >
                <div className="h-5 w-5 md:h-6 md:w-6 mr-2 md:mr-3">
                  <TrophyIcon />
                </div>
                View Leaderboard
              </Button>
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
                        <div className="h-10 w-10 text-white">
                          <IconComponent />
                        </div>
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

  // Matching Animation Screen
  if (quizState.isMatching && quizState.currentTopic) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-primary-glow/20 p-4 flex items-center justify-center">
        <Card className="w-full max-w-2xl bg-gradient-card border-0 shadow-elevation">
          <CardContent className="p-6 md:p-8 text-center">
            <div className="mb-6 md:mb-8">

            <div className="relative mb-6">
              <div className="w-20 h-20 md:w-24 md:h-24 mx-auto rounded-full bg-gradient-to-r from-primary to-primary-foreground flex items-center justify-center animate-pulse">
                <div className="w-10 h-10 md:w-12 md:h-12 text-white animate-bounce">
                  <ZapIcon />
                </div>
              </div>
              <div className="absolute -top-2 -right-8 md:-right-12 w-6 h-6 md:w-8 md:h-8 bg-yellow-400 rounded-full animate-ping"></div>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Finding Your Match</h2>
            <p className="text-muted-foreground mb-4">Connecting with competitors worldwide...</p>
            <div className="flex justify-center space-x-1">
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
            </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Pairing Screen
  if (quizState.showPairing && quizState.currentTopic) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-primary-glow/20 p-4 flex items-center justify-center">
        <Card className="w-full max-w-2xl bg-gradient-card border-0 shadow-elevation">
          <CardContent className="p-8 text-center">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-4">Opponent Found!</h2>
              <div className="w-16 h-1 bg-primary mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-2 gap-8 mb-8">
              {/* User */}
              <div className="text-center p-6 bg-primary/10 rounded-xl">
                <div className="h-16 w-16 mx-auto mb-4 text-primary">
                  <UserIcon />
                </div>
                <h3 className="text-xl font-bold mb-2">You</h3>
                <p className="text-muted-foreground">Ready to compete!</p>
              </div>

              {/* Competitor */}
              <div className="text-center p-6 bg-destructive/10 rounded-xl animate-scale-in">
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
                  {playerWon ? (
                    <div className="h-20 w-20 text-yellow-400">
                      <CrownIcon />
                    </div>
                  ) : (
                    <div className="h-20 w-20 text-muted-foreground">
                      <FrownIcon />
                    </div>
                  )}
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
                      <div className="h-4 w-4">
                        <UserIcon />
                      </div>
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
                  <div className="h-6 w-6 text-quiz-streak">
                    <FlameIcon />
                  </div>
                  <span className="text-xl font-semibold">Streak: {quizState.streak} days</span>
                </div>

                <div className="flex gap-4 justify-center flex-wrap">
                  <Button 
                    onClick={resetQuiz}
                    variant="outline"
                    size="lg"
                  >
                    <div className="h-5 w-5 mr-2">
                      <RotateIcon />
                    </div>
                    New Challenge
                  </Button>
                  <Button 
                    onClick={() => setQuizState(prev => ({ ...prev, showLeaderboard: true }))}
                    variant="outline"
                    size="lg"
                  >
                    <div className="h-5 w-5 mr-2">
                      <ListIcon />
                    </div>
                    Leaderboard
                  </Button>
                  <Button 
                    onClick={shareScore}
                    variant="outline"
                    size="lg"
                  >
                    <div className="h-5 w-5 mr-2">
                      <ShareIcon />
                    </div>
                    Share Score
                  </Button>
                  <Button 
                    onClick={() => selectTopic(quizState.currentTopic!)}
                    size="lg"
                    className="bg-gradient-primary border-0"
                  >
                    Rematch
                  </Button>
                </div>

                {quizState.showSharing && (
                  <div className="mt-4 p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                    <p className="text-sm text-green-800 dark:text-green-200">
                      Score copied to clipboard! Share it with your friends! 🎉
                    </p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Loading Next Question Screen
  if (quizState.showNextQuestionLoader) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-primary-glow/20 p-4 flex items-center justify-center">
        <Card className="w-full max-w-2xl bg-gradient-card border-0 shadow-elevation">
          <CardContent className="p-6 md:p-8 text-center">
            <div className="animate-pulse mb-6 md:mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Loading Next Question...</h2>
              <div className="w-16 h-1 bg-primary mx-auto rounded-full animate-pulse"></div>
            </div>

            <div className="flex justify-center items-center mb-8">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
            </div>

            <div className="text-lg text-muted-foreground animate-bounce">
              Preparing your next challenge...
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
                {quizState.lifelinesUsed < 2 && !quizState.usedLifeline && (
                  <Button
                    onClick={useLifeline}
                    variant="outline"
                    size="sm"
                    className="bg-yellow-100 hover:bg-yellow-200 text-yellow-800 border-yellow-300"
                  >
                    <div className="h-4 w-4 mr-1">
                      <LifelineIcon />
                    </div>
                    50/50 ({2 - quizState.lifelinesUsed})
                  </Button>
                )}
              </div>
            </div>

          {/* Epic Scoreboard */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            {/* Player Score */}
            <div className={`relative overflow-hidden rounded-2xl p-6 transition-all duration-500 ${
              quizState.score > quizState.competitorScore 
                ? 'bg-gradient-to-br from-emerald-500/20 via-green-400/10 to-emerald-600/20 ring-2 ring-emerald-400/30 shadow-2xl shadow-emerald-400/20' 
                : 'bg-gradient-to-br from-slate-200/80 via-slate-100/60 to-slate-300/80 dark:from-slate-700/80 dark:via-slate-600/60 dark:to-slate-800/80'
            }`}>
              {quizState.score > quizState.competitorScore && (
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/10 via-transparent to-emerald-400/10 animate-shimmer" />
              )}
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl ${
                      quizState.score > quizState.competitorScore 
                        ? 'bg-emerald-400/20 text-emerald-300' 
                        : 'bg-slate-700/80 text-slate-100 dark:bg-slate-300/80 dark:text-slate-900'
                    }`}>
                      <div className="h-5 w-5">
                        <UserIcon />
                      </div>
                    </div>
                    <div>
                      <div className={`font-bold ${
                        quizState.score > quizState.competitorScore 
                          ? 'text-foreground' 
                          : 'text-slate-800 dark:text-slate-100'
                      }`}>You</div>
                      <div className={`text-xs ${
                        quizState.score > quizState.competitorScore 
                          ? 'text-muted-foreground' 
                          : 'text-slate-600 dark:text-slate-300'
                      }`}>Player</div>
                    </div>
                  </div>
                  {quizState.score > quizState.competitorScore && (
                    <div className="flex items-center gap-1 text-emerald-400">
                      <div className="h-4 w-4">
                        <TrophyIcon />
                      </div>
                      <span className="text-xs font-bold">LEADING</span>
                    </div>
                  )}
                </div>
                
                <div className="flex items-baseline gap-2">
                  <span className={`text-4xl font-black tracking-tight transition-colors duration-300 ${
                    quizState.score > quizState.competitorScore 
                      ? 'text-emerald-300 drop-shadow-lg' 
                      : 'text-slate-800 dark:text-slate-100'
                  }`}>
                    {quizState.score.toLocaleString()}
                  </span>
                  <span className={`text-xs font-medium ${
                    quizState.score > quizState.competitorScore 
                      ? 'text-muted-foreground' 
                      : 'text-slate-600 dark:text-slate-300'
                  }`}>PTS</span>
                </div>
                
                {quizState.score > 0 && (
                  <div className="mt-3 flex items-center gap-2">
                    <div className={`h-1 flex-1 rounded-full ${
                      quizState.score > quizState.competitorScore 
                        ? 'bg-emerald-400/30' 
                        : 'bg-slate-400/40 dark:bg-slate-500/40'
                    }`}>
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ${
                          quizState.score > quizState.competitorScore 
                            ? 'bg-gradient-to-r from-emerald-400 to-emerald-300' 
                            : 'bg-gradient-to-r from-slate-600 to-slate-500 dark:from-slate-400 dark:to-slate-300'
                        }`}
                        style={{
                          width: `${Math.min(100, (quizState.score / Math.max(quizState.score, quizState.competitorScore, 1)) * 100)}%`
                        }}
                      />
                    </div>
                    <div className={`h-3 w-3 ${
                      quizState.score > quizState.competitorScore ? 'text-emerald-400' : 'text-slate-600 dark:text-slate-400'
                    }`}>
                      <ZapIcon />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Opponent Score */}
            <div className={`relative overflow-hidden rounded-2xl p-6 transition-all duration-500 ${
              quizState.competitorScore > quizState.score 
                ? 'bg-gradient-to-br from-emerald-500/20 via-green-400/10 to-emerald-600/20 ring-2 ring-emerald-400/30 shadow-2xl shadow-emerald-400/20' 
                : 'bg-gradient-to-br from-slate-200/80 via-slate-100/60 to-slate-300/80 dark:from-slate-700/80 dark:via-slate-600/60 dark:to-slate-800/80'
            }`}>
              {quizState.competitorScore > quizState.score && (
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/10 via-transparent to-emerald-400/10 animate-shimmer" />
              )}
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl text-2xl ${
                      quizState.competitorScore > quizState.score 
                        ? 'bg-emerald-400/20' 
                        : 'bg-secondary/50'
                    }`}>
                      {quizState.competitor.nationality.split(" ")[0]}
                    </div>
                    <div>
                      <div className={`font-bold text-foreground text-sm leading-tight ${
                        quizState.competitorScore > quizState.score ? 'text-emerald-100' : ''
                      }`}>
                        {quizState.competitor.name}
                      </div>
                      <div className={`text-xs ${
                        quizState.competitorScore > quizState.score 
                          ? 'text-emerald-200' 
                          : 'text-muted-foreground'
                      }`}>
                        {quizState.competitor.nationality.split(" ")[1]}
                      </div>
                    </div>
                  </div>
                  {quizState.competitorScore > quizState.score && (
                    <div className="flex items-center gap-1 text-emerald-300">
                      <div className="h-4 w-4">
                        <TrophyIcon />
                      </div>
                      <span className="text-xs font-bold">LEADING</span>
                    </div>
                  )}
                </div>
                
                <div className="flex items-baseline gap-2">
                  <span className={`text-4xl font-black tracking-tight transition-colors duration-300 ${
                    quizState.competitorScore > quizState.score 
                      ? 'text-emerald-100 drop-shadow-lg' 
                      : 'text-destructive'
                  }`}>
                    {quizState.competitorScore.toLocaleString()}
                  </span>
                  <span className={`text-xs font-medium ${
                    quizState.competitorScore > quizState.score 
                      ? 'text-emerald-200' 
                      : 'text-slate-600 dark:text-slate-300'
                  }`}>PTS</span>
                </div>
                
                {quizState.competitorScore > 0 && (
                  <div className="mt-3 flex items-center gap-2">
                    <div className={`h-1 flex-1 rounded-full ${
                      quizState.competitorScore > quizState.score 
                        ? 'bg-emerald-400/30' 
                        : 'bg-destructive/30'
                    }`}>
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ${
                          quizState.competitorScore > quizState.score 
                            ? 'bg-gradient-to-r from-emerald-400 to-emerald-300' 
                            : 'bg-gradient-to-r from-destructive to-red-400'
                        }`}
                        style={{
                          width: `${Math.min(100, (quizState.competitorScore / Math.max(quizState.score, quizState.competitorScore, 1)) * 100)}%`
                        }}
                      />
                    </div>
                    <div className={`h-3 w-3 ${
                      quizState.competitorScore > quizState.score ? 'text-emerald-400' : 'text-destructive'
                    }`}>
                      <ZapIcon />
                    </div>
                  </div>
                )}
              </div>
            </div>
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
                  <div className={`flex items-center justify-center ${quizState.timeLeft <= 3 ? 'text-destructive' : 'text-primary'}`}>
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
                  // Hide options if lifeline was used
                  const isHidden = (quizState as any).hiddenOptions?.includes(index);
                  if (isHidden) return null;

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
                              <div className="h-5 w-5">
                                <CheckCircleIcon />
                              </div>
                            )}
                          {quizState.showResult &&
                            index === quizState.selectedAnswer &&
                            index !== currentQuestion.correctAnswer && (
                              <div className="h-5 w-5">
                                <XCircleIcon />
                              </div>
                            )}
                          {quizState.answerTime !== null &&
                            index === quizState.selectedAnswer && (
                              <div className="flex items-center gap-1">
                                <div className="h-4 w-4 text-yellow-400">
                                  <ZapIcon />
                                </div>
                                <span className="text-xs">
                                  {quizState.answerTime.toFixed(1)}s
                                </span>
                              </div>
                            )}
                        </div>
                      </div>
                    </Button>
                  );
                }).filter(Boolean)}
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
