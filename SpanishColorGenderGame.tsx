import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Palette, 
  User, 
  Trophy, 
  RefreshCw, 
  Sparkles,
  CheckCircle2,
  XCircle,
  Heart,
  Play,
  Star,
  Zap,
  Info
} from 'lucide-react';

// --- Types ---
type Player = 'Gor' | 'Gayane';

interface ColorChallenge {
  id: number;
  noun: string;
  hyNoun: string;
  gender: 'M' | 'F';
  targetColor: string;
  hyColor: string;
  options: string[];
  correct: string;
  hex: string;
}

// --- Data ---
const COLOR_CHALLENGES: ColorChallenge[] = [
  {
    id: 1,
    noun: "La manzana",
    hyNoun: "Խնձորը",
    gender: 'F',
    targetColor: "Red",
    hyColor: "Կարմիր",
    options: ["rojo", "roja"],
    correct: "roja",
    hex: "#EF4444"
  },
  {
    id: 2,
    noun: "El coche",
    hyNoun: "Մեքենան",
    gender: 'M',
    targetColor: "Red",
    hyColor: "Կարմիր",
    options: ["rojo", "roja"],
    correct: "rojo",
    hex: "#EF4444"
  },
  {
    id: 3,
    noun: "La casa",
    hyNoun: "Տունը",
    gender: 'F',
    targetColor: "White",
    hyColor: "Սպիտակ",
    options: ["blanco", "blanca"],
    correct: "blanca",
    hex: "#FFFFFF"
  },
  {
    id: 4,
    noun: "El libro",
    hyNoun: "Գիրքը",
    gender: 'M',
    targetColor: "Black",
    hyColor: "Սև",
    options: ["negro", "negra"],
    correct: "negro",
    hex: "#000000"
  },
  {
    id: 5,
    noun: "La flor",
    hyNoun: "Ծաղիկը",
    gender: 'F',
    targetColor: "Yellow",
    hyColor: "Դեղին",
    options: ["amarillo", "amarilla"],
    correct: "amarilla",
    hex: "#FACC15"
  },
  {
    id: 6,
    noun: "El sol",
    hyNoun: "Արևը",
    gender: 'M',
    targetColor: "Yellow",
    hyColor: "Դեղին",
    options: ["amarillo", "amarilla"],
    correct: "amarillo",
    hex: "#FACC15"
  },
  {
    id: 7,
    noun: "La mesa",
    hyNoun: "Սեղանը",
    gender: 'F',
    targetColor: "Purple",
    hyColor: "Մանուշակագույն",
    options: ["morado", "morada"],
    correct: "morada",
    hex: "#A855F7"
  },
  {
    id: 8,
    noun: "El gato",
    hyNoun: "Կատուն",
    gender: 'M',
    targetColor: "Grey",
    hyColor: "Մոխրագույն",
    options: ["gris", "grisa"],
    correct: "gris",
    hex: "#94A3B8"
  },
  {
    id: 9,
    noun: "La silla",
    hyNoun: "Աթոռը",
    gender: 'F',
    targetColor: "Green",
    hyColor: "Կանաչ",
    options: ["verde", "verda"],
    correct: "verde",
    hex: "#22C55E"
  },
  {
    id: 10,
    noun: "El perro",
    hyNoun: "Շունը",
    gender: 'M',
    targetColor: "Brown",
    hyColor: "Շագանակագույն",
    options: ["marrón", "marrona"],
    correct: "marrón",
    hex: "#78350F"
  }
];

