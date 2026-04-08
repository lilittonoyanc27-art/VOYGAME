import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Trophy, 
  Star, 
  Zap, 
  Navigation, 
  CheckCircle2, 
  XCircle, 
  Play, 
  RotateCcw,
  Crown,
  Sparkles
} from 'lucide-react';

// --- Types ---
interface IrQuestion {
  id: number;
  sentence: string;
  hySentence: string;
  options: string[];
  correct: string;
  explanation: string;
}

// --- Data ---
const IR_QUESTIONS: IrQuestion[] = [
  {
    id: 1,
    sentence: "Yo ___ a la escuela.",
    hySentence: "Ես գնում եմ դպրոց:",
    options: ["voy", "vas", "va"],
    correct: "voy",
    explanation: "Yo + voy"
  },
  {
    id: 2,
    sentence: "Nosotros ___ al parque.",
    hySentence: "Մենք գնում ենք այգի:",
    options: ["vamos", "van", "vais"],
    correct: "vamos",
    explanation: "Nosotros + vamos"
  },
  {
    id: 3,
    sentence: "Tú ___ a comer una pizza.",
    hySentence: "Դու պատրաստվում ես պիցցա ուտել:",
    options: ["va", "vas", "voy"],
    correct: "vas",
    explanation: "Tú + vas"
  },
  {
    id: 4,
    sentence: "Ellos ___ a jugar fútbol.",
    hySentence: "Նրանք պատրաստվում են ֆուտբոլ խաղալ:",
    options: ["van", "vamos", "va"],
    correct: "van",
    explanation: "Ellos + van"
  },
  {
    id: 5,
    sentence: "Ella ___ al cine.",
    hySentence: "Նա գնում է կինոթատրոն:",
    options: ["voy", "va", "vas"],
    correct: "va",
    explanation: "Ella + va"
  },
  {
    id: 6,
    sentence: "Ustedes ___ a estudiar.",
    hySentence: "Դուք պատրաստվում եք սովորել:",
    options: ["van", "vamos", "vais"],
    correct: "van",
    explanation: "Ustedes + van"
  },
  {
    id: 7,
    sentence: "Vosotros ___ a la playa.",
    hySentence: "Դուք գնում եք լողափ:",
    options: ["vais", "van", "vamos"],
    correct: "vais",
    explanation: "Vosotros + vais"
  },
  {
    id: 8,
    sentence: "Voy ___ cine.",
    hySentence: "Գնում եմ կինոթատրոն:",
    options: ["a la", "al", "a"],
    correct: "al",
    explanation: "a + el = al"
  },
  {
    id: 9,
    sentence: "Vamos ___ playa.",
    hySentence: "Գնում ենք լողափ:",
    options: ["al", "a la", "a"],
    correct: "a la",
    explanation: "a + la = a la"
  },
  {
    id: 10,
    sentence: "Él ___ a cantar.",
    hySentence: "Նա պատրաստվում է երգել:",
    options: ["va", "voy", "van"],
    correct: "va",
    explanation: "Él + va"
  }
];

