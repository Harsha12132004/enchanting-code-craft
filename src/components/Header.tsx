import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shirt, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'Products', href: '/products' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <header className="relative z-50">
      <div className="glass-card rounded-3xl mx-4 mt-4 mb-8 animate-fade-in">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group cursor-pointer">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-primary rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                <div className="relative bg-gradient-primary p-3 rounded-full shadow-glow">
                  <Shirt className="h-8 w-8 text-white" />
                </div>
              </div>
              <div className="text-display-sm bg-gradient-primary bg-clip-text text-transparent font-black">
                FitMe
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="text-foreground hover:text-primary font-medium transition-all duration-300 hover:scale-105 relative group"
                >
                  <span className="relative z-10">{item.label}</span>
                  <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-10 rounded-lg blur-sm transition-opacity duration-300 -z-10"></div>
                </Link>
              ))}
            </nav>

            {/* CTA Button - Desktop */}
            <div className="hidden md:block">
              <Link to="/measurements">
                <Button className="bg-gradient-primary hover:shadow-glow hover:scale-105 transition-all duration-300 px-8 py-3 font-semibold">
                  Try Virtual Fitting
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg glass-card hover:shadow-glass transition-all duration-300"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 p-4 glass-intense rounded-2xl animate-scale-in">
              <nav className="flex flex-col space-y-4">
                {navItems.map((item, index) => (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="text-foreground hover:text-primary font-medium transition-colors duration-300 p-3 rounded-lg hover:bg-primary-light hover:bg-opacity-20"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link to="/measurements">
                  <Button className="bg-gradient-primary hover:shadow-glow transition-all duration-300 mt-4 w-full">
                    Try Virtual Fitting
                  </Button>
                </Link>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;