import React from 'react';
import MemberCard from '../components/MemberCard';

const About: React.FC = () => {
  const members = [
    { name: 'Kathleen Pearl Albutra', role: 'Partner' },
    { name: 'Angela Jodi Aspa', role: 'Partner' },
    { name: 'Marc Edison Canlas', role: 'Partner' },
    { name: 'Angel Comedia', role: 'Partner' },
    { name: 'Ervin Lemuel Daño', role: 'Partner' },
    { name: 'Norlyn Diesta', role: 'Partner' },
    { name: 'James Clarence Paule', role: 'Partner' },
    { name: 'Ronalyn Ortega', role: 'Partner' },
    { name: 'Chanmae Reynalda', role: 'Partner' },
    { name: 'Renelyn Villanueva', role: 'Partner' },
  ];

  return (
    <section id="about" className="section-padding bg-gradient-to-b from-white to-kamora-cream">
      <div className="max-w-7xl mx-auto">
        {/* About Content */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-kamora-dark mb-6">
            About Kamora
          </h2>
          <div className="max-w-4xl mx-auto text-lg text-gray-700 space-y-4">
            <p>
              Welcome to Kamora, where culinary artistry meets exceptional dining experiences. 
              Founded with a passion for bringing people together through food, we've created a 
              unique concept that simplifies the dining experience while maximizing flavor and satisfaction.
            </p>
             <div className="bg-white rounded-lg p-6 shadow-md mt-8">
              <h3 className="text-2xl font-bold text-kamora-orange mb-4">Our Mission</h3>
              <p className="text-gray-700"></p>
            <p>
              To provide consistently outstanding food that nourishes both body and soul. 
              We believe in the power of simplicity - focusing on perfect execution of a curated selection 
              rather than overwhelming our guests with endless choices.
            </p>
       </div>
            <div className="bg-white rounded-lg p-6 shadow-md mt-8">
              <h3 className="text-2xl font-bold text-kamora-orange mb-4">Our Vision</h3>
              <p className="text-gray-700">
                To become the most beloved dining destination in every community we serve, 
                setting new standards for quality, service, and customer satisfaction in the food industry.
              </p>
            </div>
          </div>
        </div>

        {/* Members Section */}
        <div className="mt-16">
          <h3 className="text-3xl md:text-4xl font-bold text-kamora-dark text-center mb-12">
            THE PARTNERS 
          </h3>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto py-1 px-6">
            Meet the passionate partners behind Kamora 
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {members.map((member, index) => (
              <MemberCard
                key={index}
                name={member.name}
                role={member.role}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
