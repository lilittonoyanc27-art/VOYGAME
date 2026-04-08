import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Coffee, 
  User, 
  MessageCircle, 
  ChevronRight, 
  ChevronLeft, 
  Eye, 
  EyeOff, 
  Sparkles, 
  DoorOpen, 
  Gem, 
  History,
  AlertCircle,
  Users,
  Ghost
} from 'lucide-react';

// --- Types ---
interface Scene {
  character: string;
  mood: 'shocked' | 'serious' | 'mysterious' | 'angry' | 'neutral';
  es: string;
  hy: string;
  action?: string;
  avatarColor: string;
  icon: React.ReactNode;
}

// --- Data ---
const SCENES: Scene[] = [
  {
    character: "Narrator",
    mood: 'neutral',
    es: "(Madrid: La oficina de Francisco. Todos están congelados.)",
    hy: "(Մադրիդ: Ֆրանսիսկոյի գրասենյակը: Բոլորը քարացել են:)",
    action: "De repente, la puerta se abre...",
    avatarColor: "bg-slate-600",
    icon: <History className="w-10 h-10 text-white" />
  },
  {
    character: "Giuseppe & Isabel",
    mood: 'serious',
    es: "(Entran Giuseppe e Isabel Carlota de la Rosa y Martínez de Os y Vizcaya. Giuseppe mira a Francisco seriamente.)",
    hy: "(Ներս են մտնում Ջուզեպպեն և Իզաբել Կառլոտա դե լա Ռոսա ի Մարտինես դե Օս ի Վիսկայը: Ջուզեպպեն երկար ու լուրջ նայում է Ֆրանսիսկոյին:)",
    action: "Francisco está congelado con un trozo de gata en la mano.",
    avatarColor: "bg-indigo-700",
    icon: <Users className="w-10 h-10 text-white" />
  },
  {
    character: "María",
    mood: 'shocked',
    es: "¡Vaya! ¿Qué hay en el cuello de Isabel?",
    hy: "Վա՜յ: Ի՞նչ կա Իզաբելի վզին:",
    action: "María nota algo brillante.",
    avatarColor: "bg-rose-500",
    icon: <Sparkles className="w-10 h-10 text-white" />
  },
  {
    character: "Narrator",
    mood: 'mysterious',
    es: "(En el cuello de Isabel brilla un medallón de oro... el mismo que Francisco le regaló hace tiempo.)",
    hy: "(Իզաբելի վզին փայլում է մի ոսկե մեդալիոն... հենց այն նույնը, որը Ֆրանսիսկոն ժամանակին նվիրել էր նրան:)",
    avatarColor: "bg-slate-600",
    icon: <Gem className="w-10 h-10 text-amber-400" />
  },
  {
    character: "Pablo",
    mood: 'shocked',
    es: "¡¿Qué?! ¡Es el medallón! Francisco, ¡tú tienes el mismo dibujo en tu office!",
    hy: "Ի՞նչ: Մեդալիո՞նն է: Ֆրանսիսկո՛, դու քո գրասենյակում նույն նկարից ունես:",
    action: "Pablo señala el dibujo en la pared.",
    avatarColor: "bg-emerald-600",
    icon: <Eye className="w-10 h-10 text-white" />
  },
  {
    character: "Isabel",
    mood: 'serious',
    es: "Hola, Francisco. Yo tengo tu regalo. ¿Todavía bebes té armenio?",
    hy: "Ողջո՜ւյն, Ֆրանսիսկո: Ես ունեմ քո նվերը: Դու դեռ հայկական թեյ ես խմում:",
    action: "Isabel se acerca lentamente a la mesa.",
    avatarColor: "bg-amber-600",
    icon: <User className="w-10 h-10 text-white" />
  },
  {
    character: "Giuseppe",
    mood: 'angry',
    es: "Francisco Javier... hay que hablar. No hay tiempo para té.",
    hy: "Ֆրանսիսկո Խավիեր... պետք է խոսել: Թեյի համար ժամանակ չկա:",
    action: "La voz de Giuseppe es severa.",
    avatarColor: "bg-slate-900",
    icon: <AlertCircle className="w-10 h-10 text-white" />
  },
  {
    character: "María",
    mood: 'mysterious',
    es: "(Susurrando) ¡No puede ser! Yo también tengo un medallón...",
    hy: "(Շշնջալով) Չի կարող պատահել։ Ես նույնպես ունեմ մի մեդալիոն...",
    action: "María mete la mano en su bolsillo.",
    avatarColor: "bg-rose-500",
    icon: <Sparkles className="w-10 h-10 text-white" />
  },
  {
    character: "Narrator",
    mood: 'mysterious',
    es: "(María saca su medallón con el dibujo de una pequeña tetera. Mira a Isabel y luego a Francisco.)",
    hy: "(Մարիան հանում է իր մեդալիոնը, որի վրա պատկերված է մի փոքրիկ թեյնիկ (tetera)։ Նա նայում է Իզաբելին, հետո Ֆրանսիսկոյին:)",
    avatarColor: "bg-slate-600",
    icon: <History className="w-10 h-10 text-white" />
  },
  {
    character: "Francisco",
    mood: 'shocked',
    es: "...",
    hy: "...",
    action: "Francisco se pone pálido.",
    avatarColor: "bg-indigo-500",
    icon: <Coffee className="w-10 h-10 text-white" />
  },
  {
    character: "Todos",
    mood: 'mysterious',
    es: "¡¡¡CONTINUARÁ...!!!",
    hy: "ՇԱՐՈՒՆԱԿԵԼԻ...",
    action: "El secreto se profundiza.",
    avatarColor: "bg-slate-800",
    icon: <Ghost className="w-10 h-10 text-white" />
  }
];

