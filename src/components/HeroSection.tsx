import { Button } from "@/components/ui/button";
import { ArrowRight, Award, Shield, Zap } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Precision Cutting Tools for
                <span className="bg-gradient-to-r from-industrial-blue to-precision-blue bg-clip-text text-transparent">
                  {" "}Aluminum Excellence
                </span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                PCD and specialized carbide tooling that delivers superior surface finishes, 
                extended tool life, and precise cuts when machining aluminum - eliminating material 
                buildup and poor edge quality.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button variant="industrial" size="lg" className="text-lg px-8 py-6">
                View Our Tools
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="precision" size="lg" className="text-lg px-8 py-6">
                Custom Solutions
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Award className="h-8 w-8 text-precision-blue" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">Superior Finish</h3>
                <p className="text-sm text-muted-foreground">Precision surface quality</p>
              </div>
              <div className="text-center">
                <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Shield className="h-8 w-8 text-precision-blue" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">Extended Life</h3>
                <p className="text-sm text-muted-foreground">Maximum tool longevity</p>
              </div>
              <div className="text-center">
                <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Zap className="h-8 w-8 text-precision-blue" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">Zero Buildup</h3>
                <p className="text-sm text-muted-foreground">Clean cutting edges</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-precision-blue/20 to-transparent rounded-3xl"></div>
            <img 
              src={heroImage} 
              alt="ProCut Tooling precision cutting tools workshop"
              className="rounded-3xl shadow-2xl w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;