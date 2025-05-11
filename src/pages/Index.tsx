
import Layout from '@/components/layout/Layout';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, Heart, Brain, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const testimonials = [
  {
    id: 1,
    text: "The therapists at MindfulCare have helped me develop coping strategies that transformed how I handle stress and anxiety.",
    name: "Sarah J.",
    role: "Patient, 2 years",
  },
  {
    id: 2,
    text: "After struggling for years, the compassionate approach at MindfulCare helped me find a path to recovery I didn't think was possible.",
    name: "David M.",
    role: "Patient, 1 year",
  },
  {
    id: 3,
    text: "The group therapy sessions created a sense of community that was vital to my healing process. I'm grateful for this center.",
    name: "Rebecca T.",
    role: "Patient, 3 years",
  },
];

const services = [
  {
    icon: <Brain className="h-12 w-12 text-purple-500" />,
    title: "Individual Therapy",
    description: "One-on-one sessions tailored to your specific needs, helping you navigate life's challenges with professional guidance."
  },
  {
    icon: <Users className="h-12 w-12 text-purple-500" />,
    title: "Group Therapy",
    description: "Connect with others facing similar challenges in a supportive environment guided by our experienced therapists."
  },
  {
    icon: <Activity className="h-12 w-12 text-purple-500" />,
    title: "Psychiatric Services",
    description: "Comprehensive psychiatric evaluation and medication management to support your mental health treatment."
  },
  {
    icon: <Heart className="h-12 w-12 text-purple-500" />,
    title: "Wellness Programs",
    description: "Holistic approaches to mental health including mindfulness, stress management, and lifestyle counseling."
  }
];

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-28">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 md:pr-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-purple-800 mb-4 animate-fade-in">
                Begin Your Journey to Mental Wellness
              </h1>
              <p className="text-lg text-gray-700 mb-8 animate-fade-in">
                At MindfulCare, we provide compassionate, personalized mental health care 
                to help you find balance, healing, and growth.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-purple-400 hover:bg-purple-500 text-white" size="lg" asChild>
                  <Link to="/contact">Schedule Consultation</Link>
                </Button>
                <Button variant="outline" className="border-purple-400 text-purple-600" size="lg" asChild>
                  <Link to="/services">Explore Our Services</Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 mt-10 md:mt-0">
              <div className="relative">
                <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-purple-400 to-purple-300 opacity-75 blur"></div>
                <div className="relative rounded-lg overflow-hidden bg-white">
                  <img 
                    src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80" 
                    alt="Therapy session" 
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="section-title">Our Services</h2>
            <p className="section-subtitle max-w-3xl mx-auto">
              Comprehensive mental health care tailored to your individual needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-shadow">
                <CardContent className="pt-6 px-6 flex flex-col items-center text-center h-full">
                  <div className="bg-purple-100 p-4 rounded-full mb-4">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-purple-800 mb-3">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button className="bg-purple-400 hover:bg-purple-500" asChild>
              <Link to="/services">
                View All Services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="section-title">What Our Patients Say</h2>
            <p className="section-subtitle max-w-3xl mx-auto">
              Real stories from people who found support and healing at MindfulCare.
            </p>
          </div>

          <Tabs defaultValue="testimonial-1" className="max-w-4xl mx-auto">
            <TabsList className="grid grid-cols-3 mb-8">
              {testimonials.map((testimonial) => (
                <TabsTrigger 
                  key={testimonial.id} 
                  value={`testimonial-${testimonial.id}`}
                  className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-800"
                >
                  {testimonial.name}
                </TabsTrigger>
              ))}
            </TabsList>
            {testimonials.map((testimonial) => (
              <TabsContent key={testimonial.id} value={`testimonial-${testimonial.id}`}>
                <Card className="border-0 shadow-lg">
                  <CardContent className="pt-6 px-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="relative mb-6">
                        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-400 to-purple-300 opacity-75 blur"></div>
                        <div className="relative h-16 w-16 rounded-full bg-purple-100 flex items-center justify-center">
                          <span className="text-2xl font-bold text-purple-800">{testimonial.name.charAt(0)}</span>
                        </div>
                      </div>
                      <blockquote className="text-lg italic text-gray-700 mb-4">"{testimonial.text}"</blockquote>
                      <div>
                        <p className="font-semibold text-purple-800">{testimonial.name}</p>
                        <p className="text-gray-500 text-sm">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-purple-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Take the First Step?</h2>
          <p className="text-xl text-purple-100 mb-8 max-w-3xl mx-auto">
            Our team of experienced professionals is here to support you on your mental health journey.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="bg-white text-purple-800 hover:bg-purple-100" size="lg" asChild>
              <Link to="/contact">Contact Us Today</Link>
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-purple-700" size="lg" asChild>
              <Link to="/about">Learn More About Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
