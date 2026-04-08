import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  Trophy, 
  RefreshCw, 
  Sparkles,
  CheckCircle2,
  XCircle,
  Play,
  Star,
  Clock,
  Zap,
  ClipboardList,
  Smile,
  Users
} from 'lucide-react';

// --- Types ---
interface TenerChallenge {
  id: number;
  context: string; // Desire or Obligation
  hyContext: string;
  sentence: string;
  hySentence: string;
  options: string[];
  correct: string;
  icon: React.ReactNode;
}

// --- Data ---
const TENER_CHALLENGES: TenerChallenge[] = [
  {
    id: 1,
    context: "Obligation (Պարտականություն)",
    hyContext: "Մենք պետք է ուտելիք գնենք",
    sentence: "Nosotros ___ comprar comida.",
    hySentence: "Մենք պետք է ուտելիք գնենք:",
    options: ["tenemos ganas de", "tenemos que"],
    correct: "tenemos que",
    icon: <ClipboardList className="w-16 h-16 text-red-500" />
  },
  {
    id: 2,
    context: "Desire (Ցանկություն)",
    hyContext: "Ես ուզում եմ երաժշտություն լսել",
    sentence: "Yo ___ escuchar música.",
    hySentence: "Ես երաժշտություն լսելու ցանկություն ունեմ:",
    options: ["tengo ganas de", "tengo que"],
    correct: "tengo ganas de",
    icon: <Play className="w-16 h-16 text-yellow-400" />
  },
  {
    id: 3,
    context: "Obligation (Պարտականություն)",
    hyContext: "Նա պետք է բժշկի գնա",
    sentence: "Ella ___ ir al médico.",
    hySentence: "Նա պետք է բժշկի գնա:",
    options: ["tiene ganas de", "tiene que"],
    correct: "tiene que",
    icon: <Heart className="w-16 h-16 text-orange-500" />
  },
  {
    id: 4,
    context: "Desire (Ցանկություն)",
    hyContext: "Դու ուզում ես ֆուտբոլ խաղալ",
    sentence: "Tú ___ jugar al fútbol.",
    hySentence: "Դու ֆուտբոլ խաղալու ցանկություն ունես:",
    options: ["tienes ganas de", "tienes que"],
    correct: "tienes ganas de",
    icon: <Zap className="w-16 h-16 text-red-500" />
  },
  {
    id: 5,
    context: "Obligation (Պարտականություն)",
    hyContext: "Նրանք պետք է հաշիվը վճարեն",
    sentence: "Ellos ___ pagar la cuenta.",
    hySentence: "Նրանք պետք է վճարեն հաշիվը:",
    options: ["tienen ganas de", "tienen que"],
    correct: "tienen que",
    icon: <ClipboardList className="w-16 h-16 text-yellow-400" />
  },
  {
    id: 6,
    context: "Desire (Ցանկություն)",
    hyContext: "Մենք ուզում ենք պաղպաղակ ուտել",
    sentence: "Nosotros ___ tomar un helado.",
    hySentence: "Մենք պաղպաղակ ուտելու ցանկություն ունենք:",
    options: ["tenemos ganas de", "tenemos que"],
    correct: "tenemos ganas de",
    icon: <Smile className="w-16 h-16 text-orange-500" />
  },
  {
    id: 7,
    context: "Obligation (Պարտականություն)",
    hyContext: "Ես պետք է շուտ արթնանամ",
    sentence: "Yo ___ levantarme temprano.",
    hySentence: "Ես պետք է շուտ արթնանամ:",
    options: ["tengo ganas de", "tengo que"],
    correct: "tengo que",
    icon: <Clock className="w-16 h-16 text-red-500" />
  },
  {
    id: 8,
    context: "Desire (Ցանկություն)",
    hyContext: "Նա ուզում է ֆիլմ դիտել",
    sentence: "Él ___ ver una película.",
    hySentence: "Նա ֆիլմ դիտելու ցանկություն ունի:",
    options: ["tiene ganas de", "tiene que"],
    correct: "tiene ganas de",
    icon: <Play className="w-16 h-16 text-yellow-400" />
  },
  {
    id: 9,
    context: "Obligation (Պարտականություն)",
    hyContext: "Դուք պետք է նամակ գրեք",
    sentence: "Ustedes ___ escribir una carta.",
    hySentence: "Դուք պետք է նամակ գրեք:",
    options: ["tienen ganas de", "tienen que"],
    correct: "tienen que",
    icon: <ClipboardList className="w-16 h-16 text-orange-500" />
  },
  {
    id: 10,
    context: "Desire (Ցանկություն)",
    hyContext: "Նրանք ուզում են ընկերների հետ դուրս գալ",
    sentence: "Ellas ___ salir con amigos.",
    hySentence: "Նրանք ընկերների հետ դուրս գալու ցանկություն ունեն:",
    options: ["tienen ganas de", "tienen que"],
    correct: "tienen ganas de",
    icon: <Users className="w-16 h-16 text-red-500" />
  }
];

