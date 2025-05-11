
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Link } from 'react-router-dom';
import { Calendar as CalendarIcon, Users, BookOpen, Share2 } from 'lucide-react';

const Community = () => {
  const resources = [
    {
      title: "Understanding Anxiety",
      description: "A comprehensive guide to recognizing and managing anxiety symptoms.",
      type: "Article",
      link: "#"
    },
    {
      title: "Mindfulness for Beginners",
      description: "Simple techniques to incorporate mindfulness into your daily routine.",
      type: "Guide",
      link: "#"
    },
    {
      title: "Coping with Depression",
      description: "Strategies and insights for navigating depression and finding support.",
      type: "Workbook",
      link: "#"
    },
    {
      title: "Healthy Sleep Habits",
      description: "Improve your sleep quality with these evidence-based recommendations.",
      type: "Article",
      link: "#"
    },
    {
      title: "Building Resilience",
      description: "Learn how to develop emotional resilience in challenging times.",
      type: "Video",
      link: "#"
    },
    {
      title: "Stress Reduction Techniques",
      description: "Practical approaches to manage stress in your daily life.",
      type: "Guide",
      link: "#"
    }
  ];

  const events = [
    {
      title: "Anxiety Support Group",
      date: "June 15, 2025",
      time: "6:00 PM - 7:30 PM",
      location: "Online via Zoom"
    },
    {
      title: "Mindfulness Workshop",
      date: "June 22, 2025",
      time: "10:00 AM - 12:00 PM",
      location: "MindfulCare Center, Room 202"
    },
    {
      title: "Family Mental Health Seminar",
      date: "July 8, 2025",
      time: "5:30 PM - 7:00 PM",
      location: "Community Library, Meeting Room A"
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-purple-800 mb-4">Community Resources</h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Access helpful resources, join supportive groups, and participate in events to enhance your mental wellbeing.
            </p>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="section-title">Self-Help Resources</h2>
            <p className="section-subtitle max-w-3xl mx-auto">
              Explore our collection of articles, guides, and worksheets to support your mental health journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resources.map((resource, index) => (
              <Card key={index} className="border-0 shadow-md hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div className="bg-purple-100 p-2 rounded-md text-purple-800 mr-4">
                      <BookOpen className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="inline-block bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs mb-2">
                        {resource.type}
                      </span>
                      <h3 className="text-lg font-semibold text-purple-800 mb-2">{resource.title}</h3>
                      <p className="text-gray-600 text-sm mb-4">{resource.description}</p>
                      <a href={resource.link} className="text-purple-500 hover:text-purple-700 text-sm font-semibold flex items-center">
                        Read More
                        <Share2 className="ml-2 h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button variant="outline" className="border-purple-400 text-purple-600 hover:bg-purple-50">
              View All Resources
            </Button>
          </div>
        </div>
      </section>

      {/* Support Groups Section */}
      <section className="py-16 bg-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <h2 className="section-title">Support Groups</h2>
              <p className="text-gray-700 mb-6">
                Our support groups provide a safe space to connect with others who understand what you're going through. 
                Led by experienced facilitators, these groups offer validation, community, and practical coping strategies.
              </p>
              <div className="space-y-4 mb-6">
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <div className="flex items-center">
                    <div className="bg-purple-100 p-2 rounded-full mr-4">
                      <Users className="h-5 w-5 text-purple-800" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-purple-800">Anxiety Support Group</h3>
                      <p className="text-gray-600 text-sm">Every Tuesday, 6:00 PM - 7:30 PM</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <div className="flex items-center">
                    <div className="bg-purple-100 p-2 rounded-full mr-4">
                      <Users className="h-5 w-5 text-purple-800" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-purple-800">Depression Support Group</h3>
                      <p className="text-gray-600 text-sm">Every Thursday, 6:00 PM - 7:30 PM</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <div className="flex items-center">
                    <div className="bg-purple-100 p-2 rounded-full mr-4">
                      <Users className="h-5 w-5 text-purple-800" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-purple-800">Grief and Loss Group</h3>
                      <p className="text-gray-600 text-sm">Every Wednesday, 5:30 PM - 7:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
              <Button className="bg-purple-400 hover:bg-purple-500" asChild>
                <Link to="/contact">Inquire About Groups</Link>
              </Button>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1573497161161-c3e73707e25c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80" 
                alt="Support group session" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Events Calendar Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="section-title">Upcoming Events</h2>
            <p className="section-subtitle max-w-3xl mx-auto">
              Join us for workshops, seminars, and community events focused on mental health and wellness.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="md:col-span-1">
              <Card className="border-0 shadow-md">
                <CardContent className="p-4">
                  <Calendar 
                    className="rounded-md" 
                    mode="single" 
                    selected={new Date()} 
                  />
                </CardContent>
              </Card>
            </div>
            <div className="md:col-span-2">
              <div className="space-y-6">
                {events.map((event, index) => (
                  <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start">
                        <div className="bg-purple-100 p-3 rounded-full mr-4">
                          <CalendarIcon className="h-6 w-6 text-purple-800" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-purple-800">{event.title}</h3>
                          <p className="text-purple-600 mb-2">{event.date} • {event.time}</p>
                          <p className="text-gray-600 mb-4">{event.location}</p>
                          <div className="flex justify-between items-center">
                            <Button variant="outline" size="sm" className="border-purple-400 text-purple-600 hover:bg-purple-50">
                              Details
                            </Button>
                            <Button size="sm" className="bg-purple-400 hover:bg-purple-500">
                              Register
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="text-center mt-8">
                <Button variant="outline" className="border-purple-400 text-purple-600 hover:bg-purple-50">
                  View Full Calendar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-purple-800 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Connected</h2>
          <p className="text-purple-100 mb-8">
            Subscribe to our newsletter to receive updates on events, resources, and mental health tips.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-xl mx-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="px-4 py-3 rounded-md text-gray-800 w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <Button className="bg-white text-purple-800 hover:bg-purple-100 whitespace-nowrap">
              Subscribe
            </Button>
          </div>
          <p className="text-xs text-purple-200 mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default Community;
