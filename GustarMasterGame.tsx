import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  User, 
  Trophy, 
  RefreshCw, 
  Sparkles,
  CheckCircle2,
  XCircle,
  Play,
  Apple,
  Pizza,
  IceCream,
  Coffee,
  UtensilsCrossed,
  Star,
  ChevronRight
} from 'lucide-react';

// --- Types ---
interface GustarChallenge {
  id: number;
  subject: string;
  hySubject: string;
  sentence: string;
  hySentence: string;
  options: string[];
  correct: string;
  image: React.ReactNode;
  isPlural: boolean;
}

// --- Data ---
const GUSTAR_CHALLENGES: GustarChallenge[] = [
  {
    id: 1,
    subject: "La manzana",
    hySubject: "Խնձորը",
    sentence: "Me ___ la manzana.",
    hySentence: "Ինձ դուր է գալիս խնձորը:",
    options: ["gusta", "gustan"],
    correct: "gusta",
    image: <Apple className="w-16 h-16 text-red-500" />,
    isPlural: false
  },
  {
    id: 2,
    subject: "Las manzanas",
    hySubject: "Խնձորները",
    sentence: "Me ___ las manzanas.",
    hySentence: "Ինձ դուր են գալիս խնձորները:",
    options: ["gusta", "gustan"],
    correct: "gustan",
    image: <div className="flex gap-1"><Apple className="w-10 h-10 text-red-500" /><Apple className="w-10 h-10 text-red-500" /></div>,
    isPlural: true
  },
  {
    id: 3,
    subject: "La pizza",
    hySubject: "Պիցցան",
    sentence: "A él le ___ la pizza.",
    hySentence: "Նրան դուր է գալիս պիցցան:",
    options: ["gusta", "gustan"],
    correct: "gusta",
    image: <Pizza className="w-16 h-16 text-orange-400" />,
    isPlural: false
  },
  {
    id: 4,
    subject: "Los helados",
    hySubject: "Պաղպաղակները",
    sentence: "A ella le ___ los helados.",
    hySentence: "Նրան դուր են գալիս պաղպաղակները:",
    options: ["gusta", "gustan"],
    correct: "gustan",
    image: <div className="flex gap-1"><IceCream className="w-10 h-10 text-pink-400" /><IceCream className="w-10 h-10 text-blue-400" /></div>,
    isPlural: true
  },
  {
    id: 5,
    subject: "El café",
    hySubject: "Սուրճը",
    sentence: "Nos ___ el café.",
    hySentence: "Մեզ դուր է գալիս սուրճը:",
    options: ["gusta", "gustan"],
    correct: "gusta",
    image: <Coffee className="w-16 h-16 text-amber-900" />,
    isPlural: false
  },
  {
    id: 6,
    subject: "Las frutas",
    hySubject: "Մրգերը",
    sentence: "Les ___ las frutas.",
    hySentence: "Նրանց դուր են գալիս մրգերը:",
    options: ["gusta", "gustan"],
    correct: "gustan",
    image: <div className="flex gap-1"><Apple className="w-10 h-10 text-red-500" /><Star className="w-10 h-10 text-yellow-400" /></div>,
    isPlural: true
  },
  {
    id: 7,
    subject: "El chocolate",
    hySubject: "Շոկոլադը",
    sentence: "Te ___ el chocolate.",
    hySentence: "Քեզ դուր է գալիս շոկոլադը:",
    options: ["gusta", "gustan"],
    correct: "gusta",
    image: <div className="w-16 h-16 bg-amber-900 rounded-lg shadow-inner" />,
    isPlural: false
  },
  {
    id: 8,
    subject: "Los libros",
    hySubject: "Գրքերը",
    sentence: "Me ___ mucho los libros.",
    hySentence: "Ինձ շատ են դուր գալիս գրքերը:",
    options: ["gusta", "gustan"],
    correct: "gustan",
    image: <div className="flex gap-1"><div className="w-8 h-12 bg-blue-500 rounded" /><div className="w-8 h-12 bg-red-500 rounded" /></div>,
    isPlural: true
  }
];