export default function TenerExpressionsGame() {
  const [view, setView] = useState<'intro' | 'playing' | 'finish'>('intro');
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const currentChallenge = TENER_CHALLENGES[step];

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
      if (step < TENER_CHALLENGES.length - 1) {
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
    <div className="min-h-screen bg-white text-zinc-900 font-sans flex flex-col items-center justify-center p-4 md:p-8 overflow-hidden relative">
      {/* Cinematic Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-red-500/10 to-transparent" />
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-red-500/10 rounded-full blur-[120px]" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-yellow-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-500/10 rounded-full blur-[160px]" />
      </div>

      <AnimatePresence mode="wait">
        {view === 'intro' && (
          <motion.div 
            key="intro"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="bg-white/80 backdrop-blur-2xl rounded-[4rem] p-12 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)] border-4 border-zinc-100 text-center max-w-2xl z-10"
          >
            <div className="flex justify-center mb-8">
              <motion.div 
                animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="bg-red-600 p-8 rounded-[3rem] shadow-[0_20px_40px_rgba(239,68,68,0.3)] border-4 border-yellow-400"
              >
                <Zap className="w-20 h-20 text-white" />
              </motion.div>
            </div>
            
            <h1 className="text-7xl font-black uppercase tracking-tighter mb-4 leading-tight text-yellow-500 italic drop-shadow-sm">
              TENER <br /> <span className="text-red-600">EXPRESSIONS</span>
            </h1>
            <p className="text-xl text-zinc-500 font-bold italic mb-12">
              Սովորիր <span className="text-orange-600 font-black">Ganas de</span> (Ցանկություն) <br /> 
              և <span className="text-red-600 font-black">Que</span> (Պարտականություն) ձևերը:
            </p>

            <button 
              onClick={() => setView('playing')}
              className="px-16 py-8 bg-red-600 text-white rounded-full font-black text-3xl uppercase tracking-widest hover:bg-red-500 transition-all shadow-[0_0_40px_rgba(239,68,68,0.3)] border-4 border-yellow-400 active:scale-95 flex items-center gap-4 mx-auto"
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
            <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[3rem] border-2 border-zinc-100 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.05)] flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-red-600 rounded-3xl flex items-center justify-center shadow-lg border-2 border-yellow-400">
                  <Star className="w-10 h-10 text-white" />
                </div>
                <div>
                  <p className="font-black text-xs text-zinc-400 uppercase tracking-widest">ՄԻԱՎՈՐ</p>
                  <p className="text-4xl font-black text-red-600">{score}</p>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div className="bg-red-500/5 px-8 py-3 rounded-full font-black text-orange-600 text-sm uppercase tracking-[0.3em] border border-red-500/10 mb-4">
                  ՀԱՐՑ {step + 1} / {TENER_CHALLENGES.length}
                </div>
                <div className="w-64 h-2 bg-zinc-100 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 shadow-[0_0_20px_rgba(239,68,68,0.2)]"
                    initial={{ width: 0 }}
                    animate={{ width: `${((step + 1) / TENER_CHALLENGES.length) * 100}%` }}
                  />
                </div>
              </div>

              <div className="w-16 h-16 bg-zinc-50 rounded-3xl flex items-center justify-center border border-zinc-100">
                <Trophy className="w-8 h-8 text-yellow-500/50" />
              </div>
            </div>

            {/* Game Arena */}
            <div className="bg-white/60 backdrop-blur-2xl rounded-[4rem] p-12 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.08)] border-4 border-zinc-50 relative min-h-[600px] flex flex-col items-center justify-center overflow-hidden">
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
                      animate={{ y: [0, -10, 0] }}
                      transition={{ repeat: Infinity, duration: 3 }}
                      className="inline-block p-10 bg-zinc-50 rounded-[3rem] mb-10 border border-zinc-100"
                    >
                      {currentChallenge.icon}
                    </motion.div>
                    
                    <h2 className="text-2xl font-black text-zinc-400 uppercase tracking-[0.4em] mb-4">
                      {currentChallenge.context}
                    </h2>
                    
                    {/* RED/YELLOW/ORANGE TEXT SENTENCE */}
                    <h3 className="text-5xl md:text-6xl font-black text-red-600 mb-6 leading-tight tracking-tight">
                      {currentChallenge.sentence.split("___").map((part, i, arr) => (
                        <React.Fragment key={i}>
                          {part}
                          {i < arr.length - 1 && <span className="text-yellow-500 mx-2">______</span>}
                        </React.Fragment>
                      ))}
                    </h3>

                    <p className="text-3xl text-zinc-500 font-bold italic mb-16">
                      {currentChallenge.hySentence}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mx-auto">
                      {currentChallenge.options.map((opt, i) => (
                        <button
                          key={i}
                          onClick={() => handleAnswer(opt)}
                          className="group relative py-12 rounded-[3.5rem] border-4 transition-all text-4xl font-black active:scale-95 shadow-xl bg-white border-zinc-100 text-zinc-800 hover:bg-red-600 hover:text-white hover:border-yellow-400"
                        >
                          {opt}
                          <div className="absolute inset-0 rounded-[3.5rem] bg-yellow-400/5 opacity-0 group-hover:opacity-100 transition-opacity" />
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
                        <div className="bg-emerald-500 p-14 rounded-full mb-10 shadow-[0_20px_40px_rgba(16,185,129,0.3)]">
                          <CheckCircle2 className="w-32 h-32 text-white" />
                        </div>
                        <h4 className="text-8xl font-black text-emerald-500 italic uppercase tracking-tighter animate-bounce">ՃԻՇՏ Է:</h4>
                        <p className="text-4xl font-black text-yellow-600 mt-10 tracking-tight">
                          {currentChallenge.sentence.replace("___", currentChallenge.correct)}
                        </p>
                      </>
                    ) : (
                      <>
                        <div className="bg-red-600 p-14 rounded-full mb-10 shadow-[0_20px_40px_rgba(239,68,68,0.3)] border-4 border-yellow-400">
                          <XCircle className="w-32 h-32 text-white" />
                        </div>
                        <h4 className="text-8xl font-black text-red-600 italic uppercase tracking-tighter">ՍԽԱԼ Է:</h4>
                        <p className="text-2xl font-bold text-zinc-400 mt-6 italic">Ճիշտ ձևն էր՝</p>
                        <p className="text-5xl font-black text-yellow-600 mt-4 tracking-tight">
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
            className="text-center bg-white/80 backdrop-blur-2xl p-16 rounded-[5rem] border-4 border-zinc-100 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.15)] max-w-3xl mx-auto relative z-10"
          >
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 bg-red-600 p-12 rounded-[3.5rem] border-8 border-white shadow-2xl rotate-12">
              <Trophy className="w-24 h-24 text-white" />
            </div>

            <h2 className="text-7xl font-black uppercase italic mb-12 mt-16 tracking-tighter text-yellow-500 drop-shadow-sm">
              ԽԱՂԻ ԱՎԱՐՏ
            </h2>

            <div className="bg-zinc-50 p-16 rounded-[4rem] border-4 border-red-600/10 shadow-inner mb-16">
              <p className="text-red-600 font-black text-3xl mb-4 uppercase italic tracking-widest">ՎԵՐՋՆԱԿԱՆ ՄԻԱՎՈՐ</p>
              <p className="text-9xl font-black text-yellow-500 drop-shadow-sm">{score} / {TENER_CHALLENGES.length}</p>
            </div>

            <button 
              onClick={restart}
              className="w-full py-10 bg-red-600 text-white rounded-full font-black text-4xl uppercase tracking-widest hover:bg-red-500 transition-all shadow-[0_20px_40px_rgba(239,68,68,0.3)] border-4 border-yellow-400 flex items-center justify-center gap-6"
            >
              <RefreshCw className="w-12 h-12" />
              ՆՈՐԻՑ ԽԱՂԱԼ
            </button>
            
            <div className="mt-16 flex justify-center gap-8">
              <Sparkles className="text-yellow-500 w-12 h-12" />
              <Heart className="text-red-600 w-12 h-12 fill-current" />
              <Sparkles className="text-orange-500 w-12 h-12" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress Indicator */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-white/80 backdrop-blur-md px-8 py-3 rounded-full border border-zinc-100 shadow-sm">
        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">
          TENER MASTER v2.0
        </span>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
        body { 
          font-family: 'Inter', sans-serif; 
          background: #ffffff;
          overflow-x: hidden;
        }
        ::selection {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
        }
      `}} />
    </div>
  );
}
