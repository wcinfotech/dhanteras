import { motion } from 'framer-motion';
import { Sparkles, Download, Share2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import Lottie from 'lottie-react';
import FloatingElements from './FloatingElements';
import MoneyShower from './MoneyShower';
import WelcomeBlast from './WelcomeBlast';

interface WishScreenProps {
  name: string;
}

export default function WishScreen({ name }: WishScreenProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const moneyAudioRef = useRef<HTMLAudioElement>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showMoneyShower, setShowMoneyShower] = useState(true);
  const [showWelcome, setShowWelcome] = useState(true);
  const [lottieData, setLottieData] = useState(null);

  useEffect(() => {
    fetch('https://lottie.host/b6d4d3c6-0f3e-4b7f-8c6b-e3d4c3b6d3c6/KHJhZjY3MjQ.json')
      .then(res => res.json())
      .then(data => setLottieData(data))
      .catch(() => {});

    setShowConfetti(true);
    const confettiTimer = setTimeout(() => setShowConfetti(false), 5000);

    const moneyTimer = setTimeout(() => setShowMoneyShower(false), 7000);
    const welcomeTimer = setTimeout(() => setShowWelcome(false), 4000);

    return () => {
      clearTimeout(confettiTimer);
      clearTimeout(moneyTimer);
      clearTimeout(welcomeTimer);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
    if (moneyAudioRef.current) {
      moneyAudioRef.current.play().catch(() => {});
      setTimeout(() => {
        if (moneyAudioRef.current) {
          moneyAudioRef.current.pause();
        }
      }, 7000);
    }
  }, []);

  const blessings = [
    "May your life glow brighter than a thousand diyas",
    "May prosperity and happiness fill your home",
    "May Goddess Lakshmi shower endless blessings upon you",
    "May your wealth multiply like the stars in the sky",
    "May this Dhanteras bring you peace and abundance"
  ];

  const randomBlessing = blessings[Math.floor(Math.random() * blessings.length)];

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: '🪔 Happy Dhanteras',
          text: `Happy Dhanteras to ${name}! May this festival bring prosperity and joy!`,
          url: window.location.href
        });
      } catch (err) {
        console.log('Share failed:', err);
      }
    } else {
      const text = `🪔 Happy Dhanteras ${name}! 🪔\nMay Goddess Lakshmi bless you with prosperity!\n${window.location.href}`;
      navigator.clipboard.writeText(text);
      alert('Wishes copied to clipboard!');
    }
  };

  const handleDownload = () => {
    alert('Screenshot feature: Use your device screenshot tool to capture and share these beautiful wishes!');
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-amber-900 via-orange-800 to-red-900">
      <audio ref={audioRef} loop>
        <source src="https://cdn.pixabay.com/download/audio/2022/03/10/audio_4c3d0f4e16.mp3" type="audio/mpeg" />
      </audio>

      <audio ref={moneyAudioRef}>
        <source src="https://cdn.pixabay.com/download/audio/2022/03/24/audio_c23d2f6b47.mp3" type="audio/mpeg" />
      </audio>

      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjE1LDAsMC4xKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>

      {showWelcome && <WelcomeBlast name={name} />}

      <MoneyShower isActive={showMoneyShower} />

      <FloatingElements />

      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl"
              initial={{
                x: Math.random() * window.innerWidth,
                y: -50,
                rotate: 0,
                opacity: 1
              }}
              animate={{
                y: window.innerHeight + 50,
                rotate: 360,
                opacity: 0
              }}
              transition={{
                duration: Math.random() * 2 + 2,
                ease: "linear"
              }}
            >
              {i % 4 === 0 ? '🎊' : i % 4 === 1 ? '✨' : i % 4 === 2 ? '🎉' : '⭐'}
            </motion.div>
          ))}
        </div>
      )}

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="w-full max-w-2xl"
        >
          {lottieData && (
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="w-48 h-48 md:w-64 md:h-64 mx-auto mb-8"
            >
              <Lottie animationData={lottieData} loop={true} />
            </motion.div>
          )}

          {!lottieData && (
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-9xl text-center mb-8 glow-animation"
            >
              🪔
            </motion.div>
          )}

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border-2 border-yellow-400/30"
          >
            <motion.h1
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-4xl md:text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-orange-400 mb-6 font-great-vibes"
            >
              🪔 Happy Dhanteras, {name}! 🪔
            </motion.h1>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="text-center space-y-4 mb-8"
            >
              <p className="text-2xl md:text-3xl text-yellow-100 leading-relaxed">
                आपका दिन शुभ रहे,<br />
                आपके ऊपर माँ लक्ष्मी की खूब कृपा रहे,<br />
                आप खूब तरक्की करें 💰
              </p>

              <p className="text-xl md:text-2xl text-yellow-200 leading-relaxed mt-6">
                आपके पास इतना पैसा हो कि समझ में न आए<br />
                कि बैंक में रखें या बैंक ही बना लें 😄
              </p>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.2, type: "spring" }}
                className="mt-8 p-6 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-2xl border border-yellow-400/50"
              >
                <Sparkles className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
                <p className="text-lg md:text-xl text-yellow-100 italic">
                  "{randomBlessing}"
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleShare}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold rounded-xl shadow-2xl hover:shadow-yellow-500/50 transition-all"
              >
                <Share2 className="w-5 h-5" />
                Share My Wishes
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDownload}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl shadow-2xl hover:shadow-orange-500/50 transition-all"
              >
                <Download className="w-5 h-5" />
                Download
              </motion.button>
            </motion.div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
            className="mt-8 text-center text-yellow-200/80 text-sm"
          >
            Crafted with devotion by WC Infotech (Aanand Palan)
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
