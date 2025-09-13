import { useState } from 'react';
import { User, Ruler, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface MeasurementData {
  height: string;
  bust: string;
  waist: string;
  hips: string;
  inseam: string;
  weight: string;
}

interface Props {
  measurements: MeasurementData;
  onMeasurementsChange: (measurements: MeasurementData) => void;
}

const MeasurementCard = ({ measurements, onMeasurementsChange }: Props) => {
  const [activeField, setActiveField] = useState<string | null>(null);

  const handleInputChange = (field: keyof MeasurementData, value: string) => {
    onMeasurementsChange({
      ...measurements,
      [field]: value
    });
  };

  const measurementFields = [
    { 
      key: 'height' as keyof MeasurementData, 
      label: 'Height', 
      placeholder: 'Enter your height',
      unit: 'cm',
      tip: 'Stand straight against a wall'
    },
    { 
      key: 'bust' as keyof MeasurementData, 
      label: 'Bust', 
      placeholder: 'Bust measurement',
      unit: 'cm',
      tip: 'Measure around the fullest part'
    },
    { 
      key: 'waist' as keyof MeasurementData, 
      label: 'Waist', 
      placeholder: 'Waist measurement',
      unit: 'cm',
      tip: 'Measure at your natural waistline'
    },
    { 
      key: 'hips' as keyof MeasurementData, 
      label: 'Hips', 
      placeholder: 'Hips measurement',
      unit: 'cm',
      tip: 'Measure around the fullest part of your hips'
    },
    { 
      key: 'inseam' as keyof MeasurementData, 
      label: 'Inseam', 
      placeholder: 'Inseam measurement',
      unit: 'cm',
      tip: 'Inside leg measurement from crotch to ankle'
    },
    { 
      key: 'weight' as keyof MeasurementData, 
      label: 'Weight', 
      placeholder: 'Enter your weight',
      unit: 'kg',
      tip: 'Optional but helps with fit accuracy'
    }
  ];

  const loadDemoData = () => {
    onMeasurementsChange({
      height: '165',
      bust: '92',
      waist: '76',
      hips: '98',
      inseam: '78',
      weight: '65'
    });
  };

  return (
    <Card className="glass-card border-0 shadow-glass hover:shadow-glow transition-all duration-500 animate-scale-in">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-3 text-2xl font-bold">
          <div className="p-2 rounded-xl bg-gradient-primary">
            <User className="h-6 w-6 text-white" />
          </div>
          <span className="bg-gradient-primary bg-clip-text text-transparent">
            Your Measurements
          </span>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Height - Full Width */}
        <div className="space-y-2">
          <Label 
            htmlFor={measurementFields[0].key}
            className="text-sm font-semibold text-foreground flex items-center space-x-2"
          >
            <Ruler className="h-4 w-4 text-primary" />
            <span>{measurementFields[0].label}</span>
            <span className="text-xs text-muted-foreground">({measurementFields[0].unit})</span>
          </Label>
          <div className="relative group">
            <Input
              id={measurementFields[0].key}
              type="number"
              placeholder={measurementFields[0].placeholder}
              value={measurements[measurementFields[0].key]}
              onChange={(e) => handleInputChange(measurementFields[0].key, e.target.value)}
              onFocus={() => setActiveField(measurementFields[0].key)}
              onBlur={() => setActiveField(null)}
              className="text-lg font-medium transition-all duration-300 focus:shadow-glow border-primary/20 focus:border-primary"
            />
            {activeField === measurementFields[0].key && (
              <div className="absolute top-full left-0 mt-2 p-3 glass-intense rounded-lg text-sm animate-fade-in z-10">
                <div className="flex items-center space-x-2 text-primary">
                  <Info className="h-4 w-4" />
                  <span>{measurementFields[0].tip}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Body Measurements Grid */}
        <div className="grid grid-cols-2 gap-4">
          {measurementFields.slice(1, 5).map((field) => (
            <div key={field.key} className="space-y-2">
              <Label 
                htmlFor={field.key}
                className="text-sm font-semibold text-foreground flex items-center space-x-1"
              >
                <span>{field.label}</span>
                <span className="text-xs text-muted-foreground">({field.unit})</span>
              </Label>
              <div className="relative group">
                <Input
                  id={field.key}
                  type="number"
                  placeholder={field.placeholder}
                  value={measurements[field.key]}
                  onChange={(e) => handleInputChange(field.key, e.target.value)}
                  onFocus={() => setActiveField(field.key)}
                  onBlur={() => setActiveField(null)}
                  className="transition-all duration-300 focus:shadow-glass border-primary/20 focus:border-primary"
                />
                {activeField === field.key && (
                  <div className="absolute top-full left-0 mt-2 p-3 glass-intense rounded-lg text-sm animate-fade-in z-10 min-w-max">
                    <div className="flex items-center space-x-2 text-primary">
                      <Info className="h-4 w-4" />
                      <span>{field.tip}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Weight - Full Width */}
        <div className="space-y-2">
          <Label 
            htmlFor={measurementFields[5].key}
            className="text-sm font-semibold text-foreground flex items-center space-x-2"
          >
            <span>{measurementFields[5].label}</span>
            <span className="text-xs text-muted-foreground">({measurementFields[5].unit})</span>
          </Label>
          <div className="relative group">
            <Input
              id={measurementFields[5].key}
              type="number"
              placeholder={measurementFields[5].placeholder}
              value={measurements[measurementFields[5].key]}
              onChange={(e) => handleInputChange(measurementFields[5].key, e.target.value)}
              onFocus={() => setActiveField(measurementFields[5].key)}
              onBlur={() => setActiveField(null)}
              className="transition-all duration-300 focus:shadow-glass border-primary/20 focus:border-primary"
            />
            {activeField === measurementFields[5].key && (
              <div className="absolute top-full left-0 mt-2 p-3 glass-intense rounded-lg text-sm animate-fade-in z-10">
                <div className="flex items-center space-x-2 text-primary">
                  <Info className="h-4 w-4" />
                  <span>{measurementFields[5].tip}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Demo Data Button */}
        <Button
          variant="outline"
          onClick={loadDemoData}
          className="w-full border-primary/30 text-primary hover:bg-primary/10 hover:border-primary transition-all duration-300"
        >
          Load Sample Data
        </Button>
      </CardContent>
    </Card>
  );
};

export default MeasurementCard;