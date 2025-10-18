import { motion } from 'framer-motion';

export default function FloatingElements() {
  const elements = [
    { emoji: '🪔', size: 'text-5xl', count: 8 },
    { emoji: '💰', size: 'text-4xl', count: 6 },
    { emoji: '✨', size: 'text-3xl', count: 12 },
    { emoji: '🌟', size: 'text-4xl', count: 6 }
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {elements.map((element, categoryIndex) =>
        [...Array(element.count)].map((_, i) => {
          const randomDuration = Math.random() * 20 + 15;
          const randomDelay = Math.random() * 10;
          const randomX = Math.random() * 100;
          const randomRotate = Math.random() * 360;

          return (
            <motion.div
              key={`${categoryIndex}-${i}`}
              className={`absolute ${element.size} opacity-70`}
              style={{
                left: `${randomX}%`,
                top: '-10%'
              }}
              animate={{
                y: ['0vh', '110vh'],
                x: [0, Math.sin(i) * 50, 0],
                rotate: [randomRotate, randomRotate + 360],
                opacity: [0, 0.7, 0.7, 0]
              }}
              transition={{
                duration: randomDuration,
                repeat: Infinity,
                delay: randomDelay,
                ease: 'linear'
              }}
            >
              {element.emoji}
            </motion.div>
          );
        })
      )}

      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-2 h-2 bg-yellow-400 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
          animate={{
            scale: [0, 1.5, 0],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        />
      ))}

      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(circle at 20% 30%, rgba(251, 191, 36, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 70%, rgba(251, 191, 36, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 50% 50%, rgba(251, 191, 36, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 30%, rgba(251, 191, 36, 0.1) 0%, transparent 50%)'
          ]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
    </div>
  );
}
