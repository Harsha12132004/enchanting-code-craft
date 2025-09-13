import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import HeroSection from '@/components/HeroSection';

const Home = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      
      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-b from-background to-accent/20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Ready to Transform Your Shopping Experience?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have revolutionized their online shopping with our AI-powered virtual try-on technology.
          </p>
          <Link to="/measurements">
            <Button className="bg-gradient-primary hover:shadow-glow hover:scale-105 transition-all duration-300 px-12 py-4 text-lg font-semibold">
              Start Virtual Fitting
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;