export default function ArmenianTeaSerialPart5() {
  const [currentScene, setCurrentScene] = useState(0);
  const [showHy, setShowHy] = useState(true);

  const scene = SCENES[currentScene];

  const next = () => {
    if (currentScene < SCENES.length - 1) {
      setCurrentScene(currentScene + 1);
    }
  };

  const prev = () => {
    if (currentScene > 0) {
      setCurrentScene(currentScene - 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans flex flex-col items-center justify-center p-4 md:p-8 overflow-hidden relative">
      {/* Cinematic Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-orange-500/5 to-transparent" />
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px]" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px]" />
      </div>

      {/* Header Bar */}
      <div className="fixed top-0 left-0 right-0 p-6 flex justify-between items-center z-50 bg-black/40 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(249,115,22,0.4)]">
            <TvIcon className="w-6 h-6 text-black" />
          </div>
          <div>
            <h1 className="text-xl font-black uppercase tracking-tighter text-white leading-none">
              Հայկական թեյի գաղտնիքը
            </h1>
            <p className="text-[10px] font-bold text-orange-500 uppercase tracking-[0.2em] mt-1">
              Մաս 5 — Երկու մեդալիոնների գաղտնիքը
            </p>
          </div>
        </div>
        
        <button 
          onClick={() => setShowHy(!showHy)}
          className="group flex items-center gap-3 px-4 py-2 bg-white/5 rounded-full border border-white/10 hover:bg-white/10 transition-all"
        >
          {showHy ? <EyeOff className="w-4 h-4 text-orange-500" /> : <Eye className="w-4 h-4 text-orange-500" />}
          <span className="text-[10px] font-black uppercase tracking-widest text-white/60 group-hover:text-white">
            {showHy ? 'Թաքցնել' : 'Ցույց տալ'}
          </span>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="w-full max-w-5xl mt-20">
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentScene}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="flex flex-col md:flex-row gap-8 items-center md:items-start"
          >
            {/* Character Avatar Section */}
            <div className="flex flex-col items-center gap-4 shrink-0">
              <motion.div 
                initial={{ scale: 0.8, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                className={`w-32 h-32 md:w-48 md:h-48 rounded-[2.5rem] md:rounded-[3.5rem] flex items-center justify-center shadow-2xl border-4 border-white/10 relative overflow-hidden ${scene.avatarColor}`}
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent" />
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="relative z-10"
                >
                  {scene.icon}
                </motion.div>
              </motion.div>
              <div className="text-center">
                <h2 className="text-2xl font-black uppercase tracking-tighter text-white">
                  {scene.character}
                </h2>
                <div className="px-3 py-1 bg-white/5 rounded-full border border-white/10 mt-1">
                  <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">
                    {scene.mood}
                  </p>
                </div>
              </div>
            </div>

            {/* Speech Bubble Section */}
            <div className="flex-1 w-full">
              <div className="relative bg-white/[0.03] backdrop-blur-2xl rounded-[3rem] p-8 md:p-12 border border-white/10 shadow-2xl min-h-[300px] flex flex-col justify-center">
                {/* Dialogue - ORANGE TEXT */}
                <div className="space-y-8">
                  <div className="flex items-start gap-6">
                    <MessageCircle className="w-8 h-8 text-orange-500 shrink-0 mt-2 opacity-50" />
                    <p className="text-3xl md:text-5xl font-black text-orange-500 leading-[1.1] tracking-tight">
                      {scene.es}
                    </p>
                  </div>

                  <AnimatePresence>
                    {showHy && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="pt-8 border-t border-white/5"
                      >
                        <p className="text-xl md:text-2xl font-bold text-white/40 italic leading-relaxed">
                          {scene.hy}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Action Tag */}
                {scene.action && (
                  <div className="absolute -bottom-4 left-12 px-6 py-2 bg-orange-500 rounded-full shadow-[0_10px_30px_rgba(249,115,22,0.3)]">
                    <p className="text-[10px] font-black text-black uppercase tracking-widest">
                      {scene.action}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Bar */}
        <div className="flex justify-between items-center mt-16 px-4">
          <button 
            onClick={prev}
            disabled={currentScene === 0}
            className="group flex items-center gap-4 px-8 py-4 bg-white/5 rounded-full border border-white/10 hover:bg-white/10 transition-all disabled:opacity-10 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-6 h-6 text-orange-500" />
            <span className="text-xs font-black uppercase tracking-widest text-white/60 group-hover:text-white hidden md:block">Նախորդ</span>
          </button>

          <div className="flex gap-3">
            {SCENES.map((_, i) => (
              <button 
                key={i}
                onClick={() => setCurrentScene(i)}
                className={`h-2 rounded-full transition-all duration-500 ${i === currentScene ? 'w-16 bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.5)]' : 'w-4 bg-white/10 hover:bg-white/20'}`}
              />
            ))}
          </div>

          <button 
            onClick={next}
            disabled={currentScene === SCENES.length - 1}
            className="group flex items-center gap-4 px-10 py-5 bg-orange-500 text-black rounded-full hover:bg-orange-400 transition-all disabled:opacity-10 disabled:cursor-not-allowed shadow-[0_20px_40px_rgba(249,115,22,0.2)]"
          >
            <span className="text-xs font-black uppercase tracking-widest block">Հաջորդ</span>
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-black/40 backdrop-blur-md px-6 py-2 rounded-full border border-white/5">
        <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">
          Տեսարան {currentScene + 1} / {SCENES.length}
        </span>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
        body { 
          font-family: 'Inter', sans-serif; 
          background: #050505;
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

function TvIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="15" x="2" y="7" rx="2" ry="2" />
      <polyline points="17 2 12 7 7 2" />
    </svg>
  )
}
