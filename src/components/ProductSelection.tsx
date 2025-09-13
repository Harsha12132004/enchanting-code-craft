import { useState } from 'react';
import { ShoppingBag, Search, Filter, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import floralDress from '@/assets/dress-floral.jpg';
import denimJacket from '@/assets/jacket-denim.jpg';

interface ProductSelectionData {
  category: string;
  product: string;
  size: string;
}

interface Props {
  selection: ProductSelectionData;
  onSelectionChange: (selection: ProductSelectionData) => void;
  onAnalyze: () => void;
  isAnalyzing?: boolean;
}

const ProductSelection = ({ selection, onSelectionChange, onAnalyze, isAnalyzing = false }: Props) => {
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  const categories = [
    { value: 'dresses', label: 'Dresses', icon: '👗' },
    { value: 'tops', label: 'Tops & Shirts', icon: '👕' },
    { value: 'pants', label: 'Pants & Trousers', icon: '👖' },
    { value: 'jeans', label: 'Jeans', icon: '👖' },
    { value: 'outerwear', label: 'Outerwear', icon: '🧥' },
  ];

  const productsByCategory: { [key: string]: Array<{value: string, label: string, image?: string}> } = {
    dresses: [
      { value: 'dress1', label: 'Elegant Floral Summer Dress', image: floralDress },
      { value: 'dress2', label: 'Formal Evening Gown' },
      { value: 'dress3', label: 'Casual Midi Dress' },
    ],
    tops: [
      { value: 'top1', label: 'Slim Fit Cotton Shirt' },
      { value: 'top2', label: 'Casual Button-Up Blouse' },
      { value: 'top3', label: 'Professional Blazer' },
    ],
    pants: [
      { value: 'pants1', label: 'Classic Straight Trousers' },
      { value: 'pants2', label: 'High-Waist Office Pants' },
      { value: 'pants3', label: 'Casual Chinos' },
    ],
    jeans: [
      { value: 'jeans1', label: 'Premium Skinny Jeans' },
      { value: 'jeans2', label: 'Relaxed Straight Leg Jeans' },
      { value: 'jeans3', label: 'High-Rise Bootcut Jeans' },
    ],
    outerwear: [
      { value: 'jacket1', label: 'Classic Denim Jacket', image: denimJacket },
      { value: 'jacket2', label: 'Winter Wool Coat' },
      { value: 'jacket3', label: 'Leather Bomber Jacket' },
    ],
  };

  const sizes = [
    { value: 'xs', label: 'XS', description: 'Extra Small' },
    { value: 's', label: 'S', description: 'Small' },
    { value: 'm', label: 'M', description: 'Medium' },
    { value: 'l', label: 'L', description: 'Large' },
    { value: 'xl', label: 'XL', description: 'Extra Large' },
  ];

  const handleSelectionChange = (field: keyof ProductSelectionData, value: string) => {
    const newSelection = { ...selection, [field]: value };
    
    // Reset product and size when category changes
    if (field === 'category') {
      newSelection.product = '';
      newSelection.size = '';
    }
    
    onSelectionChange(newSelection);
  };

  const currentProducts = selection.category ? productsByCategory[selection.category] || [] : [];
  const isReadyToAnalyze = selection.category && selection.product && selection.size;

  return (
    <Card className="glass-card border-0 shadow-glass hover:shadow-glow transition-all duration-500 animate-scale-in">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-3 text-2xl font-bold">
          <div className="p-2 rounded-xl bg-gradient-primary">
            <ShoppingBag className="h-6 w-6 text-white" />
          </div>
          <span className="bg-gradient-primary bg-clip-text text-transparent">
            Product Selection
          </span>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Category Selection */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold text-foreground flex items-center space-x-2">
            <Filter className="h-4 w-4 text-primary" />
            <span>Category</span>
          </Label>
          <Select 
            value={selection.category} 
            onValueChange={(value) => handleSelectionChange('category', value)}
          >
            <SelectTrigger className="h-12 border-primary/20 focus:border-primary focus:ring-primary/20 transition-all duration-300">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent className="glass-card border-primary/20">
              {categories.map((category) => (
                <SelectItem 
                  key={category.value} 
                  value={category.value}
                  className="hover:bg-primary/10 focus:bg-primary/10"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{category.icon}</span>
                    <span className="font-medium">{category.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Product Selection */}
        {currentProducts.length > 0 && (
          <div className="space-y-3 animate-fade-in">
            <Label className="text-sm font-semibold text-foreground flex items-center space-x-2">
              <Search className="h-4 w-4 text-primary" />
              <span>Product</span>
            </Label>
            <div className="space-y-2">
              {currentProducts.map((product) => (
                <div
                  key={product.value}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                    selection.product === product.value
                      ? 'border-primary bg-primary/10 shadow-glow'
                      : 'border-primary/20 hover:border-primary/40 hover:bg-primary/5'
                  }`}
                  onClick={() => handleSelectionChange('product', product.value)}
                  onMouseEnter={() => setHoveredProduct(product.value)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  <div className="flex items-center space-x-3">
                    {product.image && (
                      <div className="w-12 h-12 rounded-lg overflow-hidden shadow-md">
                        <img 
                          src={product.image} 
                          alt={product.label}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="font-semibold text-foreground">{product.label}</div>
                      {hoveredProduct === product.value && (
                        <div className="text-sm text-primary animate-fade-in">
                          Click to select this product
                        </div>
                      )}
                    </div>
                    {selection.product === product.value && (
                      <div className="p-1 rounded-full bg-gradient-primary">
                        <Sparkles className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Size Selection */}
        {selection.product && (
          <div className="space-y-3 animate-fade-in">
            <Label className="text-sm font-semibold text-foreground">Size</Label>
            <div className="grid grid-cols-5 gap-3">
              {sizes.map((size) => (
                <button
                  key={size.value}
                  onClick={() => handleSelectionChange('size', size.value)}
                  className={`p-4 rounded-xl text-center transition-all duration-300 border-2 ${
                    selection.size === size.value
                      ? 'border-primary bg-gradient-primary text-white shadow-glow scale-105'
                      : 'border-primary/20 hover:border-primary hover:bg-primary/10 hover:scale-105'
                  }`}
                >
                  <div className="font-bold text-lg">{size.label}</div>
                  <div className="text-xs opacity-75">{size.description}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Analyze Button */}
        <div className="pt-4 border-t border-primary/20">
          <Button
            onClick={onAnalyze}
            disabled={!isReadyToAnalyze || isAnalyzing}
            className={`w-full h-14 text-lg font-semibold transition-all duration-300 ${
              isReadyToAnalyze
                ? 'bg-gradient-primary hover:shadow-glow hover:scale-105'
                : 'bg-muted text-muted-foreground cursor-not-allowed'
            }`}
          >
            {isAnalyzing ? (
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Analyzing Your Fit...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Sparkles className="h-5 w-5" />
                <span>Analyze Perfect Fit</span>
              </div>
            )}
          </Button>
        </div>

        {!isReadyToAnalyze && (
          <div className="text-center text-sm text-muted-foreground">
            Select category, product, and size to start analysis
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductSelection;