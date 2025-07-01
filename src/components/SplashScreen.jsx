import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Zap } from 'lucide-react';

const SplashScreen = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 4000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background hero-pattern"
    >
      <div className="text-center space-y-8 px-4">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex items-center justify-center mb-8"
        >
          <div className="relative">
            <div className="w-64 h-24 flex items-center justify-center">
               <img src="https://storage.googleapis.com/hostinger-horizons-assets-prod/7f2c6a19-1f72-4425-92ba-0bc3d110481e/7845ad99f7d1ee296565d734621911bf.png" alt="شعار منصة مهندز" className="w-full h-full object-contain" />
            </div>
          </div>
        </motion.div>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-xl md:text-2xl text-primary max-w-2xl mx-auto leading-relaxed"
        >
          نصمم لك المستقبل بدقة وإبداع.
        </motion.p>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="text-lg text-muted-foreground max-w-xl mx-auto"
        >
          منصتك المتكاملة للخدمات الهندسية المتخصصة في المملكة العربية السعودية.
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 2 }}
        >
          <Button
            onClick={onComplete}
            className="brand-gradient text-primary-foreground hover:scale-105 transition-all duration-300 px-8 py-3 text-lg font-semibold rounded-full shadow-lg"
          >
            ابدأ الآن
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 2.5 }}
          className="flex justify-center space-x-2 space-x-reverse"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className="w-3 h-3 bg-accent rounded-full"
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SplashScreen;