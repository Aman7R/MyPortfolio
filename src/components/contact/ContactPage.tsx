import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useThemeStore } from '../../stores';

interface ContactPageProps {
  onBack: () => void;
}

const ContactPage = ({ onBack }: ContactPageProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const themeColor = useThemeStore((state) => state.theme.color);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    description: ''
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Entrance animation
    gsap.fromTo(containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: 'power2.out' }
    );

    gsap.fromTo('.contact-title span',
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power3.out', delay: 0.3 }
    );

    gsap.fromTo('.contact-form-container',
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.6 }
    );

    gsap.fromTo('.back-button',
      { x: -30, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.8 }
    );
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Animate form submission
    gsap.to(formRef.current, {
      scale: 0.98,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        setSubmitted(true);
        // Reset form after delay
        setTimeout(() => {
          setFormData({ name: '', email: '', description: '' });
          setSubmitted(false);
        }, 3000);
      }
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleBack = () => {
    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.inOut',
      onComplete: onBack
    });
  };

  return (
    <div 
      ref={containerRef}
      className="contact-page"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: themeColor,
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 600'%3E%3Cfilter id='a'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23a)'/%3E%3C/svg%3E\")",
        backgroundBlendMode: 'soft-light',
        backgroundRepeat: 'repeat',
        backgroundSize: '100px',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Back Button */}
      <button 
        className="back-button"
        onClick={handleBack}
        style={{
          position: 'absolute',
          top: '2rem',
          left: '2rem',
          background: 'transparent',
          border: 'none',
          color: 'white',
          fontFamily: 'var(--font-vercetti), sans-serif',
          fontSize: '1rem',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem 1rem',
          transition: 'opacity 0.3s ease',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.7'; }}
        onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
      >
        <span style={{ fontSize: '1.2rem' }}>←</span> BACK
      </button>

      {/* Title */}
      <h1 className="contact-title" style={{
        fontFamily: 'var(--font-soria), serif',
        fontSize: 'clamp(2.5rem, 8vw, 5rem)',
        color: 'white',
        marginBottom: '3rem',
        textAlign: 'center',
        letterSpacing: '0.05em',
      }}>
        {'Get In Touch'.split('').map((char, i) => (
          <span key={i} style={{ display: 'inline-block' }}>
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </h1>

      {/* Form Container */}
      <div className="contact-form-container" style={{
        width: '90%',
        maxWidth: '600px',
        padding: '3rem',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}>
        {submitted ? (
          <div style={{
            textAlign: 'center',
            color: 'white',
            fontFamily: 'var(--font-vercetti), sans-serif',
          }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Thank You!</h2>
            <p style={{ fontSize: '1.1rem', opacity: 0.8 }}>Your message has been sent successfully.</p>
          </div>
        ) : (
          <form ref={formRef} onSubmit={handleSubmit} style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
          }}>
            {/* Name Field */}
            <div className="form-group">
              <label 
                htmlFor="name"
                style={{
                  display: 'block',
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontFamily: 'var(--font-vercetti), sans-serif',
                  fontSize: '0.9rem',
                  marginBottom: '0.5rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '1rem 1.5rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '10px',
                  color: 'white',
                  fontFamily: 'var(--font-vercetti), sans-serif',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)';
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                }}
              />
            </div>

            {/* Email Field */}
            <div className="form-group">
              <label 
                htmlFor="email"
                style={{
                  display: 'block',
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontFamily: 'var(--font-vercetti), sans-serif',
                  fontSize: '0.9rem',
                  marginBottom: '0.5rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '1rem 1.5rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '10px',
                  color: 'white',
                  fontFamily: 'var(--font-vercetti), sans-serif',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)';
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                }}
              />
            </div>

            {/* Description Field */}
            <div className="form-group">
              <label 
                htmlFor="description"
                style={{
                  display: 'block',
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontFamily: 'var(--font-vercetti), sans-serif',
                  fontSize: '0.9rem',
                  marginBottom: '0.5rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                Message
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={5}
                style={{
                  width: '100%',
                  padding: '1rem 1.5rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '10px',
                  color: 'white',
                  fontFamily: 'var(--font-vercetti), sans-serif',
                  fontSize: '1rem',
                  outline: 'none',
                  resize: 'vertical',
                  minHeight: '120px',
                  transition: 'all 0.3s ease',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)';
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                }}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              style={{
                padding: '1rem 3rem',
                backgroundColor: 'white',
                color: themeColor,
                border: 'none',
                borderRadius: '50px',
                fontFamily: 'var(--font-soria), serif',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                transition: 'all 0.3s ease',
                marginTop: '1rem',
                alignSelf: 'center',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Send Message
            </button>
          </form>
        )}
      </div>

      {/* Footer Text */}
      <p style={{
        position: 'absolute',
        bottom: '2rem',
        color: 'rgba(255, 255, 255, 0.5)',
        fontFamily: 'var(--font-vercetti), sans-serif',
        fontSize: '0.9rem',
        textAlign: 'center',
      }}>
        More projects on my <a href="https://linktr.ee/real_aman.26?/" target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'underline' }}>Linktree</a>
      </p>
    </div>
  );
};

export default ContactPage;
