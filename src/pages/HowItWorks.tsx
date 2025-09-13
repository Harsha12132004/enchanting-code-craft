import { Camera, Ruler, Sparkles, CheckCircle } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: Ruler,
      title: "Enter Your Measurements",
      description: "Provide your body measurements for accurate fit analysis. Our system guides you through each measurement for precision.",
      color: "from-primary to-primary-glow"
    },
    {
      icon: Camera,
      title: "Upload Your Photo",
      description: "Take or upload a photo following our guidelines. Our AI analyzes your body shape and proportions.",
      color: "from-secondary to-accent"
    },
    {
      icon: Sparkles,
      title: "Select Products",
      description: "Browse our catalog and select items you want to try. Choose your preferred size and style options.",
      color: "from-accent to-primary-light"
    },
    {
      icon: CheckCircle,
      title: "Get Fit Analysis",
      description: "Receive detailed fit analysis with recommendations. Our AI provides personalized insights for the perfect fit.",
      color: "from-primary-glow to-secondary"
    }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            How It Works
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our AI-powered virtual try-on technology makes online shopping as confident as in-store shopping. 
            Here's how we revolutionize your fashion experience in four simple steps.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="text-center group animate-fade-in" style={{ animationDelay: `${index * 200}ms` }}>
              <div className="relative mb-6">
                <div className={`w-20 h-20 mx-auto bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform duration-300`}>
                  <step.icon className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {index + 1}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-4 text-foreground">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold mb-8 text-foreground">Why Choose FitMe?</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="glass-card p-6 rounded-2xl">
              <h3 className="text-xl font-semibold mb-3 text-primary">95% Accuracy</h3>
              <p className="text-muted-foreground">Our AI delivers industry-leading fit predictions with 95% accuracy rate.</p>
            </div>
            <div className="glass-card p-6 rounded-2xl">
              <h3 className="text-xl font-semibold mb-3 text-primary">60% Fewer Returns</h3>
              <p className="text-muted-foreground">Customers using FitMe return 60% fewer items due to better fit confidence.</p>
            </div>
            <div className="glass-card p-6 rounded-2xl">
              <h3 className="text-xl font-semibold mb-3 text-primary">Instant Results</h3>
              <p className="text-muted-foreground">Get comprehensive fit analysis in under 30 seconds with detailed recommendations.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;