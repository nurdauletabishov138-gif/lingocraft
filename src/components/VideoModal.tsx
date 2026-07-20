import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Play, Pause, Volume2, VolumeX, Maximize2, Check, AlertCircle, BookOpen, HelpCircle, Clock, RefreshCw } from "lucide-react";
import { VideoLesson } from "../types";

interface VideoModalProps {
  video: VideoLesson | null;
  onClose: () => void;
}

export default function VideoModal({ video, onClose }: VideoModalProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [activeTab, setActiveTab] = useState<"summary" | "quiz">("summary");
  
  // Quiz State
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);

  // Parse duration "MM:SS" to seconds
  const parseDuration = (dur: string) => {
    const parts = dur.split(":");
    return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
  };

  const totalDurationSeconds = video ? parseDuration(video.duration) : 0;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && video) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= totalDurationSeconds) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000 / playbackSpeed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed, video, totalDurationSeconds]);

  if (!video) return null;

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const handleTimelineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTime(parseInt(e.target.value, 10));
  };

  const handleSubmitQuiz = () => {
    if (selectedAnswer !== null) {
      setIsAnswerSubmitted(true);
    }
  };

  const handleResetQuiz = () => {
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/85 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row max-h-[90vh] md:max-h-[85vh]"
          id="video-player-modal"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-slate-900/60 text-white hover:bg-slate-900 p-2 rounded-full transition-all hover:rotate-90"
            id="close-video-modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Column: Video Workspace */}
          <div className="w-full md:w-3/5 bg-slate-950 flex flex-col justify-between relative text-white aspect-video md:aspect-auto">
            {/* Aspect Wrapper for video simulation */}
            <div className="relative flex-1 flex items-center justify-center bg-slate-950 overflow-hidden group">
              {/* Fake Video Screen */}
              <img
                src={video.image}
                alt={video.title}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                  isPlaying ? "scale-105 filter brightness-[0.25]" : "filter brightness-[0.45]"
                }`}
              />

              {/* Animated overlay when playing */}
              {isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="relative flex h-24 w-24 items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-20"></span>
                    <span className="relative inline-flex rounded-full h-16 w-16 bg-emerald-500/10 border border-emerald-500/40 items-center justify-center text-emerald-400">
                      <Play className="w-8 h-8 fill-emerald-400/20 animate-pulse" />
                    </span>
                  </span>
                </div>
              )}

              {/* Central Play Indicator */}
              {!isPlaying && (
                <button
                  onClick={() => setIsPlaying(true)}
                  className="z-10 bg-emerald-500 text-white p-5 rounded-full shadow-lg hover:bg-emerald-400 hover:scale-110 active:scale-95 transition-all flex items-center justify-center"
                  id="central-play-btn"
                >
                  <Play className="w-8 h-8 fill-current" />
                </button>
              )}

              {/* Metadata tag */}
              <div className="absolute top-4 left-4 bg-slate-900/80 text-[11px] font-mono tracking-wider px-2.5 py-1 rounded-md border border-slate-800 text-emerald-400 flex items-center gap-1.5 uppercase">
                <span className={`w-2 h-2 rounded-full ${isPlaying ? "bg-emerald-500 animate-pulse" : "bg-slate-500"}`}></span>
                {isPlaying ? "Simulation Class" : "Paused"}
              </div>
            </div>

            {/* Video Controls Panel */}
            <div className="bg-slate-900/95 border-t border-slate-800 p-4 space-y-3 font-mono">
              {/* Timeline scrub */}
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-400 select-none">{formatTime(currentTime)}</span>
                <input
                  type="range"
                  min="0"
                  max={totalDurationSeconds}
                  value={currentTime}
                  onChange={handleTimelineChange}
                  className="flex-1 accent-emerald-500 bg-slate-800 h-1.5 rounded-full cursor-pointer appearance-none outline-none focus:ring-1 focus:ring-emerald-500"
                />
                <span className="text-xs text-slate-400 select-none">{video.duration}</span>
              </div>

              {/* Control Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-1.5 text-slate-300 hover:text-white transition-colors"
                    title={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  </button>

                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-1.5 text-slate-300 hover:text-white transition-colors"
                  >
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </button>

                  <div className="h-4 w-[1px] bg-slate-800"></div>

                  {/* Playback speed selector */}
                  <select
                    value={playbackSpeed}
                    onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value))}
                    className="bg-slate-800 text-slate-300 text-xs py-1 px-1.5 rounded border border-slate-700 outline-none focus:border-emerald-500"
                  >
                    <option value="1">1.0x</option>
                    <option value="1.25">1.25x</option>
                    <option value="1.5">1.5x</option>
                    <option value="2">2.0x</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-500 tracking-wider">Lumina Education System</span>
                  <button className="p-1.5 text-slate-400 hover:text-white transition-colors">
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Key takeaways & quiz tabs */}
          <div className="w-full md:w-2/5 flex flex-col bg-slate-50 dark:bg-slate-950 border-l border-slate-100 dark:border-slate-800 h-auto md:h-full overflow-hidden">
            {/* Tabs Selector */}
            <div className="flex border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <button
                onClick={() => setActiveTab("summary")}
                className={`flex-1 py-4 text-center font-semibold text-sm transition-all border-b-2 flex items-center justify-center gap-2 ${
                  activeTab === "summary"
                    ? "border-emerald-600 text-emerald-800 dark:text-emerald-400 bg-emerald-50/20 dark:bg-emerald-950/20"
                    : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100/50 dark:hover:bg-slate-800/40"
                }`}
                id="video-tab-summary"
              >
                <BookOpen className="w-4 h-4" />
                Lesson Summary
              </button>
              <button
                onClick={() => setActiveTab("quiz")}
                className={`flex-1 py-4 text-center font-semibold text-sm transition-all border-b-2 flex items-center justify-center gap-2 ${
                  activeTab === "quiz"
                    ? "border-emerald-600 text-emerald-800 dark:text-emerald-400 bg-emerald-50/20 dark:bg-emerald-950/20"
                    : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100/50 dark:hover:bg-slate-800/40"
                }`}
                id="video-tab-quiz"
              >
                <HelpCircle className="w-4 h-4" />
                Quick Quiz
              </button>
            </div>

            {/* Scrollable Tab Content Container */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
              {activeTab === "summary" ? (
                <div className="space-y-6 animate-fadeIn">
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white leading-snug">{video.title}</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-xs font-mono mt-1 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" /> Duration: {video.duration} mins
                    </p>
                  </div>

                  <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 space-y-3">
                    <h4 className="font-semibold text-xs text-emerald-700 dark:text-emerald-400 tracking-wider uppercase font-mono">Lesson Description</h4>
                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{video.description}</p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-xs text-slate-500 dark:text-slate-400 tracking-wider uppercase font-mono">Key Takeaways</h4>
                    <ul className="space-y-3">
                      {video.keyPoints.map((point, index) => (
                        <motion.li
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          key={index}
                          className="flex gap-3 text-slate-600 dark:text-slate-300 text-sm leading-relaxed"
                        >
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center justify-center font-mono">
                            {index + 1}
                          </span>
                          <span>{point}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="space-y-6 animate-fadeIn">
                  <div className="space-y-2">
                    <span className="bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-[10px] uppercase font-bold px-2.5 py-1 rounded-full font-mono tracking-wider border border-emerald-100/10">
                      Mini-quiz based on lesson
                    </span>
                    <h3 className="font-bold text-base text-slate-900 dark:text-white leading-snug">
                      {video.quizQuestion.question}
                    </h3>
                  </div>

                  {/* Answers List */}
                  <div className="space-y-2.5">
                    {video.quizQuestion.options.map((option, idx) => {
                      const isSelected = selectedAnswer === idx;
                      let optionBg = "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50/50 dark:hover:bg-slate-800/40 text-slate-800 dark:text-slate-100";
                      let optionIcon = <span className="w-5 h-5 rounded-full border border-slate-300 dark:border-slate-700 flex-shrink-0" />;

                      if (isAnswerSubmitted) {
                        if (idx === video.quizQuestion.answerIndex) {
                          optionBg = "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-850 text-emerald-900 dark:text-emerald-250 shadow-sm";
                          optionIcon = (
                            <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center flex-shrink-0">
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            </span>
                          );
                        } else if (isSelected) {
                          optionBg = "bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800/60 text-rose-950 dark:text-rose-250";
                          optionIcon = (
                            <span className="w-5 h-5 rounded-full bg-rose-500 text-white flex items-center justify-center flex-shrink-0">
                              <AlertCircle className="w-3.5 h-3.5" />
                            </span>
                          );
                        } else {
                          optionBg = "bg-slate-100/40 dark:bg-slate-800/20 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500 pointer-events-none";
                        }
                      } else if (isSelected) {
                        optionBg = "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 dark:border-emerald-700 text-emerald-950 dark:text-emerald-250 shadow-sm ring-1 ring-emerald-500/10";
                        optionIcon = <span className="w-5 h-5 rounded-full border-2 border-emerald-500 bg-white dark:bg-slate-900 flex items-center justify-center flex-shrink-0"><span className="w-2 h-2 rounded-full bg-emerald-500" /></span>;
                      }

                      return (
                        <button
                          key={idx}
                          disabled={isAnswerSubmitted}
                          onClick={() => setSelectedAnswer(idx)}
                          className={`w-full text-left p-4 rounded-xl border text-sm transition-all duration-200 flex items-start gap-3 leading-relaxed ${optionBg}`}
                        >
                          {optionIcon}
                          <span>{option}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Actions & Feedback */}
                  <div className="pt-2">
                    {!isAnswerSubmitted ? (
                      <button
                        onClick={handleSubmitQuiz}
                        disabled={selectedAnswer === null}
                        className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm tracking-wide transition-all shadow-sm flex items-center justify-center gap-2 ${
                          selectedAnswer === null
                            ? "bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed"
                            : "bg-emerald-600 text-white hover:bg-emerald-700 active:scale-98"
                        }`}
                        id="submit-video-quiz-btn"
                      >
                        Confirm Answer
                      </button>
                    ) : (
                      <div className="space-y-4 animate-scaleUp">
                        {/* Explanation block */}
                        <div className={`p-4.5 rounded-xl border leading-relaxed text-sm ${
                          selectedAnswer === video.quizQuestion.answerIndex
                            ? "bg-emerald-50/50 dark:bg-emerald-950/30 border-emerald-100 dark:border-emerald-800 text-slate-700 dark:text-slate-200"
                            : "bg-amber-50/50 dark:bg-amber-950/30 border-amber-100 dark:border-amber-800 text-slate-700 dark:text-slate-200"
                        }`}>
                          <p className="font-bold mb-1 font-mono text-[11px] uppercase tracking-wide flex items-center gap-1.5">
                            {selectedAnswer === video.quizQuestion.answerIndex ? (
                              <span className="text-emerald-700 dark:text-emerald-450 flex items-center gap-1">✓ Well done! Correct Answer</span>
                            ) : (
                              <span className="text-amber-700 dark:text-amber-450 flex items-center gap-1">⚠ Incorrect Answer Selected</span>
                            )}
                          </p>
                          <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">{video.quizQuestion.explanation}</p>
                        </div>

                        <button
                          onClick={handleResetQuiz}
                          className="w-full py-3.5 px-6 rounded-xl border-2 border-emerald-600 text-emerald-800 dark:text-emerald-350 bg-white dark:bg-slate-900 hover:bg-emerald-50/30 dark:hover:bg-emerald-950/30 active:scale-98 font-bold text-sm transition-all flex items-center justify-center gap-2"
                        >
                          <RefreshCw className="w-4 h-4" /> Try Again
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
