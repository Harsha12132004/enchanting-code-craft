import { useState, useEffect } from 'react';
import { BarChart3, CheckCircle, AlertTriangle, XCircle, ShoppingCart, Heart, Share2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface FitData {
  overall_score: number;
  verdict: string;
  measurements: {
    bust: { score: number; status: string; feedback: string };
    waist: { score: number; status: string; feedback: string };
    hips: { score: number; status: string; feedback: string };
    length: { score: number; status: string; feedback: string };
  };
  product: {
    name: string;
    size: string;
    color: string;
    fabric: string;
    image: string;
  };
  recommendations: string[];
}

interface Props {
  fitData: FitData | null;
  isVisible: boolean;
}

const FitAnalysisResults = ({ fitData, isVisible }: Props) => {
  const [animateScore, setAnimateScore] = useState(0);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    if (fitData && isVisible) {
      // Animate score counting up
      const timer = setTimeout(() => {
        const interval = setInterval(() => {
          setAnimateScore(prev => {
            const next = prev + 2;
            if (next >= fitData.overall_score) {
              clearInterval(interval);
              return fitData.overall_score;
            }
            return next;
          });
        }, 30);
      }, 500);

      // Show details after score animation
      const detailsTimer = setTimeout(() => {
        setShowDetails(true);
      }, 2000);

      return () => {
        clearTimeout(timer);
        clearTimeout(detailsTimer);
      };
    }
  }, [fitData, isVisible]);

  if (!fitData || !isVisible) return null;

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-error';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return CheckCircle;
    if (score >= 60) return AlertTriangle;
    return XCircle;
  };

  const getProgressColor = (score: number) => {
    if (score >= 80) return 'bg-success';
    if (score >= 60) return 'bg-warning';
    return 'bg-error';
  };

  return (
    <div className="space-y-6 animate-scale-in">
      {/* Overall Fit Score */}
      <Card className="glass-card border-0 shadow-glow animate-pulse-glow">
        <CardHeader className="text-center pb-4">
          <CardTitle className="flex items-center justify-center space-x-3 text-2xl font-bold">
            <div className="p-2 rounded-xl bg-gradient-primary">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Fit Analysis Results
            </span>
          </CardTitle>
        </CardHeader>

        <CardContent className="text-center space-y-6">
          {/* Animated Score Circle */}
          <div className="relative w-32 h-32 mx-auto">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                className="text-primary/20"
              />
              {/* Progress circle */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                strokeWidth="8"
                strokeLinecap="round"
                className={getScoreColor(fitData.overall_score)}
                style={{
                  strokeDasharray: `${2 * Math.PI * 40}`,
                  strokeDashoffset: `${2 * Math.PI * 40 * (1 - animateScore / 100)}`,
                  transition: 'stroke-dashoffset 0.5s ease-in-out'
                }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className={`text-3xl font-bold ${getScoreColor(fitData.overall_score)}`}>
                  {animateScore}%
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  Fit Score
                </div>
              </div>
            </div>
          </div>

          {/* Verdict */}
          <div className="space-y-2">
            <div className="text-2xl font-bold text-foreground">
              {fitData.verdict}
            </div>
            <div className="text-muted-foreground">
              Based on your measurements and selected product
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Measurements */}
      {showDetails && (
        <Card className="glass-card border-0 shadow-glass animate-fade-in">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-foreground">
              Detailed Fit Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(fitData.measurements).map(([key, data], index) => {
              const Icon = getScoreIcon(data.score);
              return (
                <div
                  key={key}
                  className="p-4 glass-card rounded-2xl space-y-3 animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Icon className={`h-5 w-5 ${getScoreColor(data.score)}`} />
                      <span className="font-semibold text-foreground capitalize">
                        {key} Fit
                      </span>
                    </div>
                    <div className={`font-bold ${getScoreColor(data.score)}`}>
                      {data.score}%
                    </div>
                  </div>
                  
                  <Progress 
                    value={data.score} 
                    className="h-2"
                    // className={`h-2 ${getProgressColor(data.score)}`}
                  />
                  
                  <div className="text-sm text-muted-foreground">
                    {data.feedback}
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}

      {/* Product Showcase & Actions */}
      {showDetails && (
        <Card className="glass-card border-0 shadow-glass animate-fade-in">
          <CardContent className="p-6 space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Product Image */}
              <div className="w-full md:w-1/3">
                <div className="aspect-square rounded-2xl overflow-hidden shadow-float">
                  <img
                    src={fitData.product.image}
                    alt={fitData.product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Product Details */}
              <div className="flex-1 space-y-4">
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {fitData.product.name}
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Size: </span>
                      <span className="font-semibold text-primary">
                        {fitData.product.size.toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Color: </span>
                      <span className="font-semibold">{fitData.product.color}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-muted-foreground">Fabric: </span>
                      <span className="font-semibold">{fitData.product.fabric}</span>
                    </div>
                  </div>
                </div>

                {/* Recommendations */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground">Recommendations:</h4>
                  <ul className="space-y-1">
                    {fitData.recommendations.map((rec, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start space-x-2">
                        <span className="text-primary mt-1">•</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 pt-4">
                  <Button className="bg-gradient-primary hover:shadow-glow hover:scale-105 transition-all duration-300 flex-1 min-w-[140px]">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </Button>
                  <Button variant="outline" className="border-primary/30 hover:border-primary hover:bg-primary/10">
                    <Heart className="mr-2 h-4 w-4" />
                    Save
                  </Button>
                  <Button variant="outline" className="border-primary/30 hover:border-primary hover:bg-primary/10">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FitAnalysisResults;