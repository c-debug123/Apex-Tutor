import HomeHeader from '@/components/HomeHeader';
import HeroSection from '@/components/HeroSection';
import PricingSection from '@/components/PricingSection';
import TestimonialsSection from '@/components/TestimonialsSection';

export default function Home() {
  return (
    <main
      className="min-h-screen"
      style={{
        background:
          'radial-gradient(ellipse 130% 65% at 0% 0%, #eda882 0%, #f9c8a8 28%, #fde0cc 55%, #fef3ec 80%, #fff8f5 100%)',
      }}
    >
      {/* Decorative blurred ellipse — top left */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed"
        style={{
          top: '-220px', left: '-220px',
          width: '640px', height: '640px',
          borderRadius: '50%',
          background: '#e8845a',
          filter: 'blur(120px)',
          opacity: 0.35,
          zIndex: 0,
        }}
      />
      {/* Decorative blurred ellipse — bottom right */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed"
        style={{
          bottom: '-220px', right: '-220px',
          width: '640px', height: '640px',
          borderRadius: '50%',
          background: '#f5b896',
          filter: 'blur(120px)',
          opacity: 0.35,
          zIndex: 0,
        }}
      />

      <div className="relative" style={{ zIndex: 1 }}>
        <HomeHeader />
        <HeroSection />
        <TestimonialsSection />
        <PricingSection />
      </div>
    </main>
  );
}
