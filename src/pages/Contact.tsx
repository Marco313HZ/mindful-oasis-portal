
import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, Clock, MapPin } from 'lucide-react';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    reason: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, reason: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData);
      toast({
        title: "Message Sent",
        description: "We've received your message and will contact you soon.",
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        reason: ''
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-purple-800 mb-4">Contact Us</h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              We're here to answer your questions and provide the support you need.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-purple-800 mb-6">Get In Touch</h2>
              <p className="text-gray-700 mb-8">
                Whether you're seeking treatment, have questions about our services, or need more information, 
                we're here to help. Fill out the form, and our team will respond promptly.
              </p>
              
              <Card className="border-0 shadow-lg mb-8">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start">
                    <div className="bg-purple-100 p-2 rounded-full mr-4">
                      <MapPin className="h-5 w-5 text-purple-800" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-purple-800 mb-1">Our Location</h3>
                      <address className="text-gray-600 not-italic">
                        123 Healing Street<br />
                        Mindful City, MC 12345
                      </address>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-purple-100 p-2 rounded-full mr-4">
                      <Phone className="h-5 w-5 text-purple-800" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-purple-800 mb-1">Phone Number</h3>
                      <p className="text-gray-600">(555) 123-4567</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-purple-100 p-2 rounded-full mr-4">
                      <Mail className="h-5 w-5 text-purple-800" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-purple-800 mb-1">Email Address</h3>
                      <p className="text-gray-600">contact@mindfulcare.com</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-purple-100 p-2 rounded-full mr-4">
                      <Clock className="h-5 w-5 text-purple-800" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-purple-800 mb-1">Office Hours</h3>
                      <p className="text-gray-600">
                        Monday - Friday: 8:00 AM - 6:00 PM<br />
                        Saturday: 9:00 AM - 1:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div>
                <h3 className="text-xl font-semibold text-purple-800 mb-4">Emergency Resources</h3>
                <p className="text-gray-700 mb-3">
                  If you're experiencing a mental health emergency, please use these resources:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li>• National Suicide Prevention Lifeline: <strong>988 or 1-800-273-8255</strong></li>
                  <li>• Crisis Text Line: Text <strong>HOME to 741741</strong></li>
                  <li>• Emergency Services: <strong>911</strong></li>
                </ul>
              </div>
            </div>

            <div>
              <Card className="border-0 shadow-lg overflow-hidden">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-purple-800 mb-6">Send Us a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        required
                        className="w-full"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Your email"
                          required
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Your phone number"
                          className="w-full"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
                        Reason for Contact
                      </label>
                      <Select value={formData.reason} onValueChange={handleSelectChange}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a reason" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="appointment">Schedule an Appointment</SelectItem>
                          <SelectItem value="information">General Information</SelectItem>
                          <SelectItem value="billing">Billing Questions</SelectItem>
                          <SelectItem value="feedback">Feedback</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                        Subject
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Message subject"
                        required
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Your message"
                        rows={5}
                        required
                        className="w-full"
                      />
                    </div>

                    <div className="text-sm text-gray-500">
                      By submitting this form, you agree to our <a href="/privacy" className="text-purple-600 hover:underline">privacy policy</a>.
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-purple-400 hover:bg-purple-500" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="section-title">Find Us</h2>
            <p className="section-subtitle max-w-3xl mx-auto">
              Our center is conveniently located in the heart of Mindful City.
            </p>
          </div>
          <div className="h-96 bg-gray-300 rounded-lg shadow-lg overflow-hidden">
            {/* Replace with actual map integration */}
            <div className="h-full w-full flex items-center justify-center bg-purple-100">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-purple-800 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-purple-800">Map placeholder</h3>
                <p className="text-gray-700 mt-2">123 Healing Street, Mindful City, MC 12345</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