export default function GustarMasterGame() {
  const [view, setView] = useState<'intro' | 'playing' | 'finish'>('intro');
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const currentChallenge = GUSTAR_CHALLENGES[step];

  const handleAnswer = (option: string) => {
    if (feedback) return;
    
    const isCorrect = option === currentChallenge.correct;
    if (isCorrect) {
      setFeedback('correct');
      setScore(prev => prev + 1);
    } else {
      setFeedback('wrong');
    }

    setTimeout(() => {
      if (step < GUSTAR_CHALLENGES.length - 1) {
        setStep(s => s + 1);
        setFeedback(null);
      } else {
        setView('finish');
      }
    }, 1500);
  };

  const restart = () => {
    setStep(0);
    setScore(0);
    setFeedback(null);
    setView('intro');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans flex flex-col items-center justify-center p-4 md:p-8 overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        <div className="absolute top-10 left-10 animate-pulse"><Heart className="w-32 h-32 text-orange-500" /></div>
        <div className="absolute bottom-10 right-10 animate-bounce"><UtensilsCrossed className="w-40 h-40 text-orange-500" /></div>
        <div className="absolute top-1/2 left-1/4 rotate-12"><Star className="w-24 h-24 text-orange-500" /></div>
      </div>

      <AnimatePresence mode="wait">
        {view === 'intro' && (
          <motion.div 
            key="intro"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="bg-zinc-900 rounded-[4rem] p-12 shadow-2xl border-8 border-zinc-800 text-center max-w-2xl z-10"
          >
            <div className="flex justify-center mb-8">
              <motion.div 
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="bg-orange-500 p-8 rounded-[3rem] shadow-[0_0_50px_rgba(249,115,22,0.4)]"
              >
                <Sparkles className="w-20 h-20 text-black" />
              </motion.div>
            </div>
            
            <h1 className="text-7xl font-black uppercase tracking-tighter mb-4 leading-tight text-orange-500 italic">
              GUSTAR <br /> <span className="text-white">ՎԱՐՊԵՏ</span>
            </h1>
            <p className="text-xl text-zinc-400 font-bold italic mb-12">
              Սովորիր <span className="text-orange-500">GUSTAR</span> բայը այս զվարճալի խաղի միջոցով: <br />
              Ընտրիր ճիշտ ձևը՝ <span className="text-orange-400">Gusta</span> թե <span className="text-orange-400">Gustan</span>:
            </p>

            <button 
              onClick={() => setView('playing')}
              className="px-16 py-8 bg-orange-500 text-black rounded-full font-black text-3xl uppercase tracking-widest hover:bg-orange-400 transition-all shadow-[0_0_40px_rgba(249,115,22,0.3)] active:scale-95 flex items-center gap-4 mx-auto"
            >
              <Play className="w-10 h-10 fill-current" />
              ՍԿՍԵԼ
            </button>
          </motion.div>
        )}

        {view === 'playing' && (
          <motion.div 
            key="playing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full max-w-5xl z-10 flex flex-col gap-8"
          >
            {/* Scoreboard */}
            <div className="bg-zinc-900/80 backdrop-blur-xl p-8 rounded-[3rem] border-4 border-zinc-800 shadow-2xl flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-orange-500 rounded-3xl flex items-center justify-center shadow-lg">
                  <Star className="w-10 h-10 text-black" />
                </div>
                <div>
                  <p className="font-black text-xs text-orange-500 uppercase tracking-widest">ՄԻԱՎՈՐ</p>
                  <p className="text-4xl font-black">{score}</p>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div className="bg-orange-500/10 px-8 py-3 rounded-full font-black text-orange-500 text-sm uppercase tracking-[0.3em] border border-orange-500/30 mb-4">
                  ՀԱՐՑ {step + 1} / {GUSTAR_CHALLENGES.length}
                </div>
                <div className="w-64 h-3 bg-zinc-800 rounded-full overflow-hidden border border-zinc-700">
                  <motion.div 
                    className="h-full bg-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.5)]"
                    initial={{ width: 0 }}
                    animate={{ width: `${((step + 1) / GUSTAR_CHALLENGES.length) * 100}%` }}
                  />
                </div>
              </div>

              <div className="w-16 h-16 bg-zinc-800 rounded-3xl flex items-center justify-center border-2 border-zinc-700">
                <Trophy className="w-8 h-8 text-zinc-500" />
              </div>
            </div>

            {/* Game Arena */}
            <div className="bg-zinc-900 rounded-[4rem] p-12 shadow-2xl border-8 border-zinc-800 relative min-h-[600px] flex flex-col items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                {!feedback ? (
                  <motion.div 
                    key={step}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -50, opacity: 0 }}
                    className="text-center w-full"
                  >
                    <motion.div 
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ repeat: Infinity, duration: 4 }}
                      className="inline-block p-10 bg-zinc-800 rounded-[3rem] mb-10 shadow-2xl border-4 border-zinc-700"
                    >
                      {currentChallenge.image}
                    </motion.div>
                    
                    <h2 className="text-3xl font-black text-zinc-500 uppercase tracking-[0.4em] mb-4">
                      {currentChallenge.subject}
                    </h2>
                    
                    {/* ORANGE TEXT SENTENCE */}
                    <h3 className="text-5xl md:text-6xl font-black text-orange-500 mb-6 leading-tight tracking-tight">
                      {currentChallenge.sentence.split("___").map((part, i, arr) => (
                        <React.Fragment key={i}>
                          {part}
                          {i < arr.length - 1 && <span className="text-zinc-700 mx-2">______</span>}
                        </React.Fragment>
                      ))}
                    </h3>

                    <p className="text-3xl text-zinc-400 font-bold italic mb-16">
                      {currentChallenge.hySentence}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl mx-auto">
                      {currentChallenge.options.map((opt, i) => (
                        <button
                          key={i}
                          onClick={() => handleAnswer(opt)}
                          className="group relative py-12 rounded-[3.5rem] border-4 transition-all text-5xl font-black active:scale-95 shadow-2xl bg-zinc-800/50 border-zinc-700 text-white hover:bg-zinc-700 hover:border-orange-500/50"
                        >
                          {opt}
                          <div className="absolute inset-0 rounded-[3rem] bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="feedback"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center"
                  >
                    {feedback === 'correct' ? (
                      <>
                        <div className="bg-emerald-500 p-14 rounded-full mb-10 shadow-[0_0_60px_rgba(16,185,129,0.4)]">
                          <CheckCircle2 className="w-32 h-32 text-white" />
                        </div>
                        <h4 className="text-8xl font-black text-emerald-400 italic uppercase tracking-tighter animate-bounce">ՃԻՇՏ Է:</h4>
                        <p className="text-4xl font-black text-orange-500 mt-10 tracking-tight">
                          {currentChallenge.sentence.replace("___", currentChallenge.correct)}
                        </p>
                      </>
                    ) : (
                      <>
                        <div className="bg-rose-500 p-14 rounded-full mb-10 shadow-[0_0_60px_rgba(244,63,94,0.4)]">
                          <XCircle className="w-32 h-32 text-white" />
                        </div>
                        <h4 className="text-8xl font-black text-rose-400 italic uppercase tracking-tighter">ՍԽԱԼ Է:</h4>
                        <p className="text-2xl font-bold text-zinc-500 mt-6 italic">Ճիշտ ձևն էր՝</p>
                        <p className="text-5xl font-black text-orange-500 mt-4 tracking-tight">
                          {currentChallenge.correct}
                        </p>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {view === 'finish' && (
          <motion.div 
            key="finish"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center bg-zinc-900 p-16 rounded-[5rem] border-8 border-zinc-800 shadow-2xl max-w-3xl mx-auto relative z-10"
          >
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 bg-orange-500 p-12 rounded-[3.5rem] border-8 border-zinc-900 shadow-2xl rotate-12">
              <Trophy className="w-24 h-24 text-black" />
            </div>

            <h2 className="text-7xl font-black uppercase italic mb-12 mt-16 tracking-tighter text-white">
              ԽԱՂԻ ԱՎԱՐՏ
            </h2>

            <div className="bg-black/40 p-16 rounded-[4rem] border-4 border-orange-500/30 shadow-inner mb-16">
              <p className="text-orange-500 font-black text-3xl mb-4 uppercase italic tracking-widest">ՎԵՐՋՆԱԿԱՆ ՄԻԱՎՈՐ</p>
              <p className="text-9xl font-black">{score} / {GUSTAR_CHALLENGES.length}</p>
            </div>

            <button 
              onClick={restart}
              className="w-full py-10 bg-orange-500 text-black rounded-full font-black text-4xl uppercase tracking-widest hover:bg-orange-400 transition-all shadow-[0_20px_50px_rgba(249,115,22,0.3)] flex items-center justify-center gap-6"
            >
              <RefreshCw className="w-12 h-12" />
              ՆՈՐԻՑ ԽԱՂԱԼ
            </button>
            
            <div className="mt-16 flex justify-center gap-8">
              <Sparkles className="text-orange-400 w-12 h-12" />
              <Heart className="text-rose-500 w-12 h-12 fill-current" />
              <Sparkles className="text-orange-400 w-12 h-12" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress Indicator */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-zinc-900/80 backdrop-blur-md px-8 py-3 rounded-full border border-zinc-800 shadow-2xl">
        <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">
          GUSTAR MASTER v1.0
        </span>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
        body { 
          font-family: 'Inter', sans-serif; 
          background: #0a0a0a;
          overflow-x: hidden;
        }
        ::selection {
          background: rgba(249, 115, 22, 0.3);
          color: white;
        }
      `}} />
    </div>
  );
}
