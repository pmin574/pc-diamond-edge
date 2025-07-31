import { Button } from "@/components/ui/button";
import { Cog, Phone, Mail, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";

const Header = () => {
  const { user, isAdmin, signOut } = useAuth();
  
  return (
    <header className="bg-white shadow-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-industrial-blue to-precision-blue p-2 rounded-lg">
              <Cog className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-industrial-blue">ProCut Tooling</h1>
              <p className="text-sm text-steel-gray">Precision Cutting Solutions</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#products" className="text-foreground hover:text-precision-blue transition-colors">Products</a>
            <a href="/catalogue" className="text-foreground hover:text-precision-blue transition-colors">Catalogue</a>
            <a href="#industries" className="text-foreground hover:text-precision-blue transition-colors">Industries</a>
            <a href="#services" className="text-foreground hover:text-precision-blue transition-colors">Services</a>
            <a href="#about" className="text-foreground hover:text-precision-blue transition-colors">About</a>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="hidden lg:flex items-center space-x-4 text-sm text-steel-gray">
              <div className="flex items-center space-x-1">
                <Phone className="h-4 w-4" />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-1">
                <Mail className="h-4 w-4" />
                <span>info@procuttooling.com</span>
              </div>
            </div>
            {user ? (
              <div className="flex items-center gap-2">
                {isAdmin && (
                  <Link to="/admin">
                    <Button variant="outline" size="sm">Admin</Button>
                  </Link>
                )}
                <Button variant="outline" size="sm" onClick={signOut}>
                  Sign Out
                </Button>
              </div>
            ) : (
              <Link to="/auth">
                <Button variant="outline" size="sm">
                  <User className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              </Link>
            )}
            <Button variant="quote" size="sm">
              Request Quote
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;