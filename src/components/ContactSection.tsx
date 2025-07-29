import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const ContactSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-industrial-blue to-precision-blue text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Optimize Your Aluminum Processing?
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Get expert guidance on the right cutting tools for your specific applications. 
            Our team of specialists is ready to help you achieve superior results.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <Card className="border-0 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-2xl text-industrial-blue">Request a Quote</CardTitle>
              <p className="text-muted-foreground">
                Tell us about your application and we'll recommend the optimal cutting solution.
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <Input placeholder="First Name" />
                <Input placeholder="Last Name" />
              </div>
              <Input placeholder="Company Name" />
              <Input placeholder="Email Address" type="email" />
              <Input placeholder="Phone Number" type="tel" />
              <Textarea 
                placeholder="Tell us about your aluminum machining application, material specifications, and any current challenges you're facing..."
                rows={4}
              />
              <Button variant="industrial" size="lg" className="w-full">
                Request Quote & Technical Consultation
              </Button>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <Card className="border-0 bg-white/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="bg-white/20 p-3 rounded-full">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Call Our Experts</h3>
                    <p className="text-blue-100">Direct line to our technical team</p>
                  </div>
                </div>
                <p className="text-xl font-bold text-white">(555) 123-4567</p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="bg-white/20 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Email Support</h3>
                    <p className="text-blue-100">Technical inquiries welcome</p>
                  </div>
                </div>
                <p className="text-xl font-bold text-white">info@procuttooling.com</p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="bg-white/20 p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Visit Our Facility</h3>
                    <p className="text-blue-100">See our manufacturing process</p>
                  </div>
                </div>
                <p className="text-white">
                  1234 Industrial Drive<br />
                  Manufacturing City, MC 12345
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="bg-white/20 p-3 rounded-full">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Business Hours</h3>
                    <p className="text-blue-100">Technical support available</p>
                  </div>
                </div>
                <div className="text-white space-y-1">
                  <p>Monday - Friday: 7:00 AM - 6:00 PM</p>
                  <p>Saturday: 8:00 AM - 2:00 PM</p>
                  <p>Emergency Support: 24/7</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;