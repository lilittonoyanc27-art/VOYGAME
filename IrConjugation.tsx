import React from 'react';
import { motion } from 'framer-motion';
import { 
  Navigation, 
  MapPin, 
  Info, 
  ArrowRight, 
  Zap, 
  Star,
  BookOpen,
  Compass
} from 'lucide-react';

export default function IrConjugation() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans p-4 md:p-8 overflow-x-hidden relative">
      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-500/5 to-transparent" />
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-block p-4 bg-blue-600 rounded-3xl shadow-lg border-4 border-yellow-400 mb-6">
            <Navigation className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-6xl font-black uppercase tracking-tighter text-blue-600 italic mb-2">
            El Verbo <span className="text-cyan-500">IR</span>
          </h1>
          <p className="text-2xl text-zinc-400 font-bold italic">
            Գնալ (To Go) — Տեսություն և Խոնարհում
          </p>
        </motion.header>

        {/* Conjugation Table */}
        <motion.section 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-10 bg-cyan-500 rounded-xl flex items-center justify-center shadow-md">
              <Star className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-black uppercase tracking-tight text-zinc-800">
              Presente de Indicativo (Ներկա ժամանակ)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { pr: "Yo", conj: "voy", hy: "Ես գնում եմ" },
              { pr: "Tú", conj: "vas", hy: "Դու գնում ես" },
              { pr: "Él / Ella / Ud.", conj: "va", hy: "Նա գնում է" },
              { pr: "Nosotros/as", conj: "vamos", hy: "Մենք գնում ենք" },
              { pr: "Vosotros/as", conj: "vais", hy: "Դուք գնում եք" },
              { pr: "Ellos / Ellas / Uds.", conj: "van", hy: "Նրանք գնում են" },
            ].map((item, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.02 }}
                className="bg-white border-4 border-zinc-100 p-6 rounded-[2.5rem] shadow-sm flex items-center justify-between group hover:border-blue-500 transition-all"
              >
                <div>
                  <span className="text-sm font-black text-zinc-400 uppercase tracking-widest">{item.pr}</span>
                  <p className="text-4xl font-black text-blue-600 group-hover:text-blue-500">{item.conj}</p>
                </div>
                <p className="text-lg font-bold text-zinc-400 italic">{item.hy}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Theory Section */}
        <motion.section 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-8"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-md">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-black uppercase tracking-tight text-zinc-800">
              Teoría (Տեսություն)
            </h2>
          </div>

          {/* Rule 1 */}
          <div className="bg-zinc-50 rounded-[3rem] p-10 border-4 border-zinc-100 shadow-inner">
            <h3 className="text-2xl font-black text-blue-600 mb-4 flex items-center gap-3">
              <MapPin className="w-6 h-6" /> 1. Ու՞ր ենք գնում: (Ir + a + Lugar)
            </h3>
            <p className="text-lg text-zinc-600 leading-relaxed mb-6">
              Երբ ցանկանում ենք ասել, թե ուր ենք գնում, օգտագործում ենք <b>"a"</b> տառը: Բայց ուշադիր եղիր տեղանունների հետ.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-white p-6 rounded-2xl border-2 border-cyan-400 shadow-sm">
                <p className="text-sm font-black text-cyan-500 uppercase mb-2">Աղջիկ տեղեր (La)</p>
                <p className="text-2xl font-black text-zinc-800 italic">"Voy <span className="text-blue-600">a la</span> playa."</p>
                <p className="text-zinc-400 font-bold italic mt-1">Ես գնում եմ լողափ:</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border-2 border-blue-400 shadow-sm">
                <p className="text-sm font-black text-blue-600 uppercase mb-2">Տղա տեղեր (El)</p>
                <p className="text-2xl font-black text-zinc-800 italic">"Voy <span className="text-cyan-500">al</span> parque."</p>
                <p className="text-zinc-400 font-bold italic mt-1">Ես գնում եմ այգի:</p>
              </div>
            </div>
            <p className="text-sm text-zinc-400 italic bg-white p-4 rounded-xl border border-zinc-100">
              💡 Հիշիր. <b>a + el = AL</b>: Մենք չենք ասում "a el", մենք ասում ենք "al":
            </p>
          </div>

          {/* Rule 2 */}
          <div className="bg-zinc-50 rounded-[3rem] p-10 border-4 border-zinc-100 shadow-inner">
            <h3 className="text-2xl font-black text-cyan-500 mb-4 flex items-center gap-3">
              <Zap className="w-6 h-6" /> 2. Ի՞նչ ենք անելու: (Ir + a + Infinitivo)
            </h3>
            <p className="text-lg text-zinc-600 leading-relaxed mb-6">
              Սա մեր <b>"Կախարդական Բանաձևն"</b> է ապագայի համար: Երբ պատրաստվում ես ինչ-որ բան անել, օգտագործիր այս ձևը:
            </p>
            <div className="bg-blue-50 p-6 rounded-2xl border-2 border-blue-200 mb-6 text-center">
              <p className="text-xl font-black text-blue-600 uppercase tracking-widest">Բանաձևը</p>
              <p className="text-3xl font-black text-zinc-800 mt-2">IR + A + [Գործողություն]</p>
            </div>
            <p className="text-zinc-500 mb-4"><b>Ի՞նչ է Infinitivo-ն:</b> Դրանք այն բառերն են, որոնք ցույց են տալիս գործողություն, բայց դեռ չեն փոխվել (վերջանում են -AR, -ER, -IR):</p>
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-2xl border-2 border-yellow-400 shadow-sm">
                <p className="text-2xl font-black text-zinc-800 italic">"Voy <span className="text-cyan-500">a comer</span>."</p>
                <p className="text-zinc-400 font-bold italic mt-1">Ես պատրաստվում եմ ուտել:</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border-2 border-yellow-400 shadow-sm">
                <p className="text-2xl font-black text-zinc-800 italic">"Vamos <span className="text-cyan-500">a jugar</span>."</p>
                <p className="text-zinc-400 font-bold italic mt-1">Մենք պատրաստվում ենք խաղալ:</p>
              </div>
            </div>
          </div>

          {/* Rule 3 */}
          <div className="bg-blue-600 rounded-[3rem] p-10 border-4 border-yellow-400 shadow-xl text-white">
            <h3 className="text-2xl font-black mb-4 flex items-center gap-3">
              <Info className="w-6 h-6" /> 3. Կարևոր գաղտնիք: AL
            </h3>
            <p className="text-lg opacity-90 leading-relaxed mb-6">
              Իսպաներենում որոշ բառեր սիրում են միանալ: Երբ <b>"a"</b>-ն հանդիպում է <b>"el"</b>-ին, նրանք դառնում են լավագույն ընկերներ և վերածվում են <b>"AL"</b>-ի:
            </p>
            <div className="flex items-center justify-center gap-8 bg-black/20 p-8 rounded-3xl font-black text-3xl italic">
              <span>a + el</span>
              <ArrowRight className="w-10 h-10 text-yellow-400" />
              <span className="text-yellow-400">AL</span>
            </div>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/10 p-4 rounded-xl border border-white/20">
                <p className="text-sm uppercase opacity-60">Սխալ է ❌</p>
                <p className="text-xl font-bold">Voy a el cine</p>
              </div>
              <div className="bg-white/20 p-4 rounded-xl border border-yellow-400">
                <p className="text-sm uppercase text-yellow-400">Ճիշտ է ✅</p>
                <p className="text-xl font-bold">Voy al cine</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Footer Info */}
        <footer className="mt-20 text-center pb-12">
          <div className="inline-flex items-center gap-3 bg-zinc-100 px-8 py-3 rounded-full border border-zinc-200">
            <Compass className="w-5 h-5 text-blue-500" />
            <span className="text-xs font-black uppercase tracking-[0.3em] text-zinc-400">
              Gramática Española v2.0
            </span>
          </div>
        </footer>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
        body { 
          font-family: 'Inter', sans-serif; 
          background: #ffffff;
        }
      `}} />
    </div>
  );
}
