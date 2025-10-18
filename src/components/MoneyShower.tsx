import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface MoneyShowerProps {
  isActive: boolean;
}

export default function MoneyShower({ isActive }: MoneyShowerProps) {
  const [notes, setNotes] = useState<Array<{
    id: number;
    x: number;
    delay: number;
    duration: number;
    rotation: number;
    rotationEnd: number;
    size: number;
    layer: number;
    swayAmount: number;
  }>>([]);

  useEffect(() => {
    if (isActive) {
      const noteCount = 120;
      const generatedNotes = Array.from({ length: noteCount }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 1.5,
        duration: Math.random() * 4 + 5,
        rotation: Math.random() * 360,
        rotationEnd: Math.random() * 1080 - 540,
        size: Math.random() * 0.5 + 0.7,
        layer: Math.floor(Math.random() * 4),
        swayAmount: Math.random() * 150 + 50
      }));
      setNotes(generatedNotes);
    }
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      <AnimatePresence>
        {notes.map((note) => (
          <motion.div
            key={note.id}
            className="absolute"
            style={{
              left: `${note.x}%`,
              top: '-15%',
              zIndex: 40 + note.layer
            }}
            initial={{
              y: -200,
              rotate: note.rotation,
              opacity: 0,
              scale: note.size
            }}
            animate={{
              y: [0, window.innerHeight + 200],
              x: [
                0,
                Math.sin(note.id * 0.5) * note.swayAmount,
                Math.sin(note.id * 0.5 + 1) * -note.swayAmount * 0.8,
                Math.sin(note.id * 0.5 + 2) * note.swayAmount * 0.6,
                Math.sin(note.id * 0.5 + 3) * -note.swayAmount * 0.4,
                0
              ],
              rotate: [
                note.rotation,
                note.rotation + note.rotationEnd * 0.2,
                note.rotation + note.rotationEnd * 0.5,
                note.rotation + note.rotationEnd * 0.8,
                note.rotation + note.rotationEnd
              ],
              opacity: [0, 0.9, 1, 0.9, 0.7, 0.3, 0],
              scale: [
                note.size * 0.3,
                note.size * 0.9,
                note.size * 1.05,
                note.size,
                note.size * 0.95,
                note.size * 0.7,
                note.size * 0.4
              ],
              rotateY: [0, 180, 360, 540, 720],
              rotateX: [0, 20, -20, 10, 0],
              filter: [
                'brightness(1.4) drop-shadow(0 0 15px rgba(251, 191, 36, 1)) drop-shadow(0 0 30px rgba(251, 191, 36, 0.6))',
                'brightness(1.2) drop-shadow(0 0 10px rgba(251, 191, 36, 0.8)) drop-shadow(0 0 20px rgba(251, 191, 36, 0.5))',
                'brightness(1) drop-shadow(0 0 8px rgba(251, 191, 36, 0.6))',
                'brightness(0.9) drop-shadow(0 0 5px rgba(251, 191, 36, 0.4))',
                'brightness(0.7) drop-shadow(0 0 2px rgba(251, 191, 36, 0.2))'
              ]
            }}
            transition={{
              duration: note.duration,
              delay: note.delay,
              ease: [0.34, 0.91, 0.44, 0.99],
              times: [0, 0.15, 0.3, 0.5, 0.7, 0.85, 1]
            }}
            exit={{ opacity: 0 }}
          >
            <div
              className="relative"
              style={{
                transform: `perspective(1000px) rotateX(${Math.sin(note.id) * 15}deg)`
              }}
            >
              <svg
                width="120"
                height="60"
                viewBox="0 0 120 60"
                className="drop-shadow-2xl"
                style={{
                  filter: note.layer === 0 ? 'blur(0.5px)' : note.layer === 1 ? 'blur(0px)' : 'blur(1px)'
                }}
              >
                <defs>
                  <linearGradient id={`gradient-${note.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#d4af37', stopOpacity: 0.95 }} />
                    <stop offset="50%" style={{ stopColor: '#ffd700', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#c9a959', stopOpacity: 0.95 }} />
                  </linearGradient>
                  <pattern id={`pattern-${note.id}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    <circle cx="10" cy="10" r="1" fill="rgba(255,215,0,0.3)" />
                  </pattern>
                </defs>

                <rect
                  x="2"
                  y="2"
                  width="116"
                  height="56"
                  rx="4"
                  fill={`url(#gradient-${note.id})`}
                  stroke="#8b7355"
                  strokeWidth="2"
                />

                <rect
                  x="2"
                  y="2"
                  width="116"
                  height="56"
                  rx="4"
                  fill={`url(#pattern-${note.id})`}
                />

                <text
                  x="60"
                  y="20"
                  textAnchor="middle"
                  className="font-bold"
                  style={{ fontSize: '14px', fill: '#8b4513' }}
                >
                  ₹500
                </text>

                <text
                  x="60"
                  y="38"
                  textAnchor="middle"
                  className="font-semibold"
                  style={{ fontSize: '9px', fill: '#654321', opacity: 0.8 }}
                >
                  RESERVE BANK OF INDIA
                </text>

                <circle cx="25" cy="30" r="8" fill="rgba(139,69,19,0.2)" />
                <text x="25" y="34" textAnchor="middle" style={{ fontSize: '10px', fill: '#8b4513' }}>₹</text>

                <circle cx="95" cy="30" r="8" fill="rgba(139,69,19,0.2)" />
                <text x="95" y="34" textAnchor="middle" style={{ fontSize: '10px', fill: '#8b4513' }}>₹</text>

                <rect x="8" y="48" width="104" height="2" rx="1" fill="rgba(139,69,19,0.3)" />
                <rect x="8" y="10" width="104" height="2" rx="1" fill="rgba(139,69,19,0.3)" />
              </svg>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {[...Array(60)].map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 30}%`
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 2, 1.5, 0],
            opacity: [0, 1, 0.8, 0],
            rotate: [0, 360],
            y: [0, Math.random() * 400 + 200]
          }}
          transition={{
            duration: Math.random() * 2 + 1.5,
            delay: Math.random() * 4,
            repeat: 1,
            ease: 'easeOut'
          }}
        >
          <span className="text-4xl drop-shadow-[0_0_10px_rgba(251,191,36,1)]">
            {i % 3 === 0 ? '✨' : i % 3 === 1 ? '⭐' : '💫'}
          </span>
        </motion.div>
      ))}

      {[...Array(25)].map((_, i) => (
        <motion.div
          key={`coin-${i}`}
          className="absolute text-5xl"
          style={{
            left: `${Math.random() * 100}%`,
            top: '-10%',
            zIndex: 45
          }}
          initial={{ y: -50, rotate: 0, opacity: 0, scale: 0.5 }}
          animate={{
            y: window.innerHeight + 50,
            rotate: [0, 360, 720, 1080],
            opacity: [0, 1, 1, 0.8, 0],
            scale: [0.5, 1.2, 1, 0.8, 0.5],
            x: [0, Math.sin(i) * 50, Math.sin(i + 1) * -40, 0]
          }}
          transition={{
            duration: Math.random() * 3 + 4,
            delay: Math.random() * 2.5,
            ease: [0.25, 0.8, 0.5, 1]
          }}
        >
          <span className="drop-shadow-[0_0_15px_rgba(251,191,36,1)]">💰</span>
        </motion.div>
      ))}

      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`gem-${i}`}
          className="absolute text-4xl"
          style={{
            left: `${Math.random() * 100}%`,
            top: '-5%',
            zIndex: 46
          }}
          initial={{ y: -30, rotate: 0, opacity: 0 }}
          animate={{
            y: window.innerHeight + 30,
            rotate: 360,
            opacity: [0, 1, 1, 0],
            scale: [0.8, 1.2, 1, 0.8]
          }}
          transition={{
            duration: Math.random() * 4 + 5,
            delay: Math.random() * 3,
            ease: 'linear'
          }}
        >
          <span className="drop-shadow-[0_0_12px_rgba(251,191,36,0.9)]">
            {i % 2 === 0 ? '💎' : '🪙'}
          </span>
        </motion.div>
      ))}

      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{
          background: [
            'radial-gradient(circle at 50% 0%, rgba(251, 191, 36, 0.3) 0%, transparent 40%)',
            'radial-gradient(circle at 30% 20%, rgba(251, 191, 36, 0.25) 0%, transparent 40%)',
            'radial-gradient(circle at 70% 20%, rgba(251, 191, 36, 0.25) 0%, transparent 40%)',
            'radial-gradient(circle at 50% 0%, rgba(251, 191, 36, 0.3) 0%, transparent 40%)'
          ],
          opacity: [0, 0.8, 0.8, 0.6, 0]
        }}
        transition={{
          duration: 7,
          times: [0, 0.2, 0.5, 0.8, 1]
        }}
        style={{ pointerEvents: 'none', zIndex: 38 }}
      />
    </div>
  );
}
