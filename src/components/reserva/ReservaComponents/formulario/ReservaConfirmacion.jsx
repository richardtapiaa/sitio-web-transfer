import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';
import Lottie from 'lottie-react';
import { t } from '../../../../i18n/utils';

import busAnimacion from '@/assets/lottie/bus-animacion-confirmacion.json';

export default function ReservaConfirmacion({ lang, onClose }) {
  const containerRef = useRef(null);
  const busRef = useRef(null);
  const titleRef = useRef(null);
  const messageRef = useRef(null);
  const tlRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tlRef.current = tl;


      tl.from(containerRef.current, {
        y: '100%',
        duration: 0.8,
        ease: "power3.out"
      });

    });

    const timer = setTimeout(() => {
      if (tlRef.current) {

        tlRef.current.timeScale(1.5).reverse().then(() => {
          if (onClose) onClose();
        });
      } else {
        if (onClose) onClose();
      }
    }, 6000);

    return () => {
      ctx.revert();
      clearTimeout(timer);
    };
  }, [mounted, onClose]);

  if (!mounted) return null;

  return createPortal(
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/95 backdrop-blur-sm rounded-t-[3rem] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] overflow-hidden"
    >
      <div
        ref={busRef}
        className="w-80 h-80 mb-8"
      >
        <Lottie
          lottieRef={(ref) => ref && ref.play()}
          animationData={busAnimacion}
          loop={true}
          autoplay={true}
        />
      </div>

      <h3
        ref={titleRef}
        className="text-4xl md:text-5xl font-bold text-[#8BC34A] mb-4 text-center px-4"
      >
        {t(lang, 'form.success.title')}
      </h3>

      <p
        ref={messageRef}
        className="text-gray-600 text-xl md:text-2xl max-w-2xl mx-auto text-center px-4"
      >
        {t(lang, 'form.success.message')}
      </p>

      {/* Decorative Circles */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#8BC34A]/40 rounded-bl-full pointer-events-none -z-10"></div>
    </div>,
    document.body
  );
}