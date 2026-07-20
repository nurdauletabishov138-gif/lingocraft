import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Shield, Award, HelpCircle, Check, AlertCircle, ArrowRight, RotateCcw, Share2, Clipboard, Heart } from "lucide-react";
import { quizQuestionsData } from "../data";

export default function QuizSection() {
  const [userName, setUserName] = useState("");
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [copied, setCopied] = useState(false);

  const currentQuestion = quizQuestionsData[currentIdx];

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (userName.trim()) {
      setIsQuizStarted(true);
    }
  };

  const handleSubmit = () => {
    if (selectedOpt === null) return;
    setIsSubmitted(true);
    if (selectedOpt === currentQuestion.answerIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    setSelectedOpt(null);
    setIsSubmitted(false);
    if (currentIdx < quizQuestionsData.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleReset = () => {
    setCurrentIdx(0);
    setScore(0);
    setSelectedOpt(null);
    setIsSubmitted(false);
    setQuizCompleted(false);
    setIsQuizStarted(false);
    setUserName("");
    setCopied(false);
  };

  const getRank = (scoreVal: number) => {
    if (scoreVal === 5) return { title: "Kiber-Ekspert (Cyber Expert)", icon: "🏆", desc: "Siz raqamli xavfsizlik va media savodxonlik qoidalarini mukammal bilasiz! Haqiqiy kiber-himoyachisiz." };
    if (scoreVal >= 3) return { title: "Raqamli Himoyachi (Digital Defender)", icon: "🛡️", desc: "Sizning bilimlaringiz juda yaxshi, lekin kiber-tuzoqlarga tushmaslik uchun yana ozroq diqqatli bo'lishingiz mumkin." };
    return { title: "Kiber-Boshlovchi (Cyber Beginner)", icon: "💡", desc: "Raqamli dunyoda xavfsizlik qoidalarini yana chuqurroq o'rganishni hamda darslarimizni ko'proq tahlil qilishni tavsiya qilamiz." };
  };

  const rank = getRank(score);

  const handleCopyCertificate = () => {
    const text = `🏆 RAQAMLI SERTIFIKAT 🏆\n\nIsm: ${userName}\nNatija: ${score}/5\nUnvon: ${rank.title}\nPlatforma: Media Literacy Hub\n\nTabriklaymiz, raqamli xavfsizlik sinovidan a'lo darajada o'tdingiz!`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden" id="quiz-challenge">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 blur-3xl rounded-full pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center space-y-4 mb-12">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-mono tracking-widest uppercase"
          >
            <Shield className="w-4 h-4" /> Interaktiv Kiber-Sinov
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight">
            Kiberxavfsizlik va Media Savodxonlik Sinovi
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">
            Real hayotiy kiber-ssenariylar asosida o'zingizni sinab ko'ring, unvonga ega bo'ling va maxsus raqamli sertifikatni qo'lga kiriting!
          </p>
        </div>

        <div className="bg-slate-950/70 border border-slate-800 rounded-3xl p-6 md:p-10 shadow-2xl backdrop-blur-xl">
          <AnimatePresence mode="wait">
            {!isQuizStarted ? (
              /* Landing stage */
              <motion.form
                key="landing"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onSubmit={handleStart}
                className="space-y-6 max-w-md mx-auto text-center"
              >
                <div className="mx-auto w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-2xl flex items-center justify-center">
                  <Award className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold text-lg text-slate-100">Sertifikat uchun ismingizni kiriting</h3>
                  <p className="text-slate-400 text-xs">Test yakunida ismingiz yozilgan maxsus mukofot shakllanadi.</p>
                </div>

                <div className="space-y-3">
                  <input
                    type="text"
                    required
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Sizning to'liq ismingiz..."
                    className="w-full bg-slate-900 border border-slate-700 hover:border-slate-600 focus:border-emerald-500 rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-500 text-center font-semibold outline-none transition-all focus:ring-1 focus:ring-emerald-500/20"
                    id="quiz-username-input"
                  />
                  <button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-500 active:scale-98 text-white py-3.5 px-6 rounded-xl font-bold text-sm tracking-wide transition-all shadow-lg shadow-emerald-900/20 flex items-center justify-center gap-2"
                    id="start-quiz-btn"
                  >
                    Sinovni boshlash <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.form>
            ) : !quizCompleted ? (
              /* Active Test stage */
              <motion.div
                key="active-quiz"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                {/* Progression Tracker header */}
                <div className="flex justify-between items-center text-xs font-mono text-slate-400 border-b border-slate-800 pb-4">
                  <span className="text-emerald-400 flex items-center gap-1.5 uppercase tracking-wide">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    Mavzu: {currentQuestion.category}
                  </span>
                  <span>Savol {currentIdx + 1} / {quizQuestionsData.length}</span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <motion.div
                    className="bg-emerald-500 h-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentIdx) / quizQuestionsData.length) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                {/* Question & Scenario */}
                <div className="space-y-4">
                  <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-2.5">
                    <span className="bg-slate-800 border border-slate-700 text-slate-300 text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded font-mono">
                      Vaziyat tahlili (Ssenariy)
                    </span>
                    <p className="text-slate-200 text-sm md:text-base leading-relaxed italic">
                      &ldquo;{currentQuestion.scenario}&rdquo;
                    </p>
                  </div>

                  <h3 className="font-bold text-lg text-white leading-snug">
                    {currentQuestion.question}
                  </h3>
                </div>

                {/* Answer Options */}
                <div className="space-y-3">
                  {currentQuestion.options.map((option, index) => {
                    const isSelected = selectedOpt === index;
                    let optionStyle = "bg-slate-900/40 border-slate-800 text-slate-300 hover:bg-slate-900 hover:border-slate-700";
                    let markerStyle = "border-slate-700 text-slate-500";

                    if (isSubmitted) {
                      if (index === currentQuestion.answerIndex) {
                        optionStyle = "bg-emerald-500/10 border-emerald-500/50 text-emerald-300 shadow-sm shadow-emerald-500/5";
                        markerStyle = "bg-emerald-500 border-emerald-400 text-slate-950";
                      } else if (isSelected) {
                        optionStyle = "bg-rose-500/10 border-rose-500/50 text-rose-300";
                        markerStyle = "bg-rose-500 border-rose-400 text-white";
                      } else {
                        optionStyle = "bg-slate-900/10 border-slate-800/40 text-slate-600 pointer-events-none";
                        markerStyle = "border-slate-800/40 text-slate-700";
                      }
                    } else if (isSelected) {
                      optionStyle = "bg-emerald-500/5 border-emerald-500 text-emerald-200 ring-1 ring-emerald-500/20";
                      markerStyle = "bg-emerald-500/10 border-emerald-500 text-emerald-400";
                    }

                    return (
                      <button
                        key={index}
                        disabled={isSubmitted}
                        onClick={() => setSelectedOpt(index)}
                        className={`w-full text-left p-4.5 rounded-2xl border text-sm transition-all duration-200 flex items-start gap-4 leading-relaxed ${optionStyle}`}
                      >
                        <span className={`w-6 h-6 rounded-lg border font-mono font-bold text-xs flex items-center justify-center flex-shrink-0 transition-all ${markerStyle}`}>
                          {isSubmitted && index === currentQuestion.answerIndex ? <Check className="w-4 h-4 stroke-[3]" /> : String.fromCharCode(65 + index)}
                        </span>
                        <span className="flex-1">{option}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Action Buttons & Explanations */}
                <div className="pt-4 border-t border-slate-900">
                  {!isSubmitted ? (
                    <button
                      onClick={handleSubmit}
                      disabled={selectedOpt === null}
                      className={`w-full py-4 rounded-xl font-bold text-sm tracking-wide transition-all flex items-center justify-center gap-2 ${
                        selectedOpt === null
                          ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                          : "bg-emerald-600 hover:bg-emerald-500 active:scale-98 text-white shadow-lg shadow-emerald-900/20"
                      }`}
                      id="quiz-submit-ans-btn"
                    >
                      Javobni Tekshirish
                    </button>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4"
                    >
                      {/* Interactive Explanation Box */}
                      <div className={`p-5 rounded-2xl border ${
                        selectedOpt === currentQuestion.answerIndex
                          ? "bg-emerald-500/5 border-emerald-500/20 text-slate-300"
                          : "bg-rose-500/5 border-rose-500/20 text-slate-300"
                      }`}>
                        <div className="flex items-center gap-2 font-bold mb-1.5 font-mono text-xs uppercase tracking-wider">
                          {selectedOpt === currentQuestion.answerIndex ? (
                            <span className="text-emerald-400 flex items-center gap-1"><Check className="w-4 h-4 stroke-[3]" /> To'g'ri topshirdingiz!</span>
                          ) : (
                            <span className="text-rose-400 flex items-center gap-1"><AlertCircle className="w-4 h-4" /> Diqqat, xatolik bor!</span>
                          )}
                        </div>
                        <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
                          {currentQuestion.explanation}
                        </p>
                      </div>

                      <button
                        onClick={handleNext}
                        className="w-full py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm rounded-xl transition-all active:scale-98 flex items-center justify-center gap-2 border border-slate-700"
                        id="quiz-next-btn"
                      >
                        {currentIdx === quizQuestionsData.length - 1 ? "Yakuniy Natijani Ko'rish" : "Keyingi Ssenariy"} <ArrowRight className="w-4 h-4" />
                      </button>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ) : (
              /* Completion stage & Digital Certificate */
              <motion.div
                key="completion"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-8"
              >
                {/* Score Card Banner */}
                <div className="text-center space-y-4 max-w-lg mx-auto">
                  <div className="text-5xl">{rank.icon}</div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-white">{userName}, tabriklaymiz!</h3>
                    <p className="text-emerald-400 font-mono text-sm uppercase tracking-widest font-bold">
                      Natijangiz: {score} / 5 Ball
                    </p>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {rank.desc}
                    </p>
                  </div>
                </div>

                {/* Digital Certificate Visual Container */}
                <div className="p-6 md:p-8 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border-4 border-double border-emerald-500/40 rounded-3xl relative text-center space-y-6 shadow-2xl">
                  {/* Decorative corners */}
                  <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-emerald-500/40"></div>
                  <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-emerald-500/40"></div>
                  <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-emerald-500/40"></div>
                  <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-emerald-500/40"></div>

                  <div className="space-y-2">
                    <span className="text-[10px] font-mono tracking-widest text-emerald-500 uppercase font-bold">
                      Media Literacy Hub &bull; Kiber-Tashabbusi
                    </span>
                    <h4 className="text-xl md:text-2xl font-serif tracking-wide text-amber-100 font-bold">
                      MUVOFAQQIYAT SERTIFIKATI
                    </h4>
                    <p className="text-[11px] text-slate-400 italic">Ushbu hujjat mamnuniyat bilan taqdim etiladi:</p>
                  </div>

                  <div className="py-2">
                    <h5 className="text-2xl md:text-3xl font-bold text-white tracking-wide border-b border-slate-800 pb-3 max-w-md mx-auto italic font-serif">
                      {userName}
                    </h5>
                  </div>

                  <div className="space-y-2.5 max-w-lg mx-auto">
                    <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                      raqamli xavfsizlik, shaxsiy ma'lumotlar muhofazasi, deepfakes fosh qilish va kiber-savodxonlik bo'yicha interaktiv darslar va amaliy kiber-sinovdan muvaffaqiyatli o'tib, quyidagi darajani qo'lga kiritdi:
                    </p>
                    <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-4 py-2 rounded-xl text-xs md:text-sm font-bold font-mono uppercase tracking-wider">
                      {rank.title}
                    </div>
                  </div>

                  <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-500 text-[10px] font-mono border-t border-slate-900 max-w-xl mx-auto">
                    <span>SANA: {new Date().toLocaleDateString("uz-UZ")}</span>
                    <span>SERTIFIKAT ID: MLH-{Math.floor(100000 + Math.random() * 900000)}</span>
                    <span className="text-emerald-600/80 font-bold">VERIFIED SECURE</span>
                  </div>
                </div>

                {/* Certificate Controls */}
                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-2">
                  <button
                    onClick={handleCopyCertificate}
                    className="flex-1 py-3.5 px-6 rounded-xl font-bold text-xs bg-slate-800 hover:bg-slate-700 text-white transition-all flex items-center justify-center gap-2 border border-slate-700 active:scale-98"
                    id="copy-certificate-btn"
                  >
                    <Clipboard className="w-4 h-4" /> {copied ? "Nusxalandi!" : "Sertifikatni nusxalash"}
                  </button>

                  <button
                    onClick={handleReset}
                    className="flex-1 py-3.5 px-6 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-500 text-white transition-all flex items-center justify-center gap-2 active:scale-98"
                    id="reset-quiz-btn"
                  >
                    <RotateCcw className="w-4 h-4" /> Qaytadan boshlash
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
