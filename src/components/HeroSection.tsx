import { ArrowRight, Sparkles, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-fashion.jpg';

const HeroSection = () => {
  const features = [
    { icon: Sparkles, text: "AI-Powered Fit Analysis" },
    { icon: Zap, text: "Instant Results" },
  ];

  return (
    <section className="relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Luxury Fashion Studio" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background/50 to-primary-glow/20"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8 animate-slide-up">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 glass-card px-4 py-2 rounded-full">
              <Sparkles className="h-4 w-4 text-primary animate-pulse" />
              <span className="text-sm font-medium text-primary">Revolutionary Fashion Tech</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-display-xl leading-none">
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Virtual Try-On
                </span>
                <br />
                <span className="text-foreground">
                  That Fits
                </span>
                <br />
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Perfectly
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                Experience the future of online fashion shopping with AI-powered fit analysis that eliminates guesswork and reduces returns.
              </p>
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-4">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-center space-x-2 glass-card px-4 py-2 rounded-full animate-fade-in"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <feature.icon className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg"
                className="bg-gradient-primary hover:shadow-glow hover:scale-105 transition-all duration-300 group px-8 py-4 text-lg font-semibold"
              >
                Start Virtual Fitting
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
              
              <Button 
                variant="outline"
                size="lg"
                className="border-2 border-primary/20 hover:border-primary hover:bg-primary/10 transition-all duration-300 px-8 py-4 text-lg font-semibold"
              >
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              {[
                { value: "98%", label: "Fit Accuracy" },
                { value: "50%", label: "Return Reduction" },
                { value: "2M+", label: "Happy Customers" },
              ].map((stat, index) => (
                <div 
                  key={index}
                  className="text-center animate-fade-in"
                  style={{ animationDelay: `${600 + index * 200}ms` }}
                >
                  <div className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Floating Cards */}
          <div className="relative lg:block hidden">
            <div className="relative h-96">
              {/* Floating Fashion Cards */}
              <div className="absolute top-0 right-0 glass-card p-6 rounded-3xl animate-float">
                <div className="w-24 h-32 bg-gradient-primary rounded-2xl opacity-20"></div>
                <div className="mt-3 space-y-2">
                  <div className="h-2 bg-primary/30 rounded w-16"></div>
                  <div className="h-2 bg-primary/20 rounded w-12"></div>
                </div>
              </div>
              
              <div 
                className="absolute top-20 left-8 glass-intense p-6 rounded-3xl animate-float"
                style={{ animationDelay: '-2s' }}
              >
                <div className="w-20 h-28 bg-gradient-to-br from-primary-glow to-primary rounded-2xl opacity-30"></div>
                <div className="mt-3 space-y-2">
                  <div className="h-2 bg-primary/40 rounded w-14"></div>
                  <div className="h-2 bg-primary/25 rounded w-10"></div>
                </div>
              </div>
              
              <div 
                className="absolute bottom-8 right-12 glass-card p-6 rounded-3xl animate-float"
                style={{ animationDelay: '-4s' }}
              >
                <div className="w-22 h-30 bg-gradient-to-tl from-primary to-primary-light rounded-2xl opacity-25"></div>
                <div className="mt-3 space-y-2">
                  <div className="h-2 bg-primary/35 rounded w-18"></div>
                  <div className="h-2 bg-primary/20 rounded w-14"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse-glow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-primary-glow/10 rounded-full blur-3xl animate-pulse-glow"></div>
    </section>
  );
};

export default HeroSection;