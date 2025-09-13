import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import MeasurementCard from '@/components/MeasurementCard';

interface MeasurementData {
  height: string;
  bust: string;
  waist: string;
  hips: string;
  inseam: string;
  weight: string;
}

const Measurements = () => {
  const [measurements, setMeasurements] = useState<MeasurementData>({
    height: '',
    bust: '',
    waist: '',
    hips: '',
    inseam: '',
    weight: '',
  });

  const isFormComplete = measurements.height && measurements.bust && 
                         measurements.waist && measurements.hips;

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Your Measurements
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Enter your body measurements for the most accurate fit analysis. 
            Our AI uses this information to provide personalized size recommendations.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <MeasurementCard 
            measurements={measurements}
            onMeasurementsChange={setMeasurements}
          />
          
          {/* Navigation */}
          <div className="flex justify-between items-center mt-8">
            <Link to="/products">
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Products
              </Button>
            </Link>
            
            <Link to="/photo-upload">
              <Button 
                className={`flex items-center gap-2 ${
                  isFormComplete 
                    ? 'bg-gradient-primary hover:shadow-glow' 
                    : 'opacity-50 cursor-not-allowed'
                }`}
                disabled={!isFormComplete}
              >
                Next: Upload Photo
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Progress Indicator */}
          <div className="mt-12">
            <div className="flex justify-center items-center space-x-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                  1
                </div>
                <span className="ml-2 text-primary font-medium">Measurements</span>
              </div>
              <div className="w-12 h-0.5 bg-muted"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center text-muted-foreground font-bold text-sm">
                  2
                </div>
                <span className="ml-2 text-muted-foreground">Photo</span>
              </div>
              <div className="w-12 h-0.5 bg-muted"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center text-muted-foreground font-bold text-sm">
                  3
                </div>
                <span className="ml-2 text-muted-foreground">Product</span>
              </div>
              <div className="w-12 h-0.5 bg-muted"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center text-muted-foreground font-bold text-sm">
                  4
                </div>
                <span className="ml-2 text-muted-foreground">Analysis</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Measurements;