import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plane, Car, Factory, Cpu } from "lucide-react";
import manufacturingImage from "@/assets/manufacturing.jpg";

const IndustriesSection = () => {
  const industries = [
    {
      icon: Plane,
      title: "Aerospace Manufacturing",
      description: "Critical aluminum components requiring the highest precision and surface quality standards.",
      applications: ["Aircraft structures", "Engine components", "Landing gear", "Interior panels"]
    },
    {
      icon: Car,
      title: "Automotive Production",
      description: "High-volume aluminum parts manufacturing with consistent quality requirements.",
      applications: ["Engine blocks", "Transmission cases", "Suspension components", "Body panels"]
    },
    {
      icon: Factory,
      title: "Industrial Processing",
      description: "General aluminum fabrication and machining across diverse manufacturing sectors.",
      applications: ["Heat exchangers", "Structural components", "Machinery parts", "Custom fabrication"]
    },
    {
      icon: Cpu,
      title: "Electronics & Technology",
      description: "Precision aluminum components for electronic devices and technological applications.",
      applications: ["Heat sinks", "Electronic housings", "Connectors", "Precision assemblies"]
    }
  ];

  return (
    <section id="industries" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Trusted Across Critical Industries
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From aerospace to automotive, our specialized cutting tools deliver the precision 
            and reliability that demanding applications require.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-foreground">
              Precision That Powers Industry Leaders
            </h3>
            <p className="text-lg text-muted-foreground">
              Our cutting tools are engineered to meet the exacting standards of industries 
              where precision, quality, and reliability are non-negotiable.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-precision-blue mb-2">99.9%</div>
                <div className="text-sm text-muted-foreground">Quality Standard</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-precision-blue mb-2">10x</div>
                <div className="text-sm text-muted-foreground">Tool Life Extension</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-precision-blue mb-2">50+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-precision-blue mb-2">24/7</div>
                <div className="text-sm text-muted-foreground">Technical Support</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <img 
              src={manufacturingImage} 
              alt="Industrial aluminum manufacturing facility"
              className="rounded-2xl shadow-xl w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-industrial-blue/10 to-transparent rounded-2xl"></div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.map((industry, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="text-center pb-4">
                <div className="bg-gradient-to-br from-industrial-blue/10 to-precision-blue/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <industry.icon className="h-8 w-8 text-industrial-blue" />
                </div>
                <CardTitle className="text-xl text-foreground">{industry.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm">{industry.description}</p>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Key Applications:</h4>
                  <ul className="space-y-1">
                    {industry.applications.map((app, idx) => (
                      <li key={idx} className="flex items-center space-x-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-precision-blue rounded-full"></div>
                        <span className="text-muted-foreground">{app}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;