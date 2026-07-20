import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Shield,
  BookOpen,
  Play,
  Check,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Star,
  User,
  Send,
  CreditCard,
  Lock,
  Menu,
  X,
  Award,
  Plus,
  HelpCircle,
  CheckCircle2,
  Info,
  Sun,
  Moon
} from "lucide-react";
import * as Icons from "lucide-react";

import { classGradesData, videoLessonsData, faqData, initialTestimonials, extraLessonsData } from "./data";
import { Lesson, VideoLesson, Testimonial } from "./types";

import VideoModal from "./components/VideoModal";
import LessonDetailModal from "./components/LessonDetailModal";
import InteractiveWorksheet from "./components/InteractiveWorksheet";

// Helper component to render Lucide icons dynamically from strings
function DynamicIcon({ name, className }: { name: string; className?: string }) {
  const IconComponent = (Icons as any)[name];
  if (!IconComponent) return <BookOpen className={className} />;
  return <IconComponent className={className} />;
}

export default function App() {
  // Dark Mode State
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("darkMode");
      if (saved !== null) {
        return saved === "true";
      }
      return false;
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  }, [isDarkMode]);

  // Mobile Navigation Menu State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Lesson Drawer States
  const [expandedGrades, setExpandedGrades] = useState<{ [key: string]: boolean }>({
    "class-10": true, // Default open 10-sinf for better immediate visual onboarding
    "class-11": true,
  });
  const [extraGradesLoaded, setExtraGradesLoaded] = useState<{ [key: string]: boolean }>({});
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [activeWorksheetUrl, setActiveWorksheetUrl] = useState<string | null>(null);

  const handleLessonClick = (lesson: Lesson) => {
    const urlMap: { [key: string]: string } = {
      "class-10-extra-1": "/worksheets/eating-out-classic.html",
      "class-10-extra-2": "/worksheets/eating-out-modern.html",
      "class-10-extra-3": "/worksheets/healthy-bodies.html",
      "class-10-extra-4": "/worksheets/getting-around-town.html",
      "class-10-extra-5": "/worksheets/mysteries-in-nature.html",
      "class-10-extra-6": "/worksheets/amazing-animals.html",
      "class-10-extra-7": "/worksheets/what-are-you-watching.html",
      "class-10-extra-8": "/worksheets/british-tv.html",
      "class-10-extra-9": "/worksheets/school-can-be-fun.html",
      "class-10-extra-10": "/worksheets/families.html",
      "class-11-extra-1": "/worksheets/its-a-challenge.html",
      "class-11-extra-2": "/worksheets/our-changing-planet.html",
      "class-11-extra-3": "/worksheets/on-holiday.html",
      "class-11-extra-4": "/worksheets/my-place.html",
      "class-11-extra-5": "/worksheets/school-grade9.html",
      "class-11-extra-6": "/worksheets/favourite-things.html",
      "class-11-extra-7": "/worksheets/adventure-holidays.html",
      "class-11-extra-8": "/worksheets/entertainment-and-media.html",
      "class-11-extra-9": "/worksheets/sports-games-activities.html",
      "class-11-extra-10": "/worksheets/useful-websites.html",
    };

    const worksheetUrl = urlMap[lesson.id];
    if (worksheetUrl) {
      setActiveWorksheetUrl(worksheetUrl);
    } else {
      setSelectedLesson(lesson);
    }
  };

  const handleStartGrade = (gradeId: string) => {
    setExtraGradesLoaded((prev) => ({
      ...prev,
      [gradeId]: !prev[gradeId],
    }));
  };

  // Video Player Modal States
  const [selectedVideo, setSelectedVideo] = useState<VideoLesson | null>(null);

  // Testimonials State
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [feedbackSuccess, setFeedbackSuccess] = useState(false);
  const [newFeedback, setNewFeedback] = useState({
    name: "",
    grade: "Grade 10 Student",
    rating: 5,
    text: "",
  });

  // Accordion FAQ State
  const [expandedFaq, setExpandedFaq] = useState<{ [key: string]: boolean }>({
    "faq-1": false,
    "faq-2": false,
    "faq-3": false,
  });

  // Contact Form State
  const [contactForm, setContactForm] = useState({ name: "", message: "" });
  const [contactSuccess, setContactSuccess] = useState(false);

  const toggleGrade = (gradeId: string) => {
    setExpandedGrades((prev) => ({
      ...prev,
      [gradeId]: !prev[gradeId],
    }));
  };

  const toggleFaq = (faqId: string) => {
    setExpandedFaq((prev) => ({
      ...prev,
      [faqId]: !prev[faqId],
    }));
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFeedback.name.trim() || !newFeedback.text.trim()) return;

    const initial = newFeedback.name.trim().charAt(0).toUpperCase();
    const colors = [
      "bg-emerald-100 text-emerald-700",
      "bg-teal-100 text-teal-700",
      "bg-cyan-100 text-cyan-700",
      "bg-blue-100 text-blue-700",
      "bg-purple-100 text-purple-700"
    ];
    const avatarColor = colors[Math.floor(Math.random() * colors.length)];

    const added: Testimonial = {
      id: `test-custom-${Date.now()}`,
      name: newFeedback.name.trim(),
      grade: newFeedback.grade,
      rating: newFeedback.rating,
      text: newFeedback.text.trim(),
      initial,
      avatarColor,
    };

    setTestimonials([added, ...testimonials]);
    setFeedbackSuccess(true);
    setTimeout(() => {
      setFeedbackSuccess(false);
      setShowFeedbackForm(false);
      setNewFeedback({ name: "", grade: "Grade 10 Student", rating: 5, text: "" });
    }, 2500);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name.trim() || !contactForm.message.trim()) return;

    setContactSuccess(true);
    setTimeout(() => {
      setContactSuccess(false);
      setContactForm({ name: "", message: "" });
    }, 3000);
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen font-sans text-slate-800 dark:text-slate-200 antialiased selection:bg-emerald-500 selection:text-white transition-colors duration-300">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 w-full z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-600/20">
              <BookOpen className="w-5 h-5 stroke-[2.5]" />
            </div>
            <span className="font-bold text-xl text-slate-900 dark:text-white tracking-tight font-sans">
              LingoCraft
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex gap-6 lg:gap-8 items-center">
            <a
              className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
              href="#sinflar"
            >
              Classes
            </a>
            <a
              className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
              href="#videolar"
            >
              Videos
            </a>
            <a
              className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
              href="#otzivlar"
            >
              Testimonials
            </a>
            <a
              className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
              href="#faq"
            >
              FAQ
            </a>
            <a
              className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
              href="#kontakt"
            >
              Contact Us
            </a>

            {/* Desktop Dark Mode Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95 border border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-sm"
              id="theme-toggle-btn"
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />}
            </button>

            <a
              href="#sinflar"
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-full font-bold text-xs tracking-wider uppercase transition-all shadow-md shadow-emerald-900/10 active:scale-95"
            >
              Get Started
            </a>
          </nav>

          {/* Mobile elements (Dark Mode + Hamburger) */}
          <div className="flex md:hidden items-center gap-3">
            {/* Mobile Dark Mode Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95 border border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-sm"
              id="theme-toggle-mobile"
              title={isDarkMode ? "Light Mode" : "Dark Mode"}
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-indigo-400" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Panel */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 overflow-hidden transition-colors duration-300"
              id="mobile-nav-panel"
            >
              <div className="px-6 py-4 flex flex-col gap-4 font-semibold text-slate-600 dark:text-slate-300">
                <a
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-emerald-700 dark:hover:text-emerald-400"
                  href="#sinflar"
                >
                  Classes
                </a>
                <a
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-emerald-700 dark:hover:text-emerald-400"
                  href="#videolar"
                >
                  Videos
                </a>
                <a
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-emerald-700 dark:hover:text-emerald-400"
                  href="#otzivlar"
                >
                  Testimonials
                </a>
                <a
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-emerald-700 dark:hover:text-emerald-400"
                  href="#faq"
                >
                  FAQ
                </a>
                <a
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-emerald-700 dark:hover:text-emerald-400"
                  href="#kontakt"
                >
                  Contact Us
                </a>
                <a
                  href="#sinflar"
                  onClick={() => setMobileMenuOpen(false)}
                  className="bg-emerald-600 text-white py-3 rounded-xl text-center font-bold text-sm mt-2 block"
                >
                  Start Lessons
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-24 grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 relative">
            <div className="absolute -z-10 -top-16 -left-16 w-72 h-72 bg-emerald-400/10 blur-3xl rounded-full"></div>
            <div className="absolute -z-10 -bottom-16 -right-16 w-72 h-72 bg-emerald-500/5 blur-3xl rounded-full"></div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl shadow-slate-200 dark:shadow-none border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-2"
            >
              <img
                alt="Cybersecurity and media literacy illustration banner"
                className="w-full h-auto rounded-2xl"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBH9TvdxVSQNkNfL6HR1fVLxxn7q6rSnq0SAxnuTTr00BORrJTrUDn3TIgqTVuIN_G2jBIu6yD44kkXRSpRu8ZrQUz4qZIcaPmbvYWt38RtTRgUOOfZAkjDnE4Aj_Hm3-sPafULH7CYPhOrhdbNQkm4Cs46uGCuWLZHriHqB4oSOuTER9ww-VrRL3-nB_y2xJjk5voml32nqMrEgZmk5F12dBp5lLHdHo6Fo9MYB_EmWDEw66vXvg7HnlhbvKYzk-sfPuaRidhrdtR2"
              />
            </motion.div>
          </div>

          <div className="order-1 md:order-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider font-mono"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Online Learning Platform
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white leading-tight tracking-tight font-sans"
            >
              Master Your English with LingoCraft
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-slate-600 dark:text-slate-300 text-base md:text-lg leading-relaxed max-w-lg"
            >
              Develop your English language skills and linguacreative competence through our interactive worksheets, video lessons, and real-time AI teacher feedback.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 pt-2"
            >
              <a
                className="bg-emerald-600 hover:bg-emerald-550 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg shadow-emerald-900/10 active:scale-98 flex items-center justify-center gap-2"
                href="#sinflar"
              >
                Start Lessons
              </a>
              <a
                className="bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-bold px-8 py-4 rounded-xl transition-all active:scale-98 flex items-center justify-center gap-2"
                href="#videolar"
              >
                Watch Video Lessons
              </a>
            </motion.div>
          </div>
        </section>

        {/* Classes & Interactive Syllabus Section */}
        <section className="max-w-7xl mx-auto px-4 md:px-8 py-20 border-t border-slate-100 dark:border-slate-800/80" id="sinflar">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="w-12 h-1 bg-emerald-500 rounded-full"></span>
                <span className="font-bold text-xs uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-mono">Curriculum</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">Select Your Class</h2>
            </div>
            <p className="text-slate-500 dark:text-slate-400 max-w-md text-sm leading-relaxed">
              Our interactive resources are specially designed for school students. Choose a class to explore available lessons.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {classGradesData.map((grade) => {
              const isOpen = expandedGrades[grade.id];
              return (
                <div
                  key={grade.id}
                  className={`bg-white dark:bg-slate-900 rounded-3xl border transition-all duration-300 p-6 md:p-8 flex flex-col justify-between ${
                    isOpen ? "border-emerald-500 dark:border-emerald-500 shadow-xl dark:shadow-none ring-1 ring-emerald-500/10" : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm"
                  }`}
                >
                  <div className="space-y-4">
                    {/* Header Row */}
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-widest bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 px-2.5 py-1 rounded-md border border-emerald-100/10">
                          School Course
                        </span>
                        <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">{grade.title}</h3>
                      </div>

                      {/* Icon */}
                      <div className="p-3 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-100 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 rounded-2xl">
                        {grade.iconName === "school" ? (
                          <Icons.GraduationCap className="w-7 h-7" />
                        ) : (
                          <Icons.Brain className="w-7 h-7" />
                        )}
                      </div>
                    </div>

                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{grade.description}</p>

                    {/* Lessons list with accordion state */}
                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                      <button
                        onClick={() => toggleGrade(grade.id)}
                        className="w-full flex justify-between items-center text-xs font-bold text-emerald-700 dark:text-emerald-450 uppercase tracking-wider hover:text-emerald-800 dark:hover:text-emerald-350 transition-colors py-2"
                        id={`toggle-grade-${grade.id}`}
                      >
                        <span>Lessons ({extraGradesLoaded[grade.id] ? 10 : 3} total)</span>
                        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-3 mt-4 overflow-hidden"
                            id={`lessons-list-${grade.id}`}
                          >
                            {(() => {
                              const displayedLessons = extraGradesLoaded[grade.id]
                                ? grade.lessons
                                : grade.lessons.slice(0, 3);

                              return displayedLessons.map((lesson) => (
                                <button
                                  key={lesson.id}
                                  onClick={() => handleLessonClick(lesson)}
                                  className="w-full text-left p-4.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 hover:border-emerald-200 dark:hover:border-emerald-800/60 hover:bg-emerald-50/20 dark:hover:bg-emerald-950/20 rounded-2xl transition-all duration-200 flex items-start gap-4 group/lesson"
                                >
                                  <div className="p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 group-hover/lesson:border-emerald-300 dark:group-hover/lesson:border-emerald-500 text-slate-500 dark:text-slate-400 group-hover/lesson:text-emerald-600 dark:group-hover/lesson:text-emerald-400 transition-colors flex-shrink-0">
                                    <DynamicIcon name={lesson.icon} className="w-4.5 h-4.5" />
                                  </div>
                                  <div className="space-y-1.5 flex-1">
                                    <div className="font-bold text-sm text-slate-800 dark:text-slate-100 group-hover/lesson:text-emerald-800 dark:group-hover/lesson:text-emerald-400 transition-colors flex items-center justify-between">
                                      <span>{lesson.title}</span>
                                      <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 bg-white dark:bg-slate-900 px-2 py-0.5 rounded-full uppercase tracking-wider font-bold shrink-0">
                                        Interaktiv Amaliyot
                                      </span>
                                    </div>
                                    <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed line-clamp-1">
                                      {lesson.description}
                                    </p>
                                  </div>
                                </button>
                              ));
                            })()}

                            {/* Start button below the list */}
                            <div className="pt-2 flex justify-center">
                              <button
                                onClick={() => handleStartGrade(grade.id)}
                                className={`w-full py-3 px-5 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all duration-200 text-sm cursor-pointer ${
                                  extraGradesLoaded[grade.id]
                                    ? "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
                                    : "bg-emerald-600 hover:bg-emerald-550 text-white shadow-md shadow-emerald-950/10 hover:shadow-emerald-950/15"
                                }`}
                                id={`start-button-${grade.id}`}
                              >
                                {extraGradesLoaded[grade.id] ? (
                                  <>
                                    <Icons.ChevronUp className="w-4 h-4" />
                                    <span>Qo'shimcha darslarni yashirish</span>
                                  </>
                                ) : (
                                  <>
                                    <Icons.Play className="w-4 h-4 fill-current text-white animate-pulse" />
                                    <span>Barcha darslarni yuklash</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Video Lessons Section */}
        <section className="bg-slate-100 dark:bg-slate-900/30 py-20 transition-colors duration-300" id="videolar">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="text-center space-y-4 mb-16 max-w-xl mx-auto">
              <span className="bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full font-mono border border-emerald-100/10">
                Multimedia Lessons
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">Video Lessons</h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                Strengthen your English grammar and speaking skills with our concise video guides and interactive lesson quizzes.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {videoLessonsData.map((video) => (
                <div
                  key={video.id}
                  onClick={() => setSelectedVideo(video)}
                  className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 border border-slate-200 dark:border-slate-800 cursor-pointer flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    {/* Thumbnail Wrapper */}
                    <div className="relative aspect-video overflow-hidden bg-slate-900">
                      <img
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90 group-hover:brightness-[0.8]"
                        src={video.image}
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/35 transition-colors">
                        <div className="w-14 h-14 rounded-full bg-emerald-500/90 text-white flex items-center justify-center border-2 border-white/50 shadow-lg group-hover:scale-110 transition-transform">
                           <Play className="w-6 h-6 fill-current translate-x-0.5" />
                        </div>
                      </div>

                      {/* Duration tag */}
                      <span className="absolute bottom-3 right-3 bg-slate-900/80 text-white text-[10px] font-mono tracking-wider px-2 py-0.5 rounded font-bold">
                        {video.duration} MIN
                      </span>
                    </div>

                    <div className="p-6 space-y-2">
                      <h4 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors leading-snug">
                        {video.title}
                      </h4>
                      <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed line-clamp-2">
                        {video.description}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-2 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-emerald-600 dark:text-emerald-450">
                    <span className="flex items-center gap-1 uppercase tracking-wider font-mono text-[10px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span> Active Lesson
                    </span>
                    <span className="underline">Start Lesson</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cybersecurity Quiz section is removed */}

        {/* Testimonials with Contributions Form Section */}
        <section className="py-20 overflow-hidden" id="otzivlar">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="w-12 h-1 bg-emerald-500 rounded-full"></span>
                  <span className="font-bold text-xs uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-mono">Testimonials</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">What Our Students Say</h2>
              </div>

              {/* Action trigger to write review */}
              <button
                onClick={() => setShowFeedbackForm(!showFeedbackForm)}
                className="bg-emerald-600 hover:bg-emerald-550 text-white px-5 py-3 rounded-xl font-bold text-xs tracking-wider uppercase transition-all shadow-md active:scale-95 flex items-center gap-2 self-start md:self-auto"
                id="toggle-feedback-form"
              >
                {showFeedbackForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />} Write a Review
              </button>
            </div>

            {/* Contribution review form */}
            <AnimatePresence>
              {showFeedbackForm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 mb-12 shadow-sm max-w-xl text-slate-800 dark:text-slate-100"
                  id="testimonial-form-block"
                >
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-4">Share Your Experience</h3>
                  {feedbackSuccess ? (
                    <div className="p-6 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-800 rounded-2xl text-center space-y-3">
                      <div className="mx-auto w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center">
                        <Check className="w-6 h-6 stroke-[3]" />
                      </div>
                      <h4 className="font-bold text-emerald-800 dark:text-emerald-450 text-sm">Feedback Received!</h4>
                      <p className="text-slate-600 dark:text-slate-300 text-xs">Your valuable feedback has been added to our list.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 font-mono">Your Name</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g., John Doe"
                            value={newFeedback.name}
                            onChange={(e) => setNewFeedback({ ...newFeedback, name: e.target.value })}
                            className="w-full bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 focus:border-emerald-500 text-slate-900 dark:text-slate-100 rounded-xl px-4 py-3 text-xs outline-none focus:ring-1 focus:ring-emerald-500/20"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 font-mono">Grade / Role</label>
                          <select
                            value={newFeedback.grade}
                            onChange={(e) => setNewFeedback({ ...newFeedback, grade: e.target.value })}
                            className="w-full bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-xl px-4 py-3 text-xs outline-none focus:border-emerald-500"
                          >
                            <option value="Grade 10 Student">Grade 10 Student</option>
                            <option value="Grade 11 Student">Grade 11 Student</option>
                            <option value="English Language Enthusiast">English Language Enthusiast</option>
                            <option value="LingoCraft Member">LingoCraft Member</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 font-mono">Your Rating</label>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setNewFeedback({ ...newFeedback, rating: star })}
                              className="text-slate-300 hover:text-amber-400 p-1 transition-colors"
                            >
                              <Star
                                className={`w-6 h-6 ${
                                  star <= newFeedback.rating ? "fill-amber-400 text-amber-400" : "text-slate-300"
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 font-mono">Review</label>
                        <textarea
                          required
                          rows={3}
                          placeholder="What you liked about our platform..."
                          value={newFeedback.text}
                          onChange={(e) => setNewFeedback({ ...newFeedback, text: e.target.value })}
                          className="w-full bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 focus:border-emerald-500 text-slate-900 dark:text-slate-100 rounded-xl px-4 py-3 text-xs outline-none focus:ring-1 focus:ring-emerald-500/20"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider active:scale-98 transition-all"
                      >
                        Submit
                      </button>
                    </form>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Testimonial slider / bento row */}
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((test) => (
                <div
                  key={test.id}
                  className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-6 shadow-sm"
                >
                  <div className="space-y-4">
                    {/* Star Rating */}
                    <div className="flex text-amber-400 gap-0.5">
                      {Array.from({ length: test.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current text-amber-400" />
                      ))}
                    </div>

                    <p className="font-body-lg text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed italic">
                      &ldquo;{test.text}&rdquo;
                    </p>
                  </div>

                  {/* Profile info */}
                  <div className="flex items-center gap-4 pt-4 border-t border-slate-50 dark:border-slate-800">
                    <div
                      className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm ${test.avatarColor}`}
                    >
                      {test.initial}
                    </div>
                    <div>
                      <p className="font-bold text-sm text-slate-900 dark:text-white leading-tight">{test.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{test.grade}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-slate-100 dark:bg-slate-900/30 py-20 border-t border-slate-200 dark:border-slate-800" id="faq">
          <div className="max-w-3xl mx-auto px-4 md:px-8">
            <div className="text-center space-y-4 mb-16">
              <span className="bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-[10px] uppercase font-bold px-3 py-1 rounded-full font-mono border border-emerald-100/10">
                Have Questions?
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm">
                Find answers to the most common queries about the LingoCraft platform and interactive exercises.
              </p>
            </div>

            <div className="space-y-4">
              {faqData.map((faq) => {
                const isExpanded = expandedFaq[faq.id];
                return (
                  <div
                    key={faq.id}
                    className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm transition-all"
                  >
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full p-5 md:p-6 text-left flex justify-between items-center group font-semibold"
                      id={`faq-btn-${faq.id}`}
                    >
                      <span className="font-bold text-slate-800 dark:text-slate-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors text-sm md:text-base leading-snug">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-emerald-600 transition-transform flex-shrink-0 ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                          id={`faq-answer-${faq.id}`}
                        >
                          <p className="p-5 md:p-6 pt-0 text-slate-600 dark:text-slate-300 text-xs md:text-sm leading-relaxed border-t border-slate-50 dark:border-slate-800/50">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Contact Us Section */}
        <section className="max-w-3xl mx-auto px-4 md:px-8 py-20" id="kontakt">
          {/* Contact Form */}
          <div className="bg-white dark:bg-slate-900 p-6 md:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-md border border-emerald-100/10">
                Author Contacts
              </span>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Contact Us</h2>
              <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm leading-relaxed">
                Leave a message if you have any suggestions, feedback, or questions about the LingoCraft platform. <br />
                <span className="font-semibold text-slate-700 dark:text-slate-300">Authors:</span> Ugiloy Kusanova, Shoira Xonboboyeva.
              </p>
            </div>

            {contactSuccess ? (
              <div className="p-6 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-850 rounded-2xl text-center space-y-3 animate-scaleUp">
                <div className="mx-auto w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 stroke-[3]" />
                </div>
                <h4 className="font-bold text-emerald-800 dark:text-emerald-450 text-sm">Message Sent!</h4>
                <p className="text-slate-600 dark:text-slate-300 text-xs">Thank you for your message! Our team will get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 font-mono">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., John Doe"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 focus:border-emerald-500 text-slate-900 dark:text-slate-100 rounded-xl p-4 text-xs outline-none focus:ring-1 focus:ring-emerald-500/20"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 font-mono">Your Message</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Write your feedback or suggestions here..."
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 focus:border-emerald-500 text-slate-900 dark:text-slate-100 rounded-xl p-4 text-xs outline-none focus:ring-1 focus:ring-emerald-500/20"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 active:scale-98 transition-all"
                  id="submit-contact-btn"
                >
                  <Send className="w-4 h-4" /> Send Message
                </button>
              </form>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-12 px-4 md:px-8 bg-slate-900 text-white border-t border-slate-800 text-center space-y-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-md">
              <BookOpen className="w-4 h-4 stroke-[2.5]" />
            </div>
            <span className="font-bold text-lg text-white tracking-tight">LingoCraft</span>
          </div>

          <p className="font-mono text-xs text-slate-400 max-w-lg leading-relaxed">
            © 2026 LingoCraft. Authors: Ugiloy Kusanova, Shoira Xonboboyeva. <br />
            An interactive and creative English learning platform for grades 10-11.
          </p>

          <div className="flex gap-6 text-xs text-slate-400 pt-2 font-mono">
            <a className="hover:underline hover:text-white transition-colors" href="#">
              Privacy Policy
            </a>
            <a className="hover:underline hover:text-white transition-colors" href="#">
              Terms of Service
            </a>
            <a className="hover:underline hover:text-white transition-colors" href="#">
              Help & Support
            </a>
          </div>
        </div>
      </footer>

      {/* MODALS */}
      {/* 1. Video Lesson Player Workspace Modal */}
      <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />

      {/* 2. Specific Topic / Lesson Study Sheet Drawer Modal or Interactive Worksheet */}
      {selectedLesson && selectedLesson.id.startsWith("class-10-") ? (
        <InteractiveWorksheet lessonId={selectedLesson.id} onClose={() => setSelectedLesson(null)} />
      ) : (
        <LessonDetailModal lesson={selectedLesson} onClose={() => setSelectedLesson(null)} />
      )}

      {/* 3. Interactive Worksheet iframe viewer modal with high-visibility Exit button */}
      <AnimatePresence>
        {activeWorksheetUrl && (
          <div className="fixed inset-0 z-50 flex flex-col bg-slate-950/95 backdrop-blur-md p-2 sm:p-4 md:p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex-1 bg-white dark:bg-slate-900 rounded-[20px] md:rounded-[32px] overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col h-full"
            >
              {/* Header with high visibility Exit button */}
              <div className="px-5 py-4 bg-slate-900 text-white flex items-center justify-between shrink-0 border-b border-slate-850">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-md">
                    <BookOpen className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm md:text-base text-white leading-none">Interactive Practical Worksheet</h3>
                    <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider font-mono font-bold">Linguacreative Competence • Active Lesson</p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveWorksheetUrl(null)}
                  className="bg-rose-600 hover:bg-rose-500 text-white px-5 py-3 rounded-2xl text-xs font-bold tracking-wider uppercase transition-all shadow-lg active:scale-95 flex items-center gap-2 border border-rose-500/20 cursor-pointer"
                  id="close-iframe-worksheet"
                >
                  <X className="w-4 h-4 stroke-[2.5]" />
                  <span>Exit Lesson</span>
                </button>
              </div>

              {/* Iframe Viewport */}
              <div className="flex-1 w-full h-full bg-slate-50 dark:bg-slate-950">
                <iframe
                  src={activeWorksheetUrl}
                  className="w-full h-full border-none"
                  title="Interactive Worksheet Lesson View"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
