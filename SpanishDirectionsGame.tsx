import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  Navigation, 
  ArrowUp, 
  ArrowLeft, 
  ArrowRight, 
  RotateCcw, 
  Compass, 
  Flag, 
  Trophy, 
  Star,
  CheckCircle2,
  XCircle,
  Play,
  Map as MapIcon,
  Building2,
  Trees as Park,
  Coffee,
  ShoppingBag
} from 'lucide-react';

// --- Types ---
interface DirectionChallenge {
  id: number;
  instruction: string;
  hyInstruction: string;
  options: { text: string; hy: string; icon: React.ReactNode }[];
  correctIndex: number;
  target: string;
  hyTarget: string;
  mapHint: string;
}

// --- Data ---
const DIRECTION_CHALLENGES: DirectionChallenge[] = [
  {
    id: 1,
    instruction: "Sigue todo recto por esta calle.",
    hyInstruction: "Գնա ուղիղ այս փողոցով:",
    options: [
      { text: "Todo recto", hy: "Ուղիղ", icon: <ArrowUp className="w-8 h-8" /> },
      { text: "A la derecha", hy: "Դեպի աջ", icon: <ArrowRight className="w-8 h-8" /> },
      { text: "A la izquierda", hy: "Դեպի ձախ", icon: <ArrowLeft className="w-8 h-8" /> }
    ],
    correctIndex: 0,
    target: "El Museo",
    hyTarget: "Թանգարան",
    mapHint: "The museum is straight ahead."
  },
  {
    id: 2,
    instruction: "Gira a la derecha en la esquina.",
    hyInstruction: "Թեքվիր աջ անկյունում:",
    options: [
      { text: "Gira a la izquierda", hy: "Թեքվիր ձախ", icon: <ArrowLeft className="w-8 h-8" /> },
      { text: "Cruza la calle", hy: "Անցիր փողոցը", icon: <Navigation className="w-8 h-8" /> },
      { text: "Gira a la derecha", hy: "Թեքվիր աջ", icon: <ArrowRight className="w-8 h-8" /> }
    ],
    correctIndex: 2,
    target: "El Parque",
    hyTarget: "Այգի",
    mapHint: "Turn right to find the green park."
  },
  {
    id: 3,
    instruction: "Gira a la izquierda después del café.",
    hyInstruction: "Թեքվիր ձախ սրճարանից հետո:",
    options: [
      { text: "Gira a la izquierda", hy: "Թեքվիր ձախ", icon: <ArrowLeft className="w-8 h-8" /> },
      { text: "Sigue recto", hy: "Գնա ուղիղ", icon: <ArrowUp className="w-8 h-8" /> },
      { text: "Para aquí", hy: "Կանգնիր այստեղ", icon: <MapPin className="w-8 h-8" /> }
    ],
    correctIndex: 0,
    target: "La Biblioteca",
    hyTarget: "Գրադարան",
    mapHint: "Look for the coffee shop, then turn left."
  },
  {
    id: 4,
    instruction: "Cruza la calle principal.",
    hyInstruction: "Անցիր գլխավոր փողոցը:",
    options: [
      { text: "Gira", hy: "Թեքվիր", icon: <RotateCcw className="w-8 h-8" /> },
      { text: "Cruza la calle", hy: "Անցիր փողոցը", icon: <Navigation className="w-8 h-8" /> },
      { text: "Sigue", hy: "Շարունակիր", icon: <ArrowUp className="w-8 h-8" /> }
    ],
    correctIndex: 1,
    target: "La Estación",
    hyTarget: "Կայարան",
    mapHint: "The station is on the other side of the road."
  },
  {
    id: 5,
    instruction: "Toma la segunda calle a la derecha.",
    hyInstruction: "Թեքվիր երկրորդ փողոցը դեպի աջ:",
    options: [
      { text: "Primera a la derecha", hy: "Առաջինը աջ", icon: <ArrowRight className="w-8 h-8 opacity-50" /> },
      { text: "Segunda a la derecha", hy: "Երկրորդը աջ", icon: <ArrowRight className="w-8 h-8" /> },
      { text: "Segunda a la izquierda", hy: "Երկրորդը ձախ", icon: <ArrowLeft className="w-8 h-8" /> }
    ],
    correctIndex: 1,
    target: "El Cine",
    hyTarget: "Կինոթատրոն",
    mapHint: "Skip the first turn, take the second one on the right."
  }
];