export default function GorVsGayaneIrGame() {
  const [view, setView] = useState<'intro' | 'playing' | 'finish'>('intro');
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState({ gor: 0, gayane: 0 });
  const [currentPlayer, setCurrentPlayer] = useState<'gor' | 'gayane'>('gor');
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const currentQuestion = IR_QUESTIONS[step];

  const handleAnswer = (option: string) => {
    if (feedback) return;

    const isCorrect = option === currentQuestion.correct;
    if (isCorrect) {
      setFeedback('correct');
      setScores(prev => ({
        ...prev,
        [currentPlayer]: prev[currentPlayer] + 1
      }));
    } else {
      setFeedback('wrong');
    }

    setTimeout(() => {
      if (step < IR_QUESTIONS.length - 1) {
        setStep(s => s + 1);
        setCurrentPlayer(currentPlayer === 'gor' ? 'gayane' : 'gor');
        setFeedback(null);
      } else {
        setView('finish');
      }
    }, 2000);
  };

  const restart = () => {
    setStep(0);
    setScores({ gor: 0, gayane: 0 });
    setCurrentPlayer('gor');
    setFeedback(null);
    setView('intro');
  };

  const winner = scores.gor > scores.gayane ? 'Gor' : scores.gayane > scores.gor ? 'Gayane' : 'Draw';

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans flex flex-col items-center justify-center p-4 md:p-8 overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-500/5 to-transparent" />
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]" />
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
            <div className="flex justify-center gap-8 mb-8">
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="flex flex-col items-center"
              >
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center shadow-lg border-4 border-yellow-400">
                  <User className="w-10 h-10 text-white" />
                </div>
                <p className="mt-2 font-black text-blue-600">GOR</p>
              </motion.div>
              <div className="flex items-center">
                <p className="text-4xl font-black text-zinc-300 italic">VS</p>
              </div>
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2, delay: 1 }}
                className="flex flex-col items-center"
              >
                <div className="w-20 h-20 bg-cyan-500 rounded-full flex items-center justify-center shadow-lg border-4 border-yellow-400">
                  <User className="w-10 h-10 text-white" />
                </div>
                <p className="mt-2 font-black text-cyan-500">GAYANE</p>
              </motion.div>
            </div>
            
            <h1 className="text-6xl font-black uppercase tracking-tighter mb-4 leading-tight text-blue-600 italic">
              ՄԱՐՏԱՀՐԱՎԵՐ <br /> <span className="text-cyan-500">IR VERBO</span>
            </h1>
            <p className="text-xl text-zinc-500 font-bold italic mb-12">
              Ո՞վ ավելի լավ գիտի "IR" բայը: <br />
              Գոռը, թե՞ Գայանեն:
            </p>

            <button 
              onClick={() => setView('playing')}
              className="px-16 py-8 bg-blue-600 text-white rounded-full font-black text-3xl uppercase tracking-widest hover:bg-blue-500 transition-all shadow-[0_20px_40px_rgba(37,99,235,0.3)] border-4 border-yellow-400 active:scale-95 flex items-center gap-4 mx-auto"
            >
              <Play className="w-10 h-10 fill-current" />
              ՍԿՍԵԼ ՄՐՑՈՒՅԹԸ
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
            {/* Duel Scoreboard */}
            <div className="grid grid-cols-3 gap-4">
              <div className={`p-6 rounded-[2.5rem] border-4 transition-all ${currentPlayer === 'gor' ? 'bg-blue-600 border-yellow-400 scale-105 shadow-xl' : 'bg-white border-zinc-100 opacity-50'}`}>
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${currentPlayer === 'gor' ? 'bg-white text-blue-600' : 'bg-blue-100 text-blue-600'}`}>
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <p className={`font-black text-[10px] uppercase tracking-widest ${currentPlayer === 'gor' ? 'text-blue-100' : 'text-zinc-400'}`}>ԳՈՌ</p>
                    <p className={`text-3xl font-black ${currentPlayer === 'gor' ? 'text-white' : 'text-blue-600'}`}>{scores.gor}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center">
                <div className="bg-zinc-100 px-6 py-2 rounded-full font-black text-zinc-400 text-[10px] uppercase tracking-[0.2em] border border-zinc-200 mb-2">
                  ՀԱՐՑ {step + 1} / {IR_QUESTIONS.length}
                </div>
                <div className="w-full h-2 bg-zinc-100 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${((step + 1) / IR_QUESTIONS.length) * 100}%` }}
                  />
                </div>
              </div>

              <div className={`p-6 rounded-[2.5rem] border-4 transition-all ${currentPlayer === 'gayane' ? 'bg-cyan-500 border-yellow-400 scale-105 shadow-xl' : 'bg-white border-zinc-100 opacity-50'}`}>
                <div className="flex items-center gap-4 justify-end">
                  <div className="text-right">
                    <p className={`font-black text-[10px] uppercase tracking-widest ${currentPlayer === 'gayane' ? 'text-cyan-100' : 'text-zinc-400'}`}>ԳԱՅԱՆԵ</p>
                    <p className={`text-3xl font-black ${currentPlayer === 'gayane' ? 'text-white' : 'text-cyan-500'}`}>{scores.gayane}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${currentPlayer === 'gayane' ? 'bg-white text-cyan-500' : 'bg-cyan-100 text-cyan-500'}`}>
                    <User className="w-6 h-6" />
                  </div>
                </div>
              </div>
            </div>

            {/* Question Arena */}
            <div className="bg-white/80 backdrop-blur-2xl rounded-[4rem] p-12 shadow-2xl border-4 border-zinc-50 relative min-h-[500px] flex flex-col items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                {!feedback ? (
                  <motion.div 
                    key={step}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -50, opacity: 0 }}
                    className="text-center w-full"
                  >
                    <div className="mb-8">
                      <span className={`px-6 py-2 rounded-full font-black text-sm uppercase tracking-widest ${currentPlayer === 'gor' ? 'bg-blue-100 text-blue-600' : 'bg-cyan-100 text-cyan-600'}`}>
                        Հերթը {currentPlayer === 'gor' ? 'Գոռինն' : 'Գայանեինն'} է
                      </span>
                    </div>

                    <h3 className="text-5xl md:text-6xl font-black text-blue-600 mb-6 leading-tight tracking-tight italic">
                      {currentQuestion.sentence.split("___").map((part, i, arr) => (
                        <React.Fragment key={i}>
                          {part}
                          {i < arr.length - 1 && <span className="text-yellow-500 mx-2">______</span>}
                        </React.Fragment>
                      ))}
                    </h3>

                    <p className="text-3xl text-zinc-400 font-bold italic mb-16">
                      {currentQuestion.hySentence}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mx-auto">
                      {currentQuestion.options.map((opt, i) => (
                        <button
                          key={i}
                          onClick={() => handleAnswer(opt)}
                          className={`group relative py-10 rounded-[2.5rem] border-4 transition-all text-4xl font-black active:scale-95 shadow-xl bg-white border-zinc-100 text-zinc-800 hover:border-blue-500 hover:text-blue-600`}
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
                    className="flex flex-col items-center text-center"
                  >
                    {feedback === 'correct' ? (
                      <>
                        <div className="bg-emerald-500 p-10 rounded-full mb-8 shadow-lg border-4 border-white">
                          <CheckCircle2 className="w-20 h-20 text-white" />
                        </div>
                        <h4 className="text-7xl font-black text-emerald-500 italic uppercase tracking-tighter animate-bounce">ԱՊՐԵ՛Ս:</h4>
                        <p className="text-2xl font-bold text-zinc-400 mt-4 italic">Ճիշտ պատասխան:</p>
                        <p className="text-4xl font-black text-blue-600 mt-2">{currentQuestion.sentence.replace("___", currentQuestion.correct)}</p>
                      </>
                    ) : (
                      <>
                        <div className="bg-red-500 p-10 rounded-full mb-8 shadow-lg border-4 border-white">
                          <XCircle className="w-20 h-20 text-white" />
                        </div>
                        <h4 className="text-7xl font-black text-red-500 italic uppercase tracking-tighter">ՍԽԱԼ Է:</h4>
                        <p className="text-2xl font-bold text-zinc-400 mt-4 italic">Ճիշտ ձևն էր՝</p>
                        <p className="text-5xl font-black text-yellow-500 mt-2">{currentQuestion.correct}</p>
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
            className="text-center bg-white/80 backdrop-blur-2xl p-16 rounded-[5rem] border-4 border-zinc-100 shadow-2xl max-w-4xl mx-auto relative z-10"
          >
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 bg-yellow-400 p-12 rounded-[3.5rem] border-8 border-white shadow-2xl rotate-12">
              <Trophy className="w-24 h-24 text-white" />
            </div>

            <h2 className="text-7xl font-black uppercase italic mb-8 mt-16 tracking-tighter text-blue-600 drop-shadow-sm">
              ԱՐԴՅՈՒՆՔՆԵՐ
            </h2>

            <div className="grid grid-cols-2 gap-8 mb-12">
              <div className={`p-10 rounded-[4rem] border-4 ${scores.gor >= scores.gayane ? 'bg-blue-50 border-blue-200' : 'bg-zinc-50 border-zinc-100 opacity-60'}`}>
                <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <User className="w-10 h-10 text-white" />
                </div>
                <p className="text-xl font-black text-blue-600 uppercase">ԳՈՌ</p>
                <p className="text-7xl font-black text-zinc-800 mt-2">{scores.gor}</p>
                {scores.gor >= scores.gayane && scores.gor !== scores.gayane && (
                  <div className="mt-4 flex justify-center">
                    <Crown className="w-8 h-8 text-yellow-500" />
                  </div>
                )}
              </div>

              <div className={`p-10 rounded-[4rem] border-4 ${scores.gayane >= scores.gor ? 'bg-cyan-50 border-cyan-200' : 'bg-zinc-50 border-zinc-100 opacity-60'}`}>
                <div className="w-20 h-20 bg-cyan-500 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <User className="w-10 h-10 text-white" />
                </div>
                <p className="text-xl font-black text-cyan-500 uppercase">ԳԱՅԱՆԵ</p>
                <p className="text-7xl font-black text-zinc-800 mt-2">{scores.gayane}</p>
                {scores.gayane >= scores.gor && scores.gor !== scores.gayane && (
                  <div className="mt-4 flex justify-center">
                    <Crown className="w-8 h-8 text-yellow-500" />
                  </div>
                )}
              </div>
            </div>

            <div className="bg-yellow-400/10 p-10 rounded-[3rem] border-4 border-yellow-400/30 mb-12">
              <h3 className="text-4xl font-black text-zinc-800 uppercase tracking-tight">
                {winner === 'Draw' ? "ՈՉ-ՈՔԻ: 🤝" : `ՀԱՂԹԵՑ ${winner.toUpperCase()}-Ը: 🏆`}
              </h3>
              <p className="text-xl font-bold text-zinc-500 mt-2 italic">
                {winner === 'Draw' ? "Երկուսդ էլ հիանալի գիտեք 'IR' բայը:" : "Շնորհավորում ենք հաղթողին:"}
              </p>
            </div>

            <button 
              onClick={restart}
              className="w-full py-10 bg-blue-600 text-white rounded-full font-black text-4xl uppercase tracking-widest hover:bg-blue-500 transition-all shadow-[0_20px_40px_rgba(37,99,235,0.3)] border-4 border-yellow-400 flex items-center justify-center gap-6"
            >
              <RotateCcw className="w-12 h-12" />
              ՆՈՐԻՑ ԽԱՂԱԼ
            </button>
            
            <div className="mt-16 flex justify-center gap-8">
              <Sparkles className="text-yellow-400 w-12 h-12" />
              <Star className="text-blue-500 w-12 h-12 fill-current" />
              <Sparkles className="text-cyan-500 w-12 h-12" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress Indicator */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-white/80 backdrop-blur-md px-8 py-3 rounded-full border border-zinc-100 shadow-sm">
        <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">
          DUEL MASTER v1.0
        </span>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
        body { 
          font-family: 'Inter', sans-serif; 
          background: #ffffff;
          overflow-x: hidden;
        }
      `}} />
    </div>
  );
}
