import React, { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import {
  X, Check, Sparkles, Send, Trash2, HelpCircle,
  Smile, Award, BookOpen, Download, RefreshCw, PenTool,
  RotateCcw, ArrowLeft, ArrowRight
} from "lucide-react";

interface InteractiveWorksheetProps {
  lessonId: string;
  onClose: () => void;
}

export default function InteractiveWorksheet({ lessonId, onClose }: InteractiveWorksheetProps) {
  // Common states
  const [studentName, setStudentName] = useState("");
  const [studentClass, setStudentClass] = useState("10");
  const [studentDate, setStudentDate] = useState(() => {
    return new Date().toISOString().split("T")[0];
  });

  // Dynamic Worksheet States based on Lesson ID
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [ratings, setRatings] = useState<{ [key: string]: string }>({});
  const [checks, setChecks] = useState<{ [key: string]: boolean }>({});
  const [selectedWord1, setSelectedWord1] = useState<string>("");
  const [selectedWord2, setSelectedWord2] = useState<string>("");
  const [compoundsChecked, setCompoundsChecked] = useState<{ [key: number]: boolean }>({});
  const [compoundResults, setCompoundsResults] = useState<{ [key: number]: string }>({});

  // Canvas states
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState("#1e5a44");
  const [isCanvasInitialized, setIsCanvasInitialized] = useState(false);

  // Match / Quiz verification states
  const [matchAnswers, setMatchAnswers] = useState<{ [key: string]: string }>({});
  const [matchVerified, setMatchVerified] = useState(false);
  const [matchScore, setMatchVerifiedScore] = useState(0);

  // AI Analysis states
  const [aiAnalysisResult, setAiAnalysisResult] = useState<string | null>(null);
  const [isAnalyzing, setIsAIAnalyzing] = useState(false);

  // Setup layout configs for each of the 10 worksheets
  const isEatingOutClassic = lessonId === "class-10-extra-1" || lessonId === "eating-out-classic" || lessonId === "10-1";
  const isEatingOutModern = lessonId === "class-10-extra-2" || lessonId === "eating-out-modern" || lessonId === "10-2";
  const isHealthyBodies = lessonId === "class-10-extra-3" || lessonId === "healthy-bodies" || lessonId === "10-3";
  const isGettingAround = lessonId === "class-10-extra-4" || lessonId === "getting-around";
  const isMysteriesInNature = lessonId === "class-10-extra-5" || lessonId === "mysteries-nature";
  const isAmazingAnimals = lessonId === "class-10-extra-6" || lessonId === "amazing-animals";
  const isWhatWatching = lessonId === "class-10-extra-7" || lessonId === "what-watching";
  const isBritishTv = lessonId === "class-10-extra-8" || lessonId === "british-tv";
  const isSchoolFun = lessonId === "class-10-extra-9" || lessonId === "school-fun";
  const isFamilies = lessonId === "class-10-extra-10" || lessonId === "families";

  // Determine active sheet properties
  let sheetTitle = "Eating Out!";
  let sheetSubtitle = "An Interactive Worksheet for Developing Linguacreative Competence";
  let themeColor = "emerald"; // emerald, teal, blue, indigo, violet, rose, amber, slate
  let goalText = "to play with English words, invent new ones, and express your own ideas about restaurants and eating out in a creative way!";

  if (isEatingOutClassic) {
    sheetTitle = "🍽️ Eating Out! (Classic)";
    sheetSubtitle = "An Interactive Worksheet for Developing Linguacreative Competence";
    themeColor = "blue";
    goalText = "to play with English words, invent new ones, and express your own ideas about restaurants and eating out in a creative way!";
  } else if (isEatingOutModern) {
    sheetTitle = "🍕 Eating Out! (Modern)";
    sheetSubtitle = "Interactive Language & Creativity Sheet";
    themeColor = "rose";
    goalText = "Combine different foods, draft your dream menus, and use connecting phrases to talk about dining!";
  } else if (isHealthyBodies) {
    sheetTitle = "🧘 HEALTHY BODIES";
    sheetSubtitle = "AI-Powered Interactive Language & Wellness Worksheet";
    themeColor = "emerald";
    goalText = "Work with health idioms, create personalized metaphors about your body, and design a wellness poster!";
  } else if (isGettingAround) {
    sheetTitle = "🚗 GETTING AROUND TOWN!";
    sheetSubtitle = "Creative Town Transport Worksheet";
    themeColor = "indigo";
    goalText = "Explore city routes, blend vocabulary to invent modern eco-vehicles, and write dialogues!";
  } else if (isMysteriesInNature) {
    sheetTitle = "🌿 MYSTERIES IN NATURE";
    sheetSubtitle = "Nature, Legends, and Creative Role-Play Sheet";
    themeColor = "teal";
    goalText = "Invent natural mysteries, write personification stories about the environment, and interview eyewitnesses!";
  } else if (isAmazingAnimals) {
    sheetTitle = "🐾 AMAZING ANIMALS";
    sheetSubtitle = "Interactive Language & Animal Science Worksheet";
    themeColor = "amber";
    goalText = "Learn animal idioms, compile animal science compound words, and draw a brand-new hybrid creature!";
  } else if (isWhatWatching) {
    sheetTitle = "🎬 WHAT ARE YOU WATCHING?";
    sheetSubtitle = "AI-Powered Media & Cinema Worksheet";
    themeColor = "violet";
    goalText = "Explore screen idioms, build media compound words, and pitch your own international TV show!";
  } else if (isBritishTv) {
    sheetTitle = "📺 BRITISH TV AROUND THE WORLD";
    sheetSubtitle = "Global Media & Subtitling Competence Sheet";
    themeColor = "slate";
    goalText = "Deconstruct TV shows, write comic cliffhangers, and design a global TV show poster!";
  } else if (isSchoolFun) {
    sheetTitle = "🏫 SCHOOL CAN BE FUN!";
    sheetSubtitle = "Interactive School Life & Rules Worksheet";
    themeColor = "sky";
    goalText = "Invent school-themed idioms, compose acrostic poems, and sketch your dream school rules!";
  } else if (isFamilies) {
    sheetTitle = "👪 FAMILIES!";
    sheetSubtitle = "Warm Relations & Crest Design Worksheet";
    themeColor = "pink";
    goalText = "Discuss siblings, parents, and friends; build compound vocabulary and draw your official family crest!";
  }

  // Handle Input Changes
  const handleInputChange = (key: string, val: string) => {
    setAnswers((prev) => ({ ...prev, [key]: val }));
  };

  const handleRatingChange = (rowId: string, value: string) => {
    setRatings((prev) => ({ ...prev, [rowId]: value }));
  };

  const handleCheckChange = (boxId: string) => {
    setChecks((prev) => ({ ...prev, [boxId]: !prev[boxId] }));
  };

  // Canvas Drawing Engine
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let clientX, clientY;
    if ("touches" in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = brushColor;
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let clientX, clientY;
    if ("touches" in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  // Initialize Canvas dimensions on mount/render
  useEffect(() => {
    if (canvasRef.current && !isCanvasInitialized) {
      const canvas = canvasRef.current;
      canvas.width = canvas.parentElement?.clientWidth || 600;
      canvas.height = 240;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      setIsCanvasInitialized(true);
    }
  }, [canvasRef, isCanvasInitialized, isAmazingAnimals, isBritishTv, isSchoolFun, isFamilies]);

  // Match Answers validation
  const checkMatchAnswers = () => {
    let score = 0;
    const correctAnswers: { [key: string]: string } = {};

    if (isHealthyBodies) {
      // definitions matching
      correctAnswers["1"] = "satisfied";
      correctAnswers["2"] = "healthy";
      correctAnswers["3"] = "cold";
      correctAnswers["4"] = "improve";
      correctAnswers["5"] = "sweat";
      correctAnswers["6"] = "exercise";
    } else if (isMysteriesInNature) {
      correctAnswers["1"] = "event";
      correctAnswers["2"] = "rare";
      correctAnswers["3"] = "myth";
      correctAnswers["4"] = "vanish";
      correctAnswers["5"] = "old";
      correctAnswers["6"] = "explorer";
    }

    Object.keys(correctAnswers).forEach((key) => {
      const userAns = (matchAnswers[key] || "").toLowerCase();
      const target = correctAnswers[key];
      if (userAns.includes(target)) {
        score++;
      }
    });

    setMatchVerifiedScore(score);
    setMatchVerified(true);
  };

  // Checked Compound Words logic for Unit 16 "Amazing Animals"
  const checkCompoundRow = (rowIdx: number, w1: string, w2: string) => {
    const combined = `${w1}-${w2}`.toLowerCase();
    const isValid =
      combined === "cold-blooded" ||
      combined === "warm-blooded" ||
      combined === "water-proof" ||
      combined === "waterproof" ||
      combined === "wild-life" ||
      combined === "wildlife" ||
      combined === "night-owl" ||
      combined === "nightfall";

    setCompoundsChecked((prev) => ({ ...prev, [rowIdx]: true }));
    setCompoundsResults((prev) => ({
      ...prev,
      [rowIdx]: isValid
        ? "Correct! This is a valid English compound word. 🎉"
        : "This sounds unusual, try another combination. 🤔"
    }));
  };

  // Run AI analysis
  const runAIAnalysis = () => {
    setIsAIAnalyzing(true);
    setAiAnalysisResult(null);

    setTimeout(() => {
      let analysisText = "";
      const totalAnswers = Object.values(answers).filter(Boolean).length;

      analysisText += `🌟 **AI Analysis Results for ${studentName || "Dear Student"} (Class Grade ${studentClass}):**\n\n`;

      if (totalAnswers < 3) {
        analysisText += `You haven't completed all worksheet exercises yet. Please fill in the blank fields, write your creative descriptions, and let your imagination shine! Every completed block helps develop your English linguacreative competence.`;
      } else {
        analysisText += `You actively engaged in today's digital session and successfully submitted **${totalAnswers}** creative answers!\n\n`;

        // Topic-specific analysis
        if (isEatingOutClassic || isEatingOutModern) {
          analysisText += `🍽️ **Food & Restaurant Etiquette Analysis:**\n`;
          analysisText += `- Your word blends and definitions are highly creative. Associating vocabulary with visual structures is the best way to anchor word recall.\n`;
          analysisText += `- Your comic dialogues show a great sense of humor and cultural politeness. Using gentle and structured language with waiters is a key aspect of polite communication.\n\n`;
        } else if (isHealthyBodies) {
          analysisText += `🧘 **Mind & Body Wellness Analysis:**\n`;
          analysisText += `- Your personifications and metaphors about physical fitness (e.g., feeling as fit as a fiddle) highlight an advanced expressive writing skill.\n`;
          analysisText += `- The alliterative slogans you designed are extremely effective, resembling professional promotional copy used in media contexts.\n\n`;
        } else if (isGettingAround) {
          analysisText += `🚗 **Town Navigation & Route Analysis:**\n`;
          analysisText += `- The user guides you drafted for custom green vehicles (like GlideCycle or SkateBus) show brilliant functional thinking and rich vocabulary.\n`;
          analysisText += `- You have correctly applied figurative meanings to develop new idiom descriptions.\n\n`;
        } else if (isMysteriesInNature) {
          analysisText += `🌿 **Nature Mysteries & Journalism Analysis:**\n`;
          analysisText += `- The interview script between your reporter and eyewitness complies with natural speaking rules. You integrated key terms (phenomenon, unique, legend) perfectly.\n`;
          analysisText += `- Your mystery plot shows a highly vivid and visual imagination.\n\n`;
        } else if (isAmazingAnimals) {
          analysisText += `🐾 **Wildlife Science & Illustration Analysis:**\n`;
          analysisText += `- Your description of the hybrid animal shows a beautiful appreciation for ecological literacy and biological characteristics.\n`;
          analysisText += `- You distinguished idioms nicely, which builds native-like conversational fluency.\n\n`;
        } else if (isWhatWatching || isBritishTv) {
          analysisText += `🎬 **Media, Cinema & Subtitle Analysis:**\n`;
          analysisText += `- Your TV show pitches and poster outlines show great understanding of scriptwriting and narrative pacing.\n`;
          analysisText += `- Incorporating vocabulary like blockbuster and binge-watch indicates a strong grasp of digital-era media trends.\n\n`;
        } else if (isSchoolFun || isFamilies) {
          analysisText += `🏫 **School Rules & Family Crest Analysis:**\n`;
          analysisText += `- Your school rules and family mottos correctly incorporate complex clauses, proving high grammatical competence.\n`;
          analysisText += `- The acrostic poem you composed is beautifully structured, filled with warmth and pride.\n\n`;
        }

        // Self-Assessment overview
        analysisText += `🎯 **Overall Evaluation:**\n`;
        analysisText += `You evaluated yourself very highly (🤩 and 😊). This positive confidence is your greatest asset in conquering new languages and digital-age workflows.\n\n`;
        analysisText += `💡 **AI Recommendation:** Keep experimenting with English word-blends in your everyday writing! Try sharing your custom drawings with classmates to practice conversational storytelling.`;
      }

      setAiAnalysisResult(analysisText);
      setIsAIAnalyzing(false);
    }, 1200);
  };

  // Dynamic quiz rendering for matches
  const renderMatchActivity = () => {
    if (isHealthyBodies) {
      return (
        <div className="space-y-4">
          <div className="text-sm font-bold text-slate-700 dark:text-slate-300">
            Define or write brief English meanings for the following idioms (e.g., healthy, tired, exercise):
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="font-bold text-xs text-emerald-600 font-mono">1. To feel satisfied</span>
              <input
                type="text"
                placeholder="Definition (e.g. satisfied, content, happy)..."
                value={matchAnswers["1"] || ""}
                onChange={(e) => setMatchAnswers({ ...matchAnswers, "1": e.target.value })}
                className="w-full text-xs p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white"
              />
            </div>
            <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="font-bold text-xs text-emerald-600 font-mono">2. Fit as a fiddle</span>
              <input
                type="text"
                placeholder="Definition (e.g. healthy, strong)..."
                value={matchAnswers["2"] || ""}
                onChange={(e) => setMatchAnswers({ ...matchAnswers, "2": e.target.value })}
                className="w-full text-xs p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white"
              />
            </div>
            <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="font-bold text-xs text-emerald-600 font-mono">3. To catch a cold</span>
              <input
                type="text"
                placeholder="Definition (e.g. cold, sick, flu)..."
                value={matchAnswers["3"] || ""}
                onChange={(e) => setMatchAnswers({ ...matchAnswers, "3": e.target.value })}
                className="w-full text-xs p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white"
              />
            </div>
            <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="font-bold text-xs text-emerald-600 font-mono">4. To be on the mend</span>
              <input
                type="text"
                placeholder="Definition (e.g. improve, healing)..."
                value={matchAnswers["4"] || ""}
                onChange={(e) => setMatchAnswers({ ...matchAnswers, "4": e.target.value })}
                className="w-full text-xs p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white"
              />
            </div>
            <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="font-bold text-xs text-emerald-600 font-mono">5. To sweat like a pig</span>
              <input
                type="text"
                placeholder="Definition (e.g. sweat, heavy)..."
                value={matchAnswers["5"] || ""}
                onChange={(e) => setMatchAnswers({ ...matchAnswers, "5": e.target.value })}
                className="w-full text-xs p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white"
              />
            </div>
            <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="font-bold text-xs text-emerald-600 font-mono">6. To work out</span>
              <input
                type="text"
                placeholder="Definition (e.g. exercise, sports)..."
                value={matchAnswers["6"] || ""}
                onChange={(e) => setMatchAnswers({ ...matchAnswers, "6": e.target.value })}
                className="w-full text-xs p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white"
              />
            </div>
          </div>
          <button
            onClick={checkMatchAnswers}
            className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold font-mono transition-all"
          >
            Verify Idiom Definitions
          </button>
          {matchVerified && (
            <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs flex justify-between items-center font-mono">
              <span className="text-slate-800 dark:text-slate-200">Validation complete. Successfully defined:</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">{matchScore} / 6</span>
            </div>
          )}
        </div>
      );
    }

    if (isMysteriesInNature) {
      return (
        <div className="space-y-4">
          <div className="text-sm font-bold text-slate-700 dark:text-slate-300">
            Verify key natural vocabulary definitions (e.g. event, myth, rare, vanish, old, explorer):
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="font-bold text-xs text-teal-600">1. Phenomenon</span>
              <input
                type="text"
                placeholder="e.g. event, happening"
                value={matchAnswers["1"] || ""}
                onChange={(e) => setMatchAnswers({ ...matchAnswers, "1": e.target.value })}
                className="w-full text-xs p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800"
              />
            </div>
            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="font-bold text-xs text-teal-600">2. Unique</span>
              <input
                type="text"
                placeholder="e.g. rare, special"
                value={matchAnswers["2"] || ""}
                onChange={(e) => setMatchAnswers({ ...matchAnswers, "2": e.target.value })}
                className="w-full text-xs p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800"
              />
            </div>
            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="font-bold text-xs text-teal-600">3. Legend</span>
              <input
                type="text"
                placeholder="e.g. myth, old story"
                value={matchAnswers["3"] || ""}
                onChange={(e) => setMatchAnswers({ ...matchAnswers, "3": e.target.value })}
                className="w-full text-xs p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800"
              />
            </div>
            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="font-bold text-xs text-teal-600">4. To disappear</span>
              <input
                type="text"
                placeholder="e.g. vanish, go away"
                value={matchAnswers["4"] || ""}
                onChange={(e) => setMatchAnswers({ ...matchAnswers, "4": e.target.value })}
                className="w-full text-xs p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800"
              />
            </div>
            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="font-bold text-xs text-teal-600">5. Ancient</span>
              <input
                type="text"
                placeholder="e.g. old, historical"
                value={matchAnswers["5"] || ""}
                onChange={(e) => setMatchAnswers({ ...matchAnswers, "5": e.target.value })}
                className="w-full text-xs p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800"
              />
            </div>
            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="font-bold text-xs text-teal-600">6. Explorer</span>
              <input
                type="text"
                placeholder="e.g. traveler, explorer"
                value={matchAnswers["6"] || ""}
                onChange={(e) => setMatchAnswers({ ...matchAnswers, "6": e.target.value })}
                className="w-full text-xs p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800"
              />
            </div>
          </div>
          <button
            onClick={checkMatchAnswers}
            className="w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition-all"
          >
            Verify Matches
          </button>
          {matchVerified && (
            <div className="p-3 bg-slate-50 dark:bg-slate-800 text-xs font-mono rounded-lg flex justify-between">
              <span>Result:</span>
              <span className="font-bold text-teal-600">{matchScore} / 6 correct</span>
            </div>
          )}
        </div>
      );
    }

    return null;
  };

  // Smiley rating helper
  const renderSmileyRow = (rowId: string, text: string) => {
    const smileys = [
      { char: "😞", label: "Poor" },
      { char: "😐", label: "Average" },
      { char: "😊", label: "Good" },
      { char: "🤩", label: "Excellent!" }
    ];
    const currentVal = ratings[rowId];

    return (
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 p-4 bg-slate-50 dark:bg-slate-850 rounded-2xl border border-slate-100 dark:border-slate-800">
        <span className="text-xs md:text-sm text-slate-800 dark:text-slate-200">{text}</span>
        <div className="flex gap-2.5">
          {smileys.map((sm, idx) => {
            const isActive = currentVal === sm.char;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleRatingChange(rowId, sm.char)}
                className={`text-2xl p-1.5 rounded-xl transition-all cursor-pointer ${
                  isActive ? "bg-white dark:bg-slate-800 shadow-md scale-125 opacity-100" : "opacity-40 hover:opacity-80"
                }`}
                title={sm.label}
              >
                {sm.char}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 py-8 px-4 md:px-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-[32px] overflow-hidden shadow-2xl border border-slate-200/50 dark:border-slate-850">
        {/* Header Navigation and Title banner */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-700 to-indigo-800 text-white p-6 md:p-10 relative">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 bg-white/10 hover:bg-white/20 text-white p-2.5 rounded-full transition-all border border-white/15 flex items-center justify-center"
            id="close-worksheet-page"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            <span className="text-xs font-bold pr-1">Back Home</span>
          </button>

          <div className="space-y-3 max-w-[85%]">
            <span className="inline-flex items-center gap-1.5 bg-white/20 text-white text-[10px] font-mono uppercase tracking-widest px-3 py-1 rounded-full font-bold border border-white/10">
              <Sparkles className="w-3.5 h-3.5" /> Interactive Learning Experience
            </span>
            <h1 className="text-2xl md:text-4xl font-black tracking-tight">{sheetTitle}</h1>
            <p className="text-emerald-50/80 text-xs md:text-sm font-semibold italic">{sheetSubtitle}</p>
          </div>
        </div>

        {/* Student Meta Details Block */}
        <div className="p-6 md:p-8 bg-slate-50 dark:bg-slate-950 border-b border-slate-150 dark:border-slate-850 grid grid-cols-1 md:grid-cols-3 gap-6 text-slate-800 dark:text-slate-100">
          <div className="space-y-1.5">
            <label className="block text-[10px] uppercase tracking-wider font-bold text-slate-500 font-mono">Student Name:</label>
            <input
              type="text"
              placeholder="Your Full Name"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="w-full text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-xl px-4 py-3 outline-none focus:border-emerald-500"
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-[10px] uppercase tracking-wider font-bold text-slate-500 font-mono">Class / Grade:</label>
            <input
              type="text"
              value={studentClass}
              onChange={(e) => setStudentClass(e.target.value)}
              className="w-full text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-xl px-4 py-3 outline-none"
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-[10px] uppercase tracking-wider font-bold text-slate-500 font-mono">Date:</label>
            <input
              type="date"
              value={studentDate}
              onChange={(e) => setStudentDate(e.target.value)}
              className="w-full text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-xl px-4 py-3 outline-none"
            />
          </div>
        </div>

        {/* Goal Indicator Box */}
        <div className="mx-6 md:mx-8 mt-8 p-5 bg-amber-500/10 border border-amber-500/20 text-amber-900 dark:text-amber-400 rounded-2xl flex items-start gap-3">
          <div className="p-2 bg-amber-500/20 rounded-lg text-amber-600 dark:text-amber-400">
            <Award className="w-5 h-5" />
          </div>
          <div className="space-y-1 text-xs md:text-sm">
            <span className="font-bold block uppercase tracking-wider font-mono text-[10px]">Lesson Goal:</span>
            <p className="leading-relaxed font-semibold">{goalText}</p>
          </div>
        </div>

        {/* Dynamic Activity Panels */}
        <div className="p-6 md:p-8 space-y-10">
          
          {/* ACTIVITY 1 */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
              <span className="px-2.5 py-0.5 bg-emerald-600 text-white rounded-md font-mono text-xs font-bold">ACT. 1</span>
              <h2 className="font-bold text-base md:text-lg text-slate-900 dark:text-white">Picture Word-Web (Visual Word Association)</h2>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-xs italic">
              Look at the concepts and write the first word that comes to mind. Then write a custom blended word!
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(isEatingOutClassic || isEatingOutModern) && (
                <>
                  <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200/60 flex flex-col justify-between">
                    <span className="text-4xl mb-2">🍽️ Plate / Dinner</span>
                    <input
                      type="text"
                      placeholder="First word that comes to mind (e.g. Dinner)"
                      value={answers["act1_1"] || ""}
                      onChange={(e) => handleInputChange("act1_1", e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-800"
                    />
                  </div>
                  <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200/60 flex flex-col justify-between">
                    <span className="text-4xl mb-2">🍕 Pizza</span>
                    <input
                      type="text"
                      placeholder="First word that comes to mind (e.g. Italian)"
                      value={answers["act1_2"] || ""}
                      onChange={(e) => handleInputChange("act1_2", e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-800"
                    />
                  </div>
                </>
              )}

              {isHealthyBodies && (
                <>
                  <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200/60">
                    <span className="text-4xl mb-2">🍎 Apple / Healthy food</span>
                    <input
                      type="text"
                      placeholder="First word that comes to mind (e.g. Health)"
                      value={answers["act1_1"] || ""}
                      onChange={(e) => handleInputChange("act1_1", e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl border bg-white dark:bg-slate-950 text-slate-800"
                    />
                  </div>
                  <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200/60">
                    <span className="text-4xl mb-2">🏋️ Exercise / Muscles</span>
                    <input
                      type="text"
                      placeholder="First word that comes to mind (e.g. Gym)"
                      value={answers["act1_2"] || ""}
                      onChange={(e) => handleInputChange("act1_2", e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl border bg-white dark:bg-slate-950 text-slate-800"
                    />
                  </div>
                </>
              )}

              {isGettingAround && (
                <>
                  <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200/60">
                    <span className="text-4xl mb-2">🚌 Bus</span>
                    <input
                      type="text"
                      placeholder="e.g. Route"
                      value={answers["act1_1"] || ""}
                      onChange={(e) => handleInputChange("act1_1", e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl border bg-white dark:bg-slate-950"
                    />
                  </div>
                  <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200/60">
                    <span className="text-4xl mb-2">🚲 Bicycle</span>
                    <input
                      type="text"
                      placeholder="e.g. Park"
                      value={answers["act1_2"] || ""}
                      onChange={(e) => handleInputChange("act1_2", e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl border bg-white dark:bg-slate-950"
                    />
                  </div>
                </>
              )}

              {!isEatingOutClassic && !isEatingOutModern && !isHealthyBodies && !isGettingAround && (
                <>
                  <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200/60">
                    <span className="text-4xl mb-2">⭐ Unit Core Concept</span>
                    <input
                      type="text"
                      placeholder="First word"
                      value={answers["act1_1"] || ""}
                      onChange={(e) => handleInputChange("act1_1", e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl border bg-white"
                    />
                  </div>
                  <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200/60">
                    <span className="text-4xl mb-2">✨ Second Concept</span>
                    <input
                      type="text"
                      placeholder="Your blend"
                      value={answers["act1_2"] || ""}
                      onChange={(e) => handleInputChange("act1_2", e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl border bg-white"
                    />
                  </div>
                </>
              )}
            </div>
            {isHealthyBodies && renderMatchActivity()}
          </div>

          {/* ACTIVITY 2 */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
              <span className="px-2.5 py-0.5 bg-emerald-600 text-white rounded-md font-mono text-xs font-bold">ACT. 2</span>
              <h2 className="font-bold text-base md:text-lg text-slate-900 dark:text-white">Blend It / Word Detective</h2>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-xs italic">
              Combine and blend word prefixes or components to make brand-new terms and explain their definitions!
            </p>

            <div className="p-5 bg-slate-50 dark:bg-slate-900/50 rounded-2xl space-y-4">
              {isEatingOutClassic && (
                <div className="space-y-3">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <span className="text-xs font-bold text-slate-600 font-mono">snack + attack =</span>
                      <input
                        type="text"
                        placeholder="e.g. Snacktack - eating everything quickly"
                        value={answers["act2_1"] || ""}
                        onChange={(e) => handleInputChange("act2_1", e.target.value)}
                        className="w-full text-xs p-2 rounded-lg border mt-1"
                      />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-600 font-mono">menu + mystery =</span>
                      <input
                        type="text"
                        placeholder="Your blend + meaning..."
                        value={answers["act2_2"] || ""}
                        onChange={(e) => handleInputChange("act2_2", e.target.value)}
                        className="w-full text-xs p-2 rounded-lg border mt-1"
                      />
                    </div>
                  </div>
                </div>
              )}

              {isAmazingAnimals && (
                <div className="space-y-3">
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl text-xs text-slate-600">
                    Unit combinations: cold &bull; warm &bull; night &bull; water &bull; blooded &bull; proof &bull; life &bull; owl
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono uppercase font-bold text-slate-500">Word 1 + Word 2</span>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="cold"
                          value={selectedWord1}
                          onChange={(e) => setSelectedWord1(e.target.value)}
                          className="w-2/5 text-xs p-2 rounded-lg border text-center"
                        />
                        <span className="text-lg">+</span>
                        <input
                          type="text"
                          placeholder="blooded"
                          value={selectedWord2}
                          onChange={(e) => setSelectedWord2(e.target.value)}
                          className="w-2/5 text-xs p-2 rounded-lg border text-center"
                        />
                      </div>
                      <button
                        onClick={() => checkCompoundRow(1, selectedWord1, selectedWord2)}
                        className="w-full mt-2 py-1 px-3 bg-amber-500 text-white font-bold rounded-lg text-[10px]"
                      >
                        Verify
                      </button>
                      {compoundsChecked[1] && (
                        <p className="text-[10px] text-emerald-600 font-mono mt-1">{compoundResults[1]}</p>
                      )}
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono uppercase font-bold text-slate-500">Your invented word</span>
                      <input
                        type="text"
                        placeholder="e.g. featherquick"
                        value={answers["act2_invented"] || ""}
                        onChange={(e) => handleInputChange("act2_invented", e.target.value)}
                        className="w-full text-xs p-2 rounded-lg border"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono uppercase font-bold text-slate-500">Its meaning</span>
                      <input
                        type="text"
                        placeholder="Feathers flying quickly..."
                        value={answers["act2_invented_meaning"] || ""}
                        onChange={(e) => handleInputChange("act2_invented_meaning", e.target.value)}
                        className="w-full text-xs p-2 rounded-lg border"
                      />
                    </div>
                  </div>
                </div>
              )}

              {!isEatingOutClassic && !isAmazingAnimals && (
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-600">Create new term (Invent new term):</span>
                  <input
                    type="text"
                    placeholder="Write a combination of words related to the topic or your own blend..."
                    value={answers["act2_common"] || ""}
                    onChange={(e) => handleInputChange("act2_common", e.target.value)}
                    className="w-full text-xs p-3 bg-white dark:bg-slate-950 text-slate-800 rounded-xl border border-slate-200"
                  />
                </div>
              )}
            </div>
          </div>

          {/* ACTIVITY 3 */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
              <span className="px-2.5 py-0.5 bg-emerald-600 text-white rounded-md font-mono text-xs font-bold">ACT. 3</span>
              <h2 className="font-bold text-base md:text-lg text-slate-900 dark:text-white">Invent Your Own Idiom</h2>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-xs italic">
              Create a non-literal colorful expression connected to the topic and explain its usage.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-50 dark:bg-slate-900 p-5 rounded-2xl">
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-slate-700">My idiom:</span>
                <input
                  type="text"
                  placeholder="e.g. As busy as a boiling soup"
                  value={answers["act3_idiom"] || ""}
                  onChange={(e) => handleInputChange("act3_idiom", e.target.value)}
                  className="w-full text-xs p-2.5 bg-white dark:bg-slate-950 rounded-xl border"
                />
              </div>
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-slate-700">Idiom's meaning:</span>
                <input
                  type="text"
                  placeholder="e.g. Extremely busy or heated up"
                  value={answers["act3_meaning"] || ""}
                  onChange={(e) => handleInputChange("act3_meaning", e.target.value)}
                  className="w-full text-xs p-2.5 bg-white dark:bg-slate-950 rounded-xl border"
                />
              </div>
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-slate-700">Usage in a sentence:</span>
                <input
                  type="text"
                  placeholder="She is as busy as a boiling soup today."
                  value={answers["act3_sentence"] || ""}
                  onChange={(e) => handleInputChange("act3_sentence", e.target.value)}
                  className="w-full text-xs p-2.5 bg-white dark:bg-slate-950 rounded-xl border"
                />
              </div>
            </div>
          </div>

          {/* ACTIVITY 4 */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
              <span className="px-2.5 py-0.5 bg-emerald-600 text-white rounded-md font-mono text-xs font-bold">ACT. 4</span>
              <h2 className="font-bold text-base md:text-lg text-slate-900 dark:text-white">Comic Strip & Dialogue</h2>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-xs italic">
              Choose or write funny, creative dialogue boxes for these surprising or comical scenes.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border flex flex-col justify-between">
                <span className="font-bold text-xs text-indigo-700 dark:text-indigo-400 font-mono block mb-2">
                  🎭 Scene 1: Unexpected Error
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-3 leading-normal">
                  You were served a dish or an item you did not order at all.
                </p>
                <textarea
                  placeholder="Write dialogue..."
                  value={answers["act4_sc1"] || ""}
                  onChange={(e) => handleInputChange("act4_sc1", e.target.value)}
                  className="w-full text-xs p-2 bg-white dark:bg-slate-950 rounded-xl border"
                  rows={3}
                />
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border flex flex-col justify-between">
                <span className="font-bold text-xs text-indigo-700 dark:text-indigo-400 font-mono block mb-2">
                  🌶️ Scene 2: Spicy friendship
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-3 leading-normal">
                  Your friend accidentally bit into a very hot chili pepper.
                </p>
                <textarea
                  placeholder="Write dialogue..."
                  value={answers["act4_sc2"] || ""}
                  onChange={(e) => handleInputChange("act4_sc2", e.target.value)}
                  className="w-full text-xs p-2 bg-white dark:bg-slate-950 rounded-xl border"
                  rows={3}
                />
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border flex flex-col justify-between">
                <span className="font-bold text-xs text-indigo-700 dark:text-indigo-400 font-mono block mb-2">
                  🎂 Scene 3: Surprise Gift
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-3 leading-normal">
                  You were unexpectedly presented with a free cake or special gift.
                </p>
                <textarea
                  placeholder="Write dialogue..."
                  value={answers["act4_sc3"] || ""}
                  onChange={(e) => handleInputChange("act4_sc3", e.target.value)}
                  className="w-full text-xs p-2 bg-white dark:bg-slate-950 rounded-xl border"
                  rows={3}
                />
              </div>
            </div>
          </div>

          {/* ACTIVITY 5 */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
              <span className="px-2.5 py-0.5 bg-emerald-600 text-white rounded-md font-mono text-xs font-bold">ACT. 5</span>
              <h2 className="font-bold text-base md:text-lg text-slate-900 dark:text-white">Acrostic Poem</h2>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-xs italic">
              Write a phrase for each letter matching the word: **S-C-H-O-O-L** or **F-A-M-I-L-Y** or topic-specific letters.
            </p>

            <div className="space-y-3 bg-slate-50 dark:bg-slate-900/60 p-5 rounded-2xl max-w-xl mx-auto">
              {isFamilies ? (
                ["F", "A", "M", "I", "L", "Y"].map((letter, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-pink-600 text-white font-bold flex items-center justify-center font-mono shrink-0">
                      {letter}
                    </span>
                    <input
                      type="text"
                      placeholder={`Phrase starting with ${letter}...`}
                      value={answers[`acro_${letter}`] || ""}
                      onChange={(e) => handleInputChange(`acro_${letter}`, e.target.value)}
                      className="w-full text-xs p-2 bg-white dark:bg-slate-950 rounded-lg border text-slate-800"
                    />
                  </div>
                ))
              ) : (
                ["S", "C", "H", "O", "O", "L"].map((letter, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-emerald-600 text-white font-bold flex items-center justify-center font-mono shrink-0">
                      {letter}
                    </span>
                    <input
                      type="text"
                      placeholder={`Phrase starting with ${letter}...`}
                      value={answers[`acro_${letter}`] || ""}
                      onChange={(e) => handleInputChange(`acro_${letter}`, e.target.value)}
                      className="w-full text-xs p-2 bg-white dark:bg-slate-950 rounded-lg border text-slate-800"
                    />
                  </div>
                ))
              )}
            </div>
          </div>

          {/* ACTIVITY 6 - Drawing Canvas */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
              <span className="px-2.5 py-0.5 bg-emerald-600 text-white rounded-md font-mono text-xs font-bold">ACT. 6</span>
              <h2 className="font-bold text-base md:text-lg text-slate-900 dark:text-white">Design & Canvas Drawing</h2>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-xs italic">
              Sketch your custom hybrid animal, restaurant menu, or family crest directly on the digital pad!
            </p>

            <div className="space-y-4">
              <div className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl p-4 bg-white dark:bg-slate-900 shadow-inner">
                {/* Draw Palette Controls */}
                <div className="flex items-center justify-between mb-3 flex-wrap gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <PenTool className="w-4 h-4 text-emerald-600" />
                    <span className="font-bold text-slate-700">Brush Color:</span>
                    <div className="flex gap-1.5">
                      {["#1e5a44", "#e8734a", "#3e8fb0", "#e8b93f", "#111827"].map((color) => (
                        <button
                          key={color}
                          onClick={() => setBrushColor(color)}
                          className={`w-6 h-6 rounded-full border border-white/20 transition-all ${
                            brushColor === color ? "ring-2 ring-emerald-500 scale-110" : ""
                          }`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={clearCanvas}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg flex items-center gap-1 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Clear Canvas
                  </button>
                </div>

                {/* Drawing Surface */}
                <canvas
                  ref={canvasRef}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-150 rounded-2xl cursor-crosshair h-60 touch-none shadow-sm"
                />
              </div>

              {/* Extra input details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-slate-600 block">Created Name / Motto / Crest Name:</span>
                  <input
                    type="text"
                    placeholder="e.g. My hybrid name / SpiceCraft / motto word"
                    value={answers["act6_crest_name"] || ""}
                    onChange={(e) => handleInputChange("act6_crest_name", e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border bg-white dark:bg-slate-950 text-slate-800"
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold text-slate-600 block">Details / Description (use connectors):</span>
                  <textarea
                    placeholder="Use connectors: although, because, so that, not only... but also..."
                    value={answers["act6_crest_desc"] || ""}
                    onChange={(e) => handleInputChange("act6_crest_desc", e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border bg-white dark:bg-slate-950 text-slate-800"
                    rows={2}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ACTIVITY 7 */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
              <span className="px-2.5 py-0.5 bg-emerald-600 text-white rounded-md font-mono text-xs font-bold">ACT. 7</span>
              <h2 className="font-bold text-base md:text-lg text-slate-900 dark:text-white">Self-Assessment</h2>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-xs italic">
              Rate your confidence with English word blending and idioms learned today.
            </p>

            <div className="space-y-2">
              {renderSmileyRow("rate_1", "I can create new English words by blending two terms.")}
              {renderSmileyRow("rate_2", "I can invent my own idiom or custom expression in English.")}
              {renderSmileyRow("rate_3", "I can write short creative texts, poems, and humorous dialogues.")}
              {renderSmileyRow("rate_4", "I truly enjoyed today's linguacreative interactive worksheet.")}
            </div>
          </div>

          {/* SUBMIT BUTTONS & MOCK AI ANALYSIS */}
          <div className="pt-6 border-t border-slate-150 dark:border-slate-800 flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="text-xs text-slate-400 font-mono">
              © 2026 LingoCraft &bull; Interactive Learning Platform
            </div>

            <div className="flex gap-3">
              <button
                onClick={runAIAnalysis}
                disabled={isAnalyzing}
                className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-550 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>AI Evaluating...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 animate-pulse text-amber-300" />
                    <span>🤖 AI Analyze All Answers</span>
                  </>
                )}
              </button>

              <button
                onClick={onClose}
                className="px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wider rounded-xl transition-all active:scale-95 border"
              >
                Close
              </button>
            </div>
          </div>

          {/* AI ANALYSIS RESULTS EXPANDABLE PANEL */}
          {aiAnalysisResult && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-4"
              id="ai-analysis-results"
            >
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <h3 className="font-mono text-xs uppercase tracking-wider">🤖 AI Teacher Feedback & Analysis</h3>
              </div>
              <div className="text-slate-700 dark:text-slate-300 text-xs md:text-sm leading-relaxed whitespace-pre-wrap font-sans">
                {aiAnalysisResult}
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </div>
  );
}
