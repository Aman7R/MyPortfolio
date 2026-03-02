import { usePortalStore, useThemeStore } from '../../stores';
import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';

interface AwwardsBadgeProps {
  onContactClick?: () => void;
}

const AwwardsBadge = ({ onContactClick }: AwwardsBadgeProps) => {
  const badgeRef = useRef<HTMLDivElement>(null);
  const isPortalActive = usePortalStore((state) => !!state.activePortalId);
  const color = useThemeStore((state) => state.theme.color);
  const [loaded, setLoaded] = useState(false);
  const [startAnimation, setStartAnimation] = useState(false);

  // Simulate loading completion
  useEffect(() => { 
    setTimeout(() => setLoaded(true), 3000);
  }, []);

  useEffect(() => {
    if (loaded) {
      gsap.to(badgeRef.current, {
        duration: 2,
        delay: 2,
        right: 0,
        onComplete: () => setStartAnimation(true),
      });
    }
  }, [loaded]);

  useEffect(() => {
    if (isPortalActive) return;
    if (startAnimation && badgeRef.current) {
      gsap.to(badgeRef.current, {
        right: 0,
        duration: 0,
        ease: 'power2.out',
      });
    }

    return () => {
      gsap.killTweensOf(badgeRef.current);
    }
  }, [startAnimation, isPortalActive]);

  useEffect(() => {
    if (!badgeRef.current) return;
    badgeRef.current.style.scale = window.innerWidth < 768 ? '0.7' : '0.9';
  }, []);

  const handleClick = () => {
    if (onContactClick) {
      onContactClick();
    }
  };

  return (
    <div
      id="contact-badge"
      ref={badgeRef}
      onClick={handleClick}
      style={{
        position: 'fixed',
        zIndex: 999,
        transform: 'translateY(-50%)',
        transformOrigin: 'right top',
        top: '50%',
        right: -100,
        cursor: 'pointer',
      }}
    >
      <div 
        style={{
          width: '53.08px',
          height: '171.358px',
          backgroundColor: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          writingMode: 'vertical-rl',
          textOrientation: 'mixed',
          transform: 'rotate(180deg)',
        }}
      >
        <span 
          style={{
            fontFamily: 'var(--font-soria), serif',
            fontSize: '14px',
            fontWeight: 'bold',
            color: color,
            letterSpacing: '2px',
            textTransform: 'uppercase',
          }}
        >
          Contact Us
        </span>
      </div>
    </div>
  );
}

export default AwwardsBadge;
