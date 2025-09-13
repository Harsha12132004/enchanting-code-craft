import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import floralDress from '@/assets/dress-floral.jpg';
import denimJacket from '@/assets/jacket-denim.jpg';
import heroFashion from '@/assets/hero-fashion.jpg';

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'dresses', name: 'Dresses' },
    { id: 'tops', name: 'Tops & Blouses' },
    { id: 'jackets', name: 'Jackets & Coats' },
    { id: 'pants', name: 'Pants & Jeans' }
  ];

  const products = [
    {
      id: 1,
      name: 'Elegant Floral Summer Dress',
      category: 'dresses',
      price: '$89.99',
      image: floralDress,
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['Floral Multi', 'Navy Blue', 'Black'],
      features: ['Cotton Blend', 'Machine Washable', 'Wrinkle Resistant']
    },
    {
      id: 2,
      name: 'Classic Denim Jacket',
      category: 'jackets',
      price: '$129.99',
      image: denimJacket,
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Light Blue', 'Dark Blue', 'Black Wash'],
      features: ['100% Cotton', 'Vintage Wash', 'Classic Fit']
    },
    {
      id: 3,
      name: 'Premium Silk Blouse',
      category: 'tops',
      price: '$159.99',
      image: heroFashion,
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['Ivory', 'Black', 'Navy'],
      features: ['100% Silk', 'Dry Clean Only', 'Professional Style']
    }
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Our Products
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover our curated collection of premium fashion items. Each product is optimized for our 
            virtual try-on technology to give you the most accurate fit experience.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className={`transition-all duration-300 ${
                selectedCategory === category.id 
                  ? 'bg-gradient-primary shadow-glow' 
                  : 'hover:bg-accent'
              }`}
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {filteredProducts.map((product) => (
            <div key={product.id} className="glass-card rounded-2xl overflow-hidden group hover:shadow-glow transition-all duration-300 animate-fade-in">
              <div className="relative overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-primary text-primary-foreground">New</Badge>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-foreground">{product.name}</h3>
                <p className="text-2xl font-bold text-primary mb-4">{product.price}</p>
                
                <div className="space-y-3 mb-6">
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Sizes: </span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {product.sizes.map((size) => (
                        <Badge key={size} variant="outline" className="text-xs">
                          {size}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Colors: </span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {product.colors.map((color) => (
                        <Badge key={color} variant="secondary" className="text-xs">
                          {color}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Features: </span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {product.features.map((feature) => (
                        <Badge key={feature} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                <Link to="/measurements" state={{ selectedProduct: product }}>
                  <Button className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300">
                    Try Virtual Fitting
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;