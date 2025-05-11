
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { Brain, Users, ClipboardCheck, Pill, Video, Flame, HeartHandshake, Flower } from 'lucide-react';

const Services = () => {
  const mainServices = [
    {
      id: "therapy",
      icon: <Brain className="h-12 w-12 text-purple-500" />,
      title: "Individual Therapy",
      description: "One-on-one therapy sessions tailored to your unique needs and challenges.",
      details: [
        "Cognitive Behavioral Therapy (CBT)",
        "Dialectical Behavior Therapy (DBT)",
        "Psychodynamic Therapy",
        "Solution-Focused Brief Therapy",
        "Trauma-Informed Approaches"
      ]
    },
    {
      id: "groups",
      icon: <Users className="h-12 w-12 text-purple-500" />,
      title: "Group Therapy",
      description: "Supportive group settings to connect with others facing similar challenges.",
      details: [
        "Anxiety Management Groups",
        "Depression Support Groups",
        "Grief and Loss Groups",
        "Substance Recovery Support",
        "Mindfulness Practice Groups"
      ]
    },
    {
      id: "assessment",
      icon: <ClipboardCheck className="h-12 w-12 text-purple-500" />,
      title: "Psychological Assessment",
      description: "Comprehensive evaluations to better understand your mental health needs.",
      details: [
        "Diagnostic Assessments",
        "Personality Testing",
        "Neuropsychological Screening",
        "ADHD Evaluations",
        "Career and Vocational Assessments"
      ]
    },
    {
      id: "medication",
      icon: <Pill className="h-12 w-12 text-purple-500" />,
      title: "Medication Management",
      description: "Expert psychiatric care and medication oversight to support your treatment.",
      details: [
        "Psychiatric Evaluations",
        "Medication Monitoring",
        "Treatment Adjustment",
        "Side Effect Management",
        "Coordination with Therapists"
      ]
    },
    {
      id: "teletherapy",
      icon: <Video className="h-12 w-12 text-purple-500" />,
      title: "Teletherapy",
      description: "Convenient online therapy and psychiatric services from the comfort of home.",
      details: [
        "Individual Telehealth Sessions",
        "Virtual Group Therapy",
        "Online Psychiatric Consultations",
        "Secure Video Platform",
        "Flexible Scheduling Options"
      ]
    }
  ];

  const specializedServices = [
    {
      icon: <Flame className="h-10 w-10 text-purple-500" />,
      title: "Trauma Recovery",
      description: "Specialized treatment for trauma and PTSD using evidence-based approaches."
    },
    {
      icon: <HeartHandshake className="h-10 w-10 text-purple-500" />,
      title: "Couples Counseling",
      description: "Support for couples seeking to improve communication and strengthen relationships."
    },
    {
      icon: <Flower className="h-10 w-10 text-purple-500" />,
      title: "Wellness Programs",
      description: "Holistic services focused on overall mental wellness and stress management."
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-purple-800 mb-4">Our Services</h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Comprehensive mental health care designed to support your unique journey toward wellbeing.
            </p>
          </div>
        </div>
      </section>

      {/* Main Services Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="section-title">Core Services</h2>
            <p className="section-subtitle max-w-3xl mx-auto">
              Discover our range of professional mental health services tailored to your needs.
            </p>
          </div>

          <Tabs defaultValue="therapy" className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-8">
              {mainServices.map((service) => (
                <TabsTrigger 
                  key={service.id} 
                  value={service.id}
                  className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-800"
                >
                  {service.title}
                </TabsTrigger>
              ))}
            </TabsList>
            {mainServices.map((service) => (
              <TabsContent key={service.id} value={service.id}>
                <Card className="border-0 shadow-lg overflow-hidden">
                  <CardContent className="p-0">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                      <div className="p-8 bg-purple-50 flex flex-col justify-center items-center md:items-start text-center md:text-left">
                        <div className="bg-white p-4 rounded-full mb-6 shadow-md">
                          {service.icon}
                        </div>
                        <h3 className="text-2xl font-bold text-purple-800 mb-4">{service.title}</h3>
                        <p className="text-gray-700 mb-6">{service.description}</p>
                        <Button className="bg-purple-400 hover:bg-purple-500" asChild>
                          <Link to="/contact">Schedule Consultation</Link>
                        </Button>
                      </div>
                      <div className="p-8">
                        <h4 className="text-xl font-semibold text-purple-800 mb-4">What We Offer</h4>
                        <ul className="space-y-3">
                          {service.details.map((detail, index) => (
                            <li key={index} className="flex items-start">
                              <span className="h-6 w-6 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center mr-3 flex-shrink-0">✓</span>
                              <span className="text-gray-700">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Specialized Services Section */}
      <section className="py-16 bg-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="section-title">Specialized Programs</h2>
            <p className="section-subtitle max-w-3xl mx-auto">
              Additional services to address specific needs and enhance your mental health journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {specializedServices.map((service, index) => (
              <Card key={index} className="border-0 shadow-md hover:shadow-xl transition-shadow">
                <CardContent className="p-6 flex flex-col items-center text-center h-full">
                  <div className="bg-white p-4 rounded-full mb-4 shadow-md">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-purple-800 mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <Button variant="outline" className="mt-auto border-purple-400 text-purple-600 hover:bg-purple-50" asChild>
                    <Link to="/contact">Learn More</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Insurance Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title">Insurance & Payment Options</h2>
              <p className="text-gray-700 mb-6">
                At MindfulCare, we strive to make mental health care accessible. We accept a wide range 
                of insurance plans and offer various payment options to accommodate your needs.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <span className="h-6 w-6 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center mr-3 flex-shrink-0">✓</span>
                  <span className="text-gray-700">We accept most major insurance plans</span>
                </li>
                <li className="flex items-start">
                  <span className="h-6 w-6 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center mr-3 flex-shrink-0">✓</span>
                  <span className="text-gray-700">Sliding scale fee options available</span>
                </li>
                <li className="flex items-start">
                  <span className="h-6 w-6 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center mr-3 flex-shrink-0">✓</span>
                  <span className="text-gray-700">Flexible payment plans</span>
                </li>
                <li className="flex items-start">
                  <span className="h-6 w-6 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center mr-3 flex-shrink-0">✓</span>
                  <span className="text-gray-700">Our staff will help verify your benefits</span>
                </li>
              </ul>
              <Button className="bg-purple-400 hover:bg-purple-500" asChild>
                <Link to="/contact">Contact for Insurance Verification</Link>
              </Button>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80" 
                alt="Insurance and payment options" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-purple-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Start Your Healing Journey Today</h2>
          <p className="text-xl text-purple-100 mb-8 max-w-3xl mx-auto">
            Our team is ready to support you with compassionate, personalized mental health care.
          </p>
          <Button className="bg-white text-purple-800 hover:bg-purple-100" size="lg" asChild>
            <Link to="/contact">Schedule Your First Appointment</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