export default function SpanishDirectionsGame() {
  const [view, setView] = useState<'intro' | 'playing' | 'finish'>('intro');
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const challenge = DIRECTION_CHALLENGES[step];

  const handleAnswer = (index: number) => {
    if (feedback) return;
    
    const isCorrect = index === challenge.correctIndex;
    if (isCorrect) {
      setFeedback('correct');
      setScore(s => s + 1);
    } else {
      setFeedback('wrong');
    }

    setTimeout(() => {
      if (step < DIRECTION_CHALLENGES.length - 1) {
        setStep(s => s + 1);
        setFeedback(null);
      } else {
        setView('finish');
      }
    }, 2000);
  };

  const restart = () => {
    setStep(0);
    setScore(0);
    setFeedback(null);
    setView('intro');
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans flex flex-col items-center justify-center p-4 md:p-8 overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-orange-500/5 to-transparent" />
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-red-500/10 rounded-full blur-[120px]" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-yellow-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-500/5 rounded-full blur-[160px]" />
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
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 5 }}
                className="bg-orange-500 p-8 rounded-[3rem] shadow-[0_20px_40px_rgba(249,115,22,0.3)] border-4 border-yellow-400"
              >
                <Compass className="w-20 h-20 text-white" />
              </motion.div>
            </div>
            
            <h1 className="text-6xl font-black uppercase tracking-tighter mb-4 leading-tight text-red-600 italic">
              ¿CÓMO LLEGO? <br /> <span className="text-orange-500">ՃԱՆԱՊԱՐՀԸ</span>
            </h1>
            <p className="text-xl text-zinc-500 font-bold italic mb-12">
              Սովորիր իսպաներենով ճանապարհ հարցնել և ցույց տալ: <br />
              Գտիր ճիշտ ուղղությունը:
            </p>

            <button 
              onClick={() => setView('playing')}
              className="px-16 py-8 bg-red-600 text-white rounded-full font-black text-3xl uppercase tracking-widest hover:bg-red-500 transition-all shadow-[0_20px_40px_rgba(239,68,68,0.3)] border-4 border-yellow-400 active:scale-95 flex items-center gap-4 mx-auto"
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
            <div className="bg-white/80 backdrop-blur-xl p-6 rounded-[2.5rem] border-2 border-zinc-100 shadow-sm flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center shadow-lg border-2 border-yellow-400">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-black text-[10px] text-zinc-400 uppercase tracking-widest leading-none mb-1">ՄԻԱՎՈՐ</p>
                  <p className="text-2xl font-black text-red-600">{score}</p>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div className="bg-orange-500/10 px-6 py-2 rounded-full font-black text-orange-600 text-[10px] uppercase tracking-[0.2em] border border-orange-500/20 mb-3">
                  ՏԵՍԱՐԱՆ {step + 1} / {DIRECTION_CHALLENGES.length}
                </div>
                <div className="w-48 h-2 bg-zinc-100 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-red-500 to-orange-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${((step + 1) / DIRECTION_CHALLENGES.length) * 100}%` }}
                  />
                </div>
              </div>

              <div className="w-12 h-12 bg-zinc-50 rounded-2xl flex items-center justify-center border border-zinc-100">
                <Navigation className="w-6 h-6 text-zinc-300" />
              </div>
            </div>

            {/* Game Arena */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left: Instruction Card */}
              <div className="bg-white/80 backdrop-blur-2xl rounded-[3rem] p-10 shadow-xl border-4 border-zinc-50 flex flex-col justify-center text-center">
                <div className="mb-8 flex justify-center">
                  <div className="p-6 bg-orange-50 rounded-full border-2 border-orange-100">
                    <Building2 className="w-12 h-12 text-orange-500" />
                  </div>
                </div>
                
                <h2 className="text-xl font-black text-zinc-400 uppercase tracking-[0.3em] mb-4">
                  ՈՒՂՂՈՒԹՅՈՒՆ
                </h2>
                
                <h3 className="text-4xl md:text-5xl font-black text-red-600 mb-6 leading-tight tracking-tight italic">
                  "{challenge.instruction}"
                </h3>

                <p className="text-2xl text-zinc-400 font-bold italic mb-10">
                  {challenge.hyInstruction}
                </p>

                <div className="bg-zinc-50 rounded-2xl p-4 border border-zinc-100">
                  <p className="text-sm font-black text-orange-500 uppercase tracking-widest mb-1">ՆՊԱՏԱԿԱԿԵՏ</p>
                  <p className="text-xl font-black text-zinc-800">{challenge.target} ({challenge.hyTarget})</p>
                </div>
              </div>

              {/* Right: Interaction Area */}
              <div className="bg-white/80 backdrop-blur-2xl rounded-[3rem] p-10 shadow-xl border-4 border-zinc-50 relative min-h-[400px] flex flex-col items-center justify-center">
                <AnimatePresence mode="wait">
                  {!feedback ? (
                    <motion.div 
                      key={step}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="w-full space-y-4"
                    >
                      <p className="text-center text-zinc-400 font-black uppercase tracking-widest mb-6">Ընտրիր ճիշտ գործողությունը</p>
                      {challenge.options.map((opt, i) => (
                        <button
                          key={i}
                          onClick={() => handleAnswer(i)}
                          className="w-full group relative flex items-center gap-6 p-6 rounded-3xl border-4 transition-all text-left bg-white border-zinc-100 hover:border-orange-500 hover:shadow-lg active:scale-[0.98]"
                        >
                          <div className="w-16 h-16 bg-zinc-50 rounded-2xl flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-colors">
                            {opt.icon}
                          </div>
                          <div>
                            <p className="text-2xl font-black text-zinc-800 group-hover:text-orange-600">{opt.text}</p>
                            <p className="text-sm font-bold text-zinc-400 italic">{opt.hy}</p>
                          </div>
                          <ArrowRight className="ml-auto w-6 h-6 text-zinc-200 group-hover:text-orange-500 group-hover:translate-x-1 transition-all" />
                        </button>
                      ))}
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
                          <h4 className="text-6xl font-black text-emerald-500 italic uppercase tracking-tighter animate-bounce">ՃԻՇՏ Է:</h4>
                          <p className="text-xl font-bold text-zinc-400 mt-4 italic">Դու գտար ճանապարհը դեպի</p>
                          <p className="text-3xl font-black text-red-600 mt-2">{challenge.target}!</p>
                        </>
                      ) : (
                        <>
                          <div className="bg-red-500 p-10 rounded-full mb-8 shadow-lg border-4 border-white">
                            <XCircle className="w-20 h-20 text-white" />
                          </div>
                          <h4 className="text-6xl font-black text-red-500 italic uppercase tracking-tighter">ՍԽԱԼ Է:</h4>
                          <p className="text-xl font-bold text-zinc-400 mt-4 italic">Ճիշտ պատասխանն էր՝</p>
                          <p className="text-3xl font-black text-orange-500 mt-2">{challenge.options[challenge.correctIndex].text}</p>
                        </>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}

        {view === 'finish' && (
          <motion.div 
            key="finish"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center bg-white/80 backdrop-blur-2xl p-16 rounded-[5rem] border-4 border-zinc-100 shadow-2xl max-w-3xl mx-auto relative z-10"
          >
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 bg-red-600 p-12 rounded-[3.5rem] border-8 border-white shadow-2xl rotate-12">
              <Trophy className="w-24 h-24 text-white" />
            </div>

            <h2 className="text-7xl font-black uppercase italic mb-12 mt-16 tracking-tighter text-yellow-500 drop-shadow-sm">
              ԽԱՂԻ ԱՎԱՐՏ
            </h2>

            <div className="bg-zinc-50 p-16 rounded-[4rem] border-4 border-red-600/10 shadow-inner mb-16">
              <p className="text-red-600 font-black text-3xl mb-4 uppercase italic tracking-widest">ՎԵՐՋՆԱԿԱՆ ՄԻԱՎՈՐ</p>
              <p className="text-9xl font-black text-yellow-500 drop-shadow-sm">{score} / {DIRECTION_CHALLENGES.length}</p>
              <p className="text-xl font-bold text-zinc-400 mt-6 italic">
                {score === DIRECTION_CHALLENGES.length ? "Հիանալի է: Դու իսկական ուղեկցորդ ես!" : "Լավ փորձ էր: Շարունակիր սովորել:"}
              </p>
            </div>

            <button 
              onClick={restart}
              className="w-full py-10 bg-red-600 text-white rounded-full font-black text-4xl uppercase tracking-widest hover:bg-red-500 transition-all shadow-[0_20px_40px_rgba(239,68,68,0.3)] border-4 border-yellow-400 flex items-center justify-center gap-6"
            >
              <RotateCcw className="w-12 h-12" />
              ՆՈՐԻՑ ԽԱՂԱԼ
            </button>
            
            <div className="mt-16 flex justify-center gap-8">
              <Star className="text-yellow-400 w-12 h-12 fill-current" />
              <MapIcon className="text-red-500 w-12 h-12" />
              <Star className="text-orange-500 w-12 h-12 fill-current" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress Indicator */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-white/80 backdrop-blur-md px-8 py-3 rounded-full border border-zinc-100 shadow-sm">
        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">
          DIRECTIONS MASTER v1.0
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
