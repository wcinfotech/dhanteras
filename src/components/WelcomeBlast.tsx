import { motion } from 'framer-motion';

interface WelcomeBlastProps {
  name: string;
}

export default function WelcomeBlast({ name }: WelcomeBlastProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-black/60 via-black/40 to-transparent backdrop-blur-md pointer-events-none"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1.2, delay: 3.5 }}
    >
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{
          scale: [0, 1.3, 0.85, 1.15, 1],
          rotate: [0, 15, -15, 8, 0]
        }}
        transition={{
          duration: 2.5,
          times: [0, 0.35, 0.55, 0.75, 1],
          ease: [0.34, 1.56, 0.64, 1]
        }}
        className="text-center px-4"
      >
        <motion.div
          className="relative"
          animate={{
            scale: [1, 1.08, 1.03, 1.08, 1],
            filter: [
              'drop-shadow(0 0 30px rgba(251, 191, 36, 1)) drop-shadow(0 0 50px rgba(251, 191, 36, 0.6))',
              'drop-shadow(0 0 50px rgba(251, 191, 36, 1.2)) drop-shadow(0 0 80px rgba(251, 191, 36, 0.8))',
              'drop-shadow(0 0 35px rgba(251, 191, 36, 1)) drop-shadow(0 0 60px rgba(251, 191, 36, 0.7))',
              'drop-shadow(0 0 50px rgba(251, 191, 36, 1.2)) drop-shadow(0 0 80px rgba(251, 191, 36, 0.8))',
              'drop-shadow(0 0 30px rgba(251, 191, 36, 1)) drop-shadow(0 0 50px rgba(251, 191, 36, 0.6))'
            ]
          }}
          transition={{
            duration: 2,
            repeat: 1,
            ease: 'easeInOut'
          }}
        >
          <motion.div
            className="absolute inset-0 blur-3xl bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 opacity-50"
            animate={{
              scale: [1, 1.5, 1, 1.5, 1],
              opacity: [0.3, 0.6, 0.4, 0.6, 0.3]
            }}
            transition={{
              duration: 2,
              repeat: 1
            }}
          />

          <h1 className="relative text-6xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-100 via-yellow-300 to-orange-300 font-great-vibes mb-4 tracking-wide">
            Welcome, {name}! 💰
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            animate={{
              opacity: [0, 1, 1],
              y: [30, 0, 0],
              scale: [0.8, 1.1, 1]
            }}
            transition={{
              delay: 1,
              duration: 1,
              times: [0, 0.6, 1]
            }}
            className="text-2xl md:text-5xl text-yellow-200 font-bold tracking-wide drop-shadow-[0_0_20px_rgba(251,191,36,1)]"
          >
            माँ लक्ष्मी का आशीर्वाद!
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="text-xl md:text-3xl text-yellow-300 font-semibold mt-2"
          >
            Goddess Lakshmi is blessing you!
          </motion.p>
        </motion.div>

        <motion.div
          className="flex justify-center gap-3 md:gap-6 mt-8"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.8, type: 'spring', stiffness: 200 }}
        >
          {[...Array(7)].map((_, i) => (
            <motion.span
              key={i}
              className="text-4xl md:text-6xl drop-shadow-[0_0_15px_rgba(251,191,36,1)]"
              animate={{
                y: [0, -30, 0],
                rotate: [0, 360],
                scale: [1, 1.3, 1]
              }}
              transition={{
                duration: 1.2,
                delay: 1.8 + i * 0.08,
                repeat: 1,
                ease: 'easeOut'
              }}
            >
              🪔
            </motion.span>
          ))}
        </motion.div>

        <motion.div
          className="flex justify-center gap-4 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
        >
          {[...Array(9)].map((_, i) => (
            <motion.span
              key={i}
              className="text-3xl"
              animate={{
                scale: [0, 1.5, 1],
                rotate: [0, 180],
                opacity: [0, 1, 1]
              }}
              transition={{
                duration: 0.8,
                delay: 2.2 + i * 0.05
              }}
            >
              {i % 3 === 0 ? '✨' : i % 3 === 1 ? '⭐' : '💫'}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>

      <div className="absolute inset-0">
        {[...Array(80)].map((_, i) => {
          const angle = (i / 80) * Math.PI * 2;
          const distance = 200 + Math.random() * 400;
          const size = Math.random() * 2 + 2;

          return (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${50}%`,
                top: `${50}%`,
                fontSize: `${size}rem`
              }}
              initial={{ scale: 0, x: 0, y: 0, opacity: 0, rotate: 0 }}
              animate={{
                scale: [0, 1.5, 0.8, 0],
                x: Math.cos(angle) * distance,
                y: Math.sin(angle) * distance,
                opacity: [0, 1, 1, 0],
                rotate: [0, 360]
              }}
              transition={{
                duration: 2.5,
                ease: [0.34, 1.56, 0.64, 1],
                times: [0, 0.3, 0.7, 1]
              }}
            >
              <span className="drop-shadow-[0_0_10px_rgba(251,191,36,1)]">
                {i % 5 === 0
                  ? '⭐'
                  : i % 5 === 1
                  ? '✨'
                  : i % 5 === 2
                  ? '💫'
                  : i % 5 === 3
                  ? '🌟'
                  : '💰'}
              </span>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        className="absolute inset-0 bg-gradient-radial from-yellow-400/30 via-orange-500/20 to-transparent"
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: [0, 2, 3],
          opacity: [0, 0.8, 0]
        }}
        transition={{
          duration: 2,
          ease: 'easeOut'
        }}
      />
    </motion.div>
  );
}
