
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  const team = [
    {
      name: "Dr. Sarah Johnson",
      role: "Clinical Director",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300&q=80",
      bio: "Dr. Johnson has over 15 years of experience in clinical psychology with a focus on trauma-informed care and cognitive behavioral therapy."
    },
    {
      name: "Dr. Michael Chen",
      role: "Psychiatrist",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300&q=80",
      bio: "Specializing in medication management and treatment-resistant conditions, Dr. Chen brings a comprehensive approach to psychiatric care."
    },
    {
      name: "Lisa Rodriguez, LCSW",
      role: "Therapist",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300&q=80",
      bio: "With expertise in family systems and multicultural counseling, Lisa helps clients navigate complex interpersonal dynamics."
    },
    {
      name: "James Wilson, LPC",
      role: "Therapist",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300&q=80",
      bio: "James specializes in anxiety disorders and mindfulness-based interventions, helping clients build resilience and coping skills."
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-purple-800 mb-4">About MindfulCare</h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Learn about our mission, our team, and our approach to mental health care.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1527689368864-3a821dbccc34?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=500&q=80" 
                alt="Our mission" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="section-title">Our Mission</h2>
              <p className="text-gray-700 mb-6">
                At MindfulCare, we believe that mental health care should be accessible, compassionate, 
                and tailored to each individual's unique needs and circumstances. Our mission is to provide 
                high-quality psychiatric and psychological services that empower our patients to overcome 
                challenges, build resilience, and thrive in their lives.
              </p>
              <p className="text-gray-700">
                We strive to create a safe, supportive environment where everyone feels valued and 
                understood. Through evidence-based treatments and a holistic approach to mental wellness, 
                we help our patients develop the tools they need to navigate life's difficulties and find 
                greater balance, meaning, and joy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 bg-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="section-title">Our Core Values</h2>
            <p className="section-subtitle max-w-3xl mx-auto">
              These principles guide everything we do at MindfulCare.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-purple-800 mb-4">Compassion</h3>
              <p className="text-gray-700">
                We approach each patient with empathy, understanding, and genuine care, 
                recognizing the courage it takes to seek help.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-purple-800 mb-4">Excellence</h3>
              <p className="text-gray-700">
                We are committed to providing the highest quality care through evidence-based 
                practices and ongoing professional development.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-purple-800 mb-4">Inclusion</h3>
              <p className="text-gray-700">
                We respect and celebrate diversity in all its forms, creating a welcoming 
                environment for people of all backgrounds and identities.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-purple-800 mb-4">Collaboration</h3>
              <p className="text-gray-700">
                We believe in working together with our patients, their families, and other 
                healthcare providers to create comprehensive care plans.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-purple-800 mb-4">Innovation</h3>
              <p className="text-gray-700">
                We continuously seek new and better ways to serve our patients, 
                embracing advances in mental health research and treatment.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-purple-800 mb-4">Empowerment</h3>
              <p className="text-gray-700">
                We aim to equip our patients with the knowledge, skills, and confidence 
                to take an active role in their mental health journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="section-title">Meet Our Team</h2>
            <p className="section-subtitle max-w-3xl mx-auto">
              Our experienced mental health professionals are dedicated to providing compassionate care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-shadow">
                <CardContent className="p-0">
                  <img src={member.image} alt={member.name} className="w-full h-64 object-cover object-center" />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-purple-800">{member.name}</h3>
                    <p className="text-purple-500 mb-3">{member.role}</p>
                    <p className="text-gray-600 text-sm">{member.bio}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-16 bg-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row-reverse items-center gap-12">
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80" 
                alt="Our history" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="section-title">Our History</h2>
              <p className="text-gray-700 mb-6">
                MindfulCare was founded in 2010 by Dr. Sarah Johnson with a vision to create a mental health 
                center that combines clinical excellence with a warm, welcoming environment. What began as a 
                small practice with just two clinicians has grown into a comprehensive mental health center 
                serving hundreds of patients each year.
              </p>
              <p className="text-gray-700">
                Over the years, we've expanded our services to meet the evolving needs of our community, 
                adding specialized programs for various populations and mental health concerns. Through it all, 
                we've maintained our commitment to personalized care and building lasting relationships with 
                our patients.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
