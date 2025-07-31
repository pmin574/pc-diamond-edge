import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Diamond, Wrench, RotateCcw, Layers } from "lucide-react";
import cuttingToolsImage from "@/assets/cutting-tools.jpg";

const ProductsSection = () => {
  const products = [
    {
      icon: Diamond,
      title: "PCD Cutting Tools",
      description: "Polycrystalline diamond tooling for superior aluminum cutting performance",
      features: ["Superior surface finish", "Extended tool life", "Reduced cutting forces", "Optimal chip evacuation"]
    },
    {
      icon: Layers,
      title: "Premium Carbide Tools",
      description: "Specialized carbide grades engineered for non-ferrous materials",
      features: ["Anti-buildup edge geometry", "Precision ground surfaces", "Various coatings available", "Custom geometries"]
    },
    {
      icon: Wrench,
      title: "Insert Tooling",
      description: "Profiled inserts and holders for high-volume aluminum processing",
      features: ["Quick tool changes", "Consistent performance", "Cost-effective operation", "Standard & custom profiles"]
    },
    {
      icon: RotateCcw,
      title: "Tool Services",
      description: "Complete lifecycle support with retipping and sharpening services",
      features: ["Expert reconditioning", "Quality inspection", "Fast turnaround", "Performance optimization"]
    }
  ];

  return (
    <section id="products" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Cutting-Edge Solutions for Aluminum Processing
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From PCD router bits to specialized carbide end mills, our tools are engineered 
            to eliminate the challenges of aluminum machining.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="relative">
            <img 
              src={cuttingToolsImage} 
              alt="PCD and carbide cutting tools for aluminum"
              className="rounded-2xl shadow-xl w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-industrial-blue/10 to-transparent rounded-2xl"></div>
          </div>
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-foreground">
              Engineered for Aluminum Excellence
            </h3>
            <p className="text-lg text-muted-foreground">
              Our cutting tools feature specialized geometries and premium materials 
              specifically designed to handle aluminum's unique machining characteristics.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-precision-blue rounded-full"></div>
                <span className="text-foreground">Eliminates built-up edge formation</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-precision-blue rounded-full"></div>
                <span className="text-foreground">Delivers mirror-like surface finishes</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-precision-blue rounded-full"></div>
                <span className="text-foreground">Extends tool life by up to 10x</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-precision-blue rounded-full"></div>
                <span className="text-foreground">Reduces machining cycle times</span>
              </li>
            </ul>
            <Button variant="industrial" size="lg" asChild>
              <a href="/catalogue">Explore Product Catalog</a>
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-center pb-4">
                <div className="bg-gradient-to-br from-precision-blue/10 to-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <product.icon className="h-8 w-8 text-precision-blue" />
                </div>
                <CardTitle className="text-xl text-foreground">{product.title}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  {product.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-precision-blue rounded-full"></div>
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;