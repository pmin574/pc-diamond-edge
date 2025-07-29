import { Cog } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-industrial-blue text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-precision-blue p-2 rounded-lg">
                <Cog className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">ProCut Tooling</h3>
                <p className="text-blue-200 text-sm">Precision Cutting Solutions</p>
              </div>
            </div>
            <p className="text-blue-200 text-sm">
              Leading manufacturer of specialized PCD and carbide cutting tools 
              for aluminum and non-ferrous material processing.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Products</h4>
            <ul className="space-y-2 text-blue-200 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">PCD Cutting Tools</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Carbide End Mills</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Router Bits</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Insert Tooling</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Custom Solutions</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-blue-200 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Tool Design</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Retipping Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Sharpening</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Technical Support</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Application Engineering</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Industries</h4>
            <ul className="space-y-2 text-blue-200 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Aerospace</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Automotive</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Electronics</a></li>
              <li><a href="#" className="hover:text-white transition-colors">General Manufacturing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Custom Fabrication</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-precision-blue/30 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-blue-200 text-sm">
            © 2024 ProCut Tooling. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-blue-200 hover:text-white text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-blue-200 hover:text-white text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-blue-200 hover:text-white text-sm transition-colors">Quality Certifications</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;