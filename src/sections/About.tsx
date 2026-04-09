import React from 'react';
import MemberCard from '../components/MemberCard';

const About: React.FC = () => {
  const members = [
    { name: 'Sarah Johnson', role: 'Founder' },
    { name: 'Michael Chen', role: 'Chef' },
    { name: 'Emily Rodriguez', role: 'Operations Manager' },
    { name: 'David Kim', role: 'Marketing Director' },
    { name: 'Jessica Taylor', role: 'Head Chef' },
    { name: 'Robert Anderson', role: 'Business Development' },
    { name: 'Lisa Wang', role: 'Customer Experience' },
    { name: 'James Wilson', role: 'Finance Manager' },
    { name: 'Maria Garcia', role: 'Sous Chef' },
    { name: 'Thomas Brown', role: 'Brand Consultant' },
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
            <p>
              Our mission is to provide consistently outstanding food that nourishes both body and soul. 
              We believe in the power of simplicity - focusing on perfect execution of a curated selection 
              rather than overwhelming our guests with endless choices.
            </p>
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
            Our Members
          </h3>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
            Meet the passionate team behind Kamora's success
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
