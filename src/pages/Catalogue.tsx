import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, Download, Search, Filter } from "lucide-react";
import { Link } from "react-router-dom";

const catalogueItems = [
  {
    id: "pcd-001",
    name: "PCD Router Bit - Straight Cut",
    category: "PCD Cutting Tools",
    diameter: "1/4\" - 3/4\"",
    material: "Polycrystalline Diamond",
    application: "Aluminum routing, profiling",
    features: ["Superior finish", "Extended life", "Zero buildup"],
    image: "/src/assets/cutting-tools.jpg"
  },
  {
    id: "pcd-002", 
    name: "PCD End Mill - Ball Nose",
    category: "PCD Cutting Tools",
    diameter: "3mm - 20mm",
    material: "Polycrystalline Diamond",
    application: "3D contouring, finishing",
    features: ["Precision geometry", "Smooth cuts", "Long lasting"],
    image: "/src/assets/cutting-tools.jpg"
  },
  {
    id: "carb-001",
    name: "Premium Carbide Router Bit",
    category: "Premium Carbide Tools", 
    diameter: "1/8\" - 1\"",
    material: "Tungsten Carbide",
    application: "General aluminum machining",
    features: ["Cost effective", "Reliable performance", "Sharp edges"],
    image: "/src/assets/cutting-tools.jpg"
  },
  {
    id: "carb-002",
    name: "Carbide End Mill - Corner Radius",
    category: "Premium Carbide Tools",
    diameter: "2mm - 25mm", 
    material: "Micro-grain Carbide",
    application: "Slotting, profiling, chamfering",
    features: ["Durable coating", "Heat resistant", "Precise cuts"],
    image: "/src/assets/cutting-tools.jpg"
  },
  {
    id: "ins-001",
    name: "Indexable Insert - APKT",
    category: "Insert Tooling",
    diameter: "Various sizes",
    material: "Coated Carbide",
    application: "Heavy machining operations",
    features: ["Replaceable edges", "Economic", "High productivity"],
    image: "/src/assets/cutting-tools.jpg"
  },
  {
    id: "ins-002",
    name: "Threading Insert - External",
    category: "Insert Tooling", 
    diameter: "Standard threading",
    material: "PVD Coated Carbide",
    application: "Thread cutting, turning",
    features: ["Clean threads", "Long tool life", "Consistent quality"],
    image: "/src/assets/cutting-tools.jpg"
  }
];

const categories = ["All", "PCD Cutting Tools", "Premium Carbide Tools", "Insert Tooling"];

const Catalogue = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-industrial-blue to-precision-blue text-white py-16">
        <div className="container mx-auto px-6">
          <div className="flex items-center space-x-4 mb-6">
            <Link to="/" className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors">
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Home</span>
            </Link>
          </div>
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Product Catalogue
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Explore our complete range of precision cutting tools engineered for aluminum and non-ferrous materials
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="secondary" className="flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Download PDF Catalogue</span>
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-industrial-blue">
                Request Custom Quote
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <Filter className="h-5 w-5 text-steel-gray" />
              <span className="font-medium text-foreground">Filter by category:</span>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Badge
                    key={category}
                    variant={category === "All" ? "default" : "outline"}
                    className="cursor-pointer hover:bg-precision-blue hover:text-white transition-colors"
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-steel-gray" />
              <input
                type="text"
                placeholder="Search products..."
                className="px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-precision-blue"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {catalogueItems.map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-muted/50 flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline" className="text-xs">
                      {item.category}
                    </Badge>
                    <span className="text-xs text-steel-gray font-mono">
                      {item.id}
                    </span>
                  </div>
                  <CardTitle className="text-lg">{item.name}</CardTitle>
                  <CardDescription className="text-sm">
                    {item.application}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-steel-gray">Diameter:</span>
                        <p className="text-foreground">{item.diameter}</p>
                      </div>
                      <div>
                        <span className="font-medium text-steel-gray">Material:</span>
                        <p className="text-foreground">{item.material}</p>
                      </div>
                    </div>
                    <div>
                      <span className="font-medium text-steel-gray text-sm">Key Features:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {item.features.map((feature, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button size="sm" className="flex-1">
                        View Details
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        Add to Quote
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Can't Find What You Need?
          </h2>
          <p className="text-steel-gray mb-8 max-w-2xl mx-auto">
            Our engineering team specializes in custom tool design for specific aluminum processing applications. 
            Let us create the perfect solution for your machining needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="px-8">
              Request Custom Design
            </Button>
            <Button size="lg" variant="outline" className="px-8">
              Contact Engineering Team
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Catalogue;