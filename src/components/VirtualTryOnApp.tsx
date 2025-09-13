import { useState } from 'react';
import Header from './Header';
import HeroSection from './HeroSection';
import MeasurementCard from './MeasurementCard';
import PhotoUpload from './PhotoUpload';
import ProductSelection from './ProductSelection';
import FitAnalysisResults from './FitAnalysisResults';
import { useToast } from '@/hooks/use-toast';
import floralDress from '@/assets/dress-floral.jpg';

interface MeasurementData {
  height: string;
  bust: string;
  waist: string;
  hips: string;
  inseam: string;
  weight: string;
}

interface ProductSelectionData {
  category: string;
  product: string;
  size: string;
}

const VirtualTryOnApp = () => {
  const { toast } = useToast();
  const [measurements, setMeasurements] = useState<MeasurementData>({
    height: '',
    bust: '',
    waist: '',
    hips: '',
    inseam: '',
    weight: '',
  });

  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [productSelection, setProductSelection] = useState<ProductSelectionData>({
    category: '',
    product: '',
    size: '',
  });

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const handleImageUpload = (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      
      toast({
        title: "Photo uploaded successfully!",
        description: "Your photo is ready for fit analysis.",
      });
    } else {
      setUploadedImage(null);
    }
  };

  const simulateAnalysis = () => {
    // Simulate AI analysis with realistic data
    const height = parseInt(measurements.height) || 165;
    const bust = parseInt(measurements.bust) || 92;
    const waist = parseInt(measurements.waist) || 76;
    const hips = parseInt(measurements.hips) || 98;
    
    // Calculate fit scores based on measurements
    const bustScore = Math.max(60, Math.min(95, 85 + (92 - bust) * 2));
    const waistScore = Math.max(55, Math.min(98, 88 + (76 - waist) * 2.5));
    const hipsScore = Math.max(50, Math.min(96, 82 + (98 - hips) * 1.8));
    const lengthScore = height > 170 ? 75 : height < 160 ? 70 : 85;
    
    const overallScore = Math.round((bustScore + waistScore + hipsScore + lengthScore) / 4);
    
    let verdict = "Good fit!";
    let recommendations = ["This size should work well for your body type"];
    
    if (overallScore >= 85) {
      verdict = "Excellent fit! This is perfect for you.";
      recommendations = [
        "This size is ideal for your measurements",
        "The fit will be comfortable and flattering",
        "Consider this style for similar occasions"
      ];
    } else if (overallScore >= 70) {
      verdict = "Good fit with minor adjustments needed.";
      recommendations = [
        "This size will work but consider professional alterations",
        "The fit should be comfortable for most occasions",
        "Try the item on before final purchase"
      ];
    } else {
      verdict = "Consider a different size or style.";
      recommendations = [
        "This size may not provide the best fit",
        "Consider going up or down one size",
        "Look for styles with more stretch or different cuts"
      ];
    }

    return {
      overall_score: overallScore,
      verdict: verdict,
      measurements: {
        bust: {
          score: bustScore,
          status: bustScore >= 80 ? 'Excellent' : bustScore >= 60 ? 'Good' : 'Needs adjustment',
          feedback: bustScore >= 80 
            ? 'Perfect fit around the chest area'
            : bustScore >= 60 
            ? 'Comfortable fit with slight ease'
            : 'May be too tight or loose in the bust area'
        },
        waist: {
          score: waistScore,
          status: waistScore >= 80 ? 'Excellent' : waistScore >= 60 ? 'Good' : 'Needs adjustment',
          feedback: waistScore >= 80 
            ? 'Ideal waist fit with perfect ease'
            : waistScore >= 60 
            ? 'Good waist fit, comfortable'
            : 'Waist area may need alterations'
        },
        hips: {
          score: hipsScore,
          status: hipsScore >= 80 ? 'Excellent' : hipsScore >= 60 ? 'Good' : 'Needs adjustment',
          feedback: hipsScore >= 80 
            ? 'Perfect hip fit with room to move'
            : hipsScore >= 60 
            ? 'Comfortable hip area fit'
            : 'Hip area may be restrictive or loose'
        },
        length: {
          score: lengthScore,
          status: lengthScore >= 80 ? 'Excellent' : lengthScore >= 60 ? 'Good' : 'Needs adjustment',
          feedback: lengthScore >= 80 
            ? 'Perfect length for your height'
            : lengthScore >= 60 
            ? 'Good length, minor adjustments possible'
            : 'Length may need professional alterations'
        }
      },
      product: {
        name: productSelection.product === 'dress1' ? 'Elegant Floral Summer Dress' : 'Selected Product',
        size: productSelection.size.toUpperCase(),
        color: 'Floral Multi',
        fabric: 'Cotton Blend with Stretch',
        image: floralDress
      },
      recommendations: recommendations
    };
  };

  const handleAnalyze = async () => {
    if (!measurements.height || !measurements.bust || !measurements.waist || !measurements.hips) {
      toast({
        title: "Missing measurements",
        description: "Please fill in all required measurements before analyzing.",
        variant: "destructive",
      });
      return;
    }

    if (!productSelection.category || !productSelection.product || !productSelection.size) {
      toast({
        title: "Product selection incomplete",
        description: "Please select a category, product, and size.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    setShowResults(false);

    toast({
      title: "Analyzing your fit...",
      description: "Our AI is processing your measurements and photo.",
    });

    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 3000));

    const results = simulateAnalysis();
    setAnalysisResults(results as any);
    setIsAnalyzing(false);
    setShowResults(true);

    toast({
      title: "Analysis complete!",
      description: `Fit score: ${results.overall_score}% - ${results.verdict}`,
    });

    // Scroll to results
    setTimeout(() => {
      document.getElementById('results-section')?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      
      {/* Main Application */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Left Column */}
          <div className="space-y-8">
            <MeasurementCard 
              measurements={measurements}
              onMeasurementsChange={setMeasurements}
            />
            
            <PhotoUpload 
              onImageUpload={handleImageUpload}
              uploadedImage={uploadedImage}
            />
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <ProductSelection 
              selection={productSelection}
              onSelectionChange={setProductSelection}
              onAnalyze={handleAnalyze}
              isAnalyzing={isAnalyzing}
            />
          </div>
        </div>

        {/* Results Section */}
        {(isAnalyzing || showResults) && (
          <div id="results-section" className="max-w-4xl mx-auto mt-16">
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
              isVisible={showResults}
            />
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-24 py-12 border-t border-primary/10">
        <div className="container mx-auto px-6 text-center space-y-4">
          <p className="text-muted-foreground">
            © 2024 FitMe Virtual Try-On Platform. Revolutionizing online fashion shopping.
          </p>
          <p className="text-sm text-muted-foreground">
            Powered by advanced AI technology to reduce returns and enhance your shopping experience.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default VirtualTryOnApp;