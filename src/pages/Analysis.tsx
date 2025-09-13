import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';
import FitAnalysisResults from '@/components/FitAnalysisResults';
import floralDress from '@/assets/dress-floral.jpg';

const Analysis = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [analysisResults, setAnalysisResults] = useState(null);

  useEffect(() => {
    // Simulate analysis process
    const analyzeTimeout = setTimeout(() => {
      // Simulate realistic fit analysis
      const simulatedResults = {
        overall_score: 87,
        verdict: "Excellent fit! This is perfect for you.",
        measurements: {
          bust: {
            score: 92,
            status: 'Excellent',
            feedback: 'Perfect fit around the chest area'
          },
          waist: {
            score: 85,
            status: 'Excellent',
            feedback: 'Ideal waist fit with perfect ease'
          },
          hips: {
            score: 89,
            status: 'Excellent',
            feedback: 'Perfect hip fit with room to move'
          },
          length: {
            score: 82,
            status: 'Excellent',
            feedback: 'Perfect length for your height'
          }
        },
        product: {
          name: 'Elegant Floral Summer Dress',
          size: 'M',
          color: 'Floral Multi',
          fabric: 'Cotton Blend with Stretch',
          image: floralDress
        },
        recommendations: [
          "This size is ideal for your measurements",
          "The fit will be comfortable and flattering",
          "Consider this style for similar occasions"
        ]
      };

      setAnalysisResults(simulatedResults as any);
      setIsAnalyzing(false);
    }, 3000);

    return () => clearTimeout(analyzeTimeout);
  }, []);

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Fit Analysis Results
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {isAnalyzing 
              ? "Our AI is analyzing your measurements, photo, and product selection..."
              : "Here's your personalized fit analysis with detailed recommendations."}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {isAnalyzing && (
            <div className="text-center space-y-6 animate-fade-in">
              <div className="w-20 h-20 mx-auto bg-gradient-primary rounded-full flex items-center justify-center animate-pulse-glow">
                <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  AI Analysis in Progress
                </h3>
                <p className="text-muted-foreground">
                  Processing your measurements, photo, and product details...
                </p>
              </div>
            </div>
          )}
          
          <FitAnalysisResults 
            fitData={analysisResults}
            isVisible={!isAnalyzing}
          />

          {!isAnalyzing && (
            <div className="flex justify-between items-center mt-12">
              <Link to="/product-selection">
                <Button variant="outline" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Try Another Product
                </Button>
              </Link>
              
              <Link to="/">
                <Button className="bg-gradient-primary hover:shadow-glow flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
            </div>
          )}

          {/* Progress Indicator */}
          <div className="mt-12">
            <div className="flex justify-center items-center space-x-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                  ✓
                </div>
                <span className="ml-2 text-primary font-medium">Measurements</span>
              </div>
              <div className="w-12 h-0.5 bg-primary"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                  ✓
                </div>
                <span className="ml-2 text-primary font-medium">Photo</span>
              </div>
              <div className="w-12 h-0.5 bg-primary"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                  ✓
                </div>
                <span className="ml-2 text-primary font-medium">Product</span>
              </div>
              <div className="w-12 h-0.5 bg-primary"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                  4
                </div>
                <span className="ml-2 text-primary font-medium">Analysis</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analysis;