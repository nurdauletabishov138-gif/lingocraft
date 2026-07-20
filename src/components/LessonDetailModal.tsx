import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Check, AlertCircle, BookOpen, HelpCircle, GraduationCap, Award } from "lucide-react";
import { Lesson } from "../types";

interface LessonDetailModalProps {
  lesson: Lesson | null;
  onClose: () => void;
}

export default function LessonDetailModal({ lesson, onClose }: LessonDetailModalProps) {
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!lesson) return null;

  const handleSubmit = () => {
    if (selectedOpt !== null) {
      setIsSubmitted(true);
    }
  };

  const handleReset = () => {
    setSelectedOpt(null);
    setIsSubmitted(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-100 dark:border-slate-800 flex flex-col max-h-[90vh]"
          id="lesson-detail-modal"
        >
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-6 md:p-8 relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-white/20 text-white hover:bg-white/30 p-2 rounded-full transition-all hover:rotate-90"
              id="close-lesson-modal"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-2 max-w-[90%]">
              <span className="inline-flex items-center gap-1 bg-white/20 text-white text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full font-bold">
                <GraduationCap className="w-3.5 h-3.5" /> Interactive Topic
              </span>
              <h3 className="font-bold text-xl md:text-2xl leading-snug">{lesson.title}</h3>
              <p className="text-emerald-50/80 text-xs md:text-sm leading-relaxed">{lesson.description}</p>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="p-6 md:p-8 overflow-y-auto space-y-6 flex-1 bg-slate-50 dark:bg-slate-950">
            {/* Takeaway Section */}
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider font-mono">
                <BookOpen className="w-4 h-4" /> Core Rules & Recommendations
              </div>
              <p className="text-slate-700 dark:text-slate-200 text-sm md:text-base leading-relaxed">
                {lesson.keyTakeaway}
              </p>
            </div>

            {/* Micro Quiz Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 font-bold text-xs uppercase tracking-wider font-mono">
                <HelpCircle className="w-4 h-4" /> Knowledge Check Quiz
              </div>

              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
                <h4 className="font-bold text-sm md:text-base text-slate-900 dark:text-white leading-snug">
                  {lesson.quickQuiz.question}
                </h4>

                {/* Options List */}
                <div className="space-y-2">
                  {lesson.quickQuiz.options.map((option, idx) => {
                    const isSelected = selectedOpt === idx;
                    let optStyle = "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50/50 dark:hover:bg-slate-850/50 text-slate-700 dark:text-slate-200";
                    let markerStyle = "border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500";

                    if (isSubmitted) {
                      if (idx === lesson.quickQuiz.answerIndex) {
                        optStyle = "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 shadow-sm";
                        markerStyle = "bg-emerald-500 border-emerald-400 text-white";
                      } else if (isSelected) {
                        optStyle = "bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800/80 text-rose-950 dark:text-rose-200";
                        markerStyle = "bg-rose-500 border-rose-400 text-white";
                      } else {
                        optStyle = "bg-slate-100/30 dark:bg-slate-800/20 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500 pointer-events-none";
                        markerStyle = "border-slate-200/50 dark:border-slate-800/50 text-slate-300 dark:text-slate-600";
                      }
                    } else if (isSelected) {
                      optStyle = "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 dark:border-emerald-700 text-emerald-950 dark:text-emerald-200 shadow-sm ring-1 ring-emerald-500/10";
                      markerStyle = "bg-emerald-500 border-emerald-400 text-white";
                    }

                    return (
                      <button
                        key={idx}
                        disabled={isSubmitted}
                        onClick={() => setSelectedOpt(idx)}
                        className={`w-full text-left p-3.5 rounded-xl border text-xs md:text-sm transition-all flex items-start gap-3 leading-relaxed ${optStyle}`}
                      >
                        <span className={`w-5 h-5 rounded-full border text-[11px] font-bold flex items-center justify-center flex-shrink-0 transition-all ${markerStyle}`}>
                          {isSubmitted && idx === lesson.quickQuiz.answerIndex ? <Check className="w-3 h-3 stroke-[3]" /> : String.fromCharCode(65 + idx)}
                        </span>
                        <span className="flex-1">{option}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Action Row */}
                <div className="pt-2">
                  {!isSubmitted ? (
                    <button
                      onClick={handleSubmit}
                      disabled={selectedOpt === null}
                      className={`w-full py-3 px-5 rounded-xl font-bold text-xs md:text-sm transition-all flex items-center justify-center gap-2 ${
                        selectedOpt === null
                          ? "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed"
                          : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-md active:scale-98"
                      }`}
                      id="submit-lesson-quiz"
                    >
                      Submit Answer
                    </button>
                  ) : (
                    <div className="space-y-4">
                      {/* Detailed Explainer */}
                      <div className={`p-4 rounded-xl border text-xs md:text-sm leading-relaxed ${
                        selectedOpt === lesson.quickQuiz.answerIndex
                          ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-100 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300"
                          : "bg-amber-50 dark:bg-amber-950/40 border-amber-100 dark:border-amber-800 text-amber-900 dark:text-amber-300"
                      }`}>
                        <p className="font-bold mb-1 font-mono text-[10px] uppercase tracking-wider flex items-center gap-1">
                          {selectedOpt === lesson.quickQuiz.answerIndex ? (
                            <span className="text-emerald-700 dark:text-emerald-450 flex items-center gap-1"><Award className="w-4 h-4" /> Correct Answer Selected!</span>
                          ) : (
                            <span className="text-amber-700 dark:text-amber-450 flex items-center gap-1"><AlertCircle className="w-4 h-4" /> Incorrect Answer</span>
                          )}
                        </p>
                        <p className="text-slate-600 dark:text-slate-400 text-xs">{lesson.quickQuiz.explanation}</p>
                      </div>

                      <button
                        onClick={handleReset}
                        className="w-full py-3 rounded-xl border-2 border-emerald-600 text-emerald-800 dark:text-emerald-350 bg-white dark:bg-slate-900 hover:bg-emerald-50/20 dark:hover:bg-emerald-950/20 active:scale-98 font-bold text-xs md:text-sm transition-all"
                      >
                        Retake Quiz
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