// Shuffle utility
const shuffle = (array: any[]) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export default function SpanishColorGenderGame() {
  const [view, setView] = useState<'intro' | 'playing' | 'finish'>('intro');
  const [step, setStep] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState<Player>('Gor');
  const [scores, setScores] = useState({ Gor: 0, Gayane: 0 });
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [shuffledChallenges, setShuffledChallenges] = useState<ColorChallenge[]>([]);
  const [winner, setWinner] = useState<Player | 'Draw' | null>(null);

  useEffect(() => {
    if (view === 'playing' && step === 0) {
      setShuffledChallenges(shuffle(COLOR_CHALLENGES));
    }
  }, [view, step]);

  const currentChallenge = shuffledChallenges[step];

  const handleAnswer = (option: string) => {
    if (feedback || !currentChallenge) return;
    
    const isCorrect = option === currentChallenge.correct;
    if (isCorrect) {
      setFeedback('correct');
      setScores(prev => ({ ...prev, [currentPlayer]: prev[currentPlayer] + 1 }));
    } else {
      setFeedback('wrong');
    }

    setTimeout(() => {
      if (step < shuffledChallenges.length - 1) {
        setStep(s => s + 1);
        setCurrentPlayer(p => p === 'Gor' ? 'Gayane' : 'Gor');
        setFeedback(null);
      } else {
        const finalGor = scores.Gor + (currentPlayer === 'Gor' && isCorrect ? 1 : 0);
        const finalGayane = scores.Gayane + (currentPlayer === 'Gayane' && isCorrect ? 1 : 0);
        if (finalGor > finalGayane) setWinner('Gor');
        else if (finalGayane > finalGor) setWinner('Gayane');
        else setWinner('Draw');
        setView('finish');
      }
    }, 1500);
  };

  const restart = () => {
    setStep(0);
    setCurrentPlayer('Gor');
    setScores({ Gor: 0, Gayane: 0 });
    setFeedback(null);
    setView('intro');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-4 md:p-8 flex flex-col items-center justify-center overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        <Palette className="absolute top-10 left-10 w-32 h-32 text-indigo-200 rotate-12" />
        <Palette className="absolute bottom-10 right-10 w-40 h-40 text-rose-200 -rotate-12" />
      </div>

      <AnimatePresence mode="wait">
        {view === 'intro' && (
          <motion.div 
            key="intro"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="bg-white rounded-[4rem] p-12 shadow-2xl border-8 border-indigo-50 text-center max-w-2xl z-10"
          >
            <div className="flex justify-center gap-8 mb-8">
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="bg-indigo-500 p-6 rounded-[2rem] shadow-xl"
              >
                <User className="w-16 h-16 text-white" />
                <p className="text-white font-black mt-2 uppercase tracking-widest">ԳՈՌ</p>
              </motion.div>
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
                className="bg-rose-500 p-6 rounded-[2rem] shadow-xl"
              >
                <User className="w-16 h-16 text-white" />
                <p className="text-white font-black mt-2 uppercase tracking-widest">ԳԱՅԱՆԵ</p>
              </motion.div>
            </div>
            
            <h1 className="text-6xl font-black uppercase tracking-tighter mb-4 leading-tight text-slate-900">
              ԳՈՒՅՆԵՐԻ <br /> <span className="text-indigo-600">ԱՇԽԱՐՀ</span>
            </h1>
            <p className="text-xl text-slate-400 font-bold italic mb-12">
              Սովորիր իսպաներեն գույների <br /> արական և իգական ձևերը:
            </p>

            <div className="bg-indigo-50 p-6 rounded-3xl mb-12 flex items-start gap-4 text-left">
              <Info className="w-8 h-8 text-indigo-500 shrink-0 mt-1" />
              <p className="text-indigo-900/70 font-medium leading-relaxed">
                Իսպաներենում գույները փոխվում են ըստ առարկայի սեռի: <br />
                Օրինակ՝ <span className="font-black">Rojo</span> (արական) և <span className="font-black">Roja</span> (իգական):
              </p>
            </div>

            <button 
              onClick={() => setView('playing')}
              className="px-16 py-8 bg-indigo-600 text-white rounded-full font-black text-3xl uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl active:scale-95 flex items-center gap-4 mx-auto"
            >
              <Play className="w-10 h-10 fill-current" />
              ՍԿՍԵԼ
            </button>
          </motion.div>
        )}

        {view === 'playing' && currentChallenge && (
          <motion.div 
            key="playing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full max-w-4xl z-10 flex flex-col gap-8"
          >
            {/* Scoreboard */}
            <div className="bg-white/80 backdrop-blur-md p-8 rounded-[3rem] border-4 border-white shadow-xl flex justify-between items-center">
              <div className={`flex items-center gap-4 transition-all ${currentPlayer === 'Gor' ? 'scale-110' : 'opacity-40'}`}>
                <div className="w-14 h-14 bg-indigo-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="font-black text-xs text-indigo-600 uppercase">ԳՈՌ</p>
                  <p className="text-3xl font-black">{scores.Gor}</p>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div className="bg-indigo-100 px-6 py-2 rounded-full font-black text-indigo-700 text-sm uppercase tracking-widest mb-2">
                  ՀԱՐՑ {step + 1} / {shuffledChallenges.length}
                </div>
                <div className="w-48 h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                  <motion.div 
                    className="h-full bg-indigo-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${((step + 1) / shuffledChallenges.length) * 100}%` }}
                  />
                </div>
              </div>

              <div className={`flex items-center gap-4 transition-all ${currentPlayer === 'Gayane' ? 'scale-110' : 'opacity-40'}`}>
                <div className="text-right">
                  <p className="font-black text-xs text-rose-600 uppercase">ԳԱՅԱՆԵ</p>
                  <p className="text-3xl font-black">{scores.Gayane}</p>
                </div>
                <div className="w-14 h-14 bg-rose-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <User className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>

            {/* Challenge Arena */}
            <div className="bg-white rounded-[4rem] p-12 shadow-2xl border-8 border-white relative min-h-[550px] flex flex-col items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                {!feedback ? (
                  <motion.div 
                    key={step}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -50, opacity: 0 }}
                    className="text-center w-full"
                  >
                    <div className="flex flex-col items-center mb-8">
                      <div 
                        className="w-32 h-32 rounded-[2.5rem] shadow-2xl mb-6 flex items-center justify-center border-8 border-white"
                        style={{ backgroundColor: currentChallenge.hex }}
                      >
                        <Palette className={`w-16 h-16 ${currentChallenge.hex === '#FFFFFF' ? 'text-slate-200' : 'text-white/50'}`} />
                      </div>
                      <h2 className="text-5xl font-black text-slate-800 mb-2">
                        {currentChallenge.noun}
                      </h2>
                      <p className="text-2xl text-slate-400 font-bold italic">
                        ({currentChallenge.hyNoun})
                      </p>
                    </div>
                    
                    <div className="bg-slate-50 p-8 rounded-3xl border-2 border-slate-100 mb-12">
                      <h3 className="text-3xl font-black text-slate-700 uppercase tracking-widest mb-2">
                        Ընտրիր ճիշտ գույնը:
                      </h3>
                      <p className="text-xl text-indigo-600 font-bold">
                        Գույնը՝ {currentChallenge.hyColor}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl mx-auto">
                      {currentChallenge.options.map((opt, i) => (
                        <button
                          key={i}
                          onClick={() => handleAnswer(opt)}
                          className={`py-8 rounded-[2.5rem] border-4 transition-all text-4xl font-black active:scale-95 shadow-xl ${
                            currentPlayer === 'Gor' ? 'bg-indigo-50 border-indigo-100 text-indigo-900 hover:bg-indigo-100' : 'bg-rose-50 border-rose-100 text-rose-900 hover:bg-rose-100'
                          }`}
                        >
                          {opt}
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
                        <div className="bg-emerald-500 p-12 rounded-full mb-8 shadow-2xl">
                          <CheckCircle2 className="w-32 h-32 text-white" />
                        </div>
                        <h4 className="text-7xl font-black text-emerald-600 italic uppercase tracking-tighter animate-bounce">ՃԻՇՏ Է:</h4>
                        <p className="text-4xl font-black text-slate-800 mt-8">
                          {currentChallenge.noun} <span className="text-indigo-600">{currentChallenge.correct}</span>
                        </p>
                      </>
                    ) : (
                      <>
                        <div className="bg-rose-500 p-12 rounded-full mb-8 shadow-2xl">
                          <XCircle className="w-32 h-32 text-white" />
                        </div>
                        <h4 className="text-7xl font-black text-rose-600 italic uppercase tracking-tighter">ՍԽԱԼ Է:</h4>
                        <p className="text-2xl font-bold text-slate-400 mt-4 italic">Ճիշտ ձևն էր՝</p>
                        <p className="text-4xl font-black text-indigo-600 mt-2">
                          {currentChallenge.noun} {currentChallenge.correct}
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
            className="text-center bg-white p-16 rounded-[5rem] border-8 border-indigo-50 shadow-2xl max-w-2xl mx-auto relative z-10"
          >
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 bg-yellow-400 p-10 rounded-[3rem] border-8 border-white shadow-2xl rotate-12">
              <Trophy className="w-24 h-24 text-white" />
            </div>

            <h2 className="text-6xl font-black uppercase italic mb-8 mt-12 tracking-tighter text-slate-900">
              {winner === 'Gor' ? (
                <span className="text-indigo-600">ԳՈՌԸ ՀԱՂԹԵՑ:</span>
              ) : winner === 'Gayane' ? (
                <span className="text-rose-600">ԳԱՅԱՆԵՆ ՀԱՂԹԵՑ:</span>
              ) : (
                <span className="text-yellow-500">ՈՉ-ՈՔԻ:</span>
              )}
            </h2>

            <div className="grid grid-cols-2 gap-8 mb-12">
              <div className="bg-indigo-50 p-10 rounded-[3.5rem] border-4 border-indigo-100">
                <p className="text-indigo-600 font-black text-2xl mb-2 uppercase italic tracking-widest">ԳՈՌ</p>
                <p className="text-8xl font-black">{scores.Gor}</p>
              </div>
              <div className="bg-rose-50 p-10 rounded-[3.5rem] border-4 border-rose-100">
                <p className="text-rose-600 font-black text-2xl mb-2 uppercase italic tracking-widest">ԳԱՅԱՆԵ</p>
                <p className="text-8xl font-black">{scores.Gayane}</p>
              </div>
            </div>

            <button 
              onClick={restart}
              className="w-full py-8 bg-indigo-600 text-white rounded-full font-black text-3xl uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl flex items-center justify-center gap-4"
            >
              <RefreshCw className="w-10 h-10" />
              ՆՈՐԻՑ ԽԱՂԱԼ
            </button>
            
            <div className="mt-12 flex justify-center gap-4">
              <Sparkles className="text-yellow-400 w-10 h-10" />
              <Heart className="text-rose-500 w-10 h-10 fill-current" />
              <Sparkles className="text-yellow-400 w-10 h-10" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
        body { font-family: 'Inter', sans-serif; background: #f8fafc; }
      `}} />
    </div>
  );
}
