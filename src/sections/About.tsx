import React from 'react';
import MemberCard from '../components/MemberCard';
import albutraImg from '../../assets/albutra.png';
import aspaImg from '../../assets/aspa.png';
import canlasImg from '../../assets/canlas.png';
import comediaImg from '../../assets/comedia.png';
import danoImg from '../../assets/dano.png';
import diestaImg from '../../assets/diesta.png';
import ortegaImg from '../../assets/ortega.png';
import pauleImg from '../../assets/paule.png';
import reynaldaImg from '../../assets/reynalda.png';
import villanuevaImg from '../../assets/villanueva.png';
const About: React.FC = () => {
  const members = [
    { name: 'Kathleen Pearl Albutra', role: 'Partner', avatar: albutraImg },
    { name: 'Angela Jodi Aspa', role: 'Partner', avatar: aspaImg },
    { name: 'Marc Edison Canlas', role: 'Partner', avatar: canlasImg },
    { name: 'Angel Comedia', role: 'Partner', avatar: comediaImg },
    { name: 'Ervin Lemuel Daño', role: 'Partner', avatar: danoImg },
    { name: 'Norlyn Diesta', role: 'Partner', avatar: diestaImg },
    { name: 'Ronalyn Ortega', role: 'Partner', avatar: ortegaImg },
    { name: 'James Clarence Paule', role: 'Partner', avatar: pauleImg },
    { name: 'Chanmae Reynalda', role: 'Partner', avatar: reynaldaImg },
    { name: 'Renelyn Villanueva', role: 'Partner', avatar: villanuevaImg },
  ];

  return (
    <div>
      <section
        id="about"
        className="relative overflow-hidden bg-cover bg-center text-white"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:px-8 md:px-12 lg:py-32 lg:px-16">
          <div className="max-w-4xl text-center mx-auto">
            <p className="text-sm uppercase tracking-[0.45em] text-orange-200/90 font-semibold mb-4">
              About Kamora
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold leading-tight md:leading-tight text-white mb-6">
              A dining experience shaped by warm hospitality, vibrant flavors, and thoughtful Filipino-inspired recipes.
            </h1>
            <p className="mx-auto max-w-3xl text-base sm:text-lg text-white/80 leading-relaxed">
              Kamora blends carefully selected ingredients, friendly service, and a welcoming atmosphere so every visit feels special.
              Our promise is to delight your senses with food made to be shared, celebrated, and remembered.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#fbf6ed] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <div className="space-y-6">
              <p className="text-sm uppercase tracking-[0.4em] text-kamora-orange font-semibold">
                Mission & Vision
              </p>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-kamora-dark">
                We’re focused on delivering flavorful meals and meaningful connections.
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed max-w-3xl">
                From freshly prepared dishes to attentive service, Kamora is built for guests who appreciate honest food, thoughtful details, and a warm dining experience.
              </p>
            </div>

            <div className="grid gap-6">
              <div className="rounded-[32px] border border-gray-200 bg-white p-8 shadow-lg">
                <h3 className="text-2xl font-heading font-bold text-kamora-dark mb-3">Our Vision</h3>
                <p className="text-gray-600 leading-relaxed">
                  To be recognized as a reliable food brand that provides affordable, modern and nutritious fillets made from kamote.
                </p>
              </div>
              <div className="rounded-[32px] border border-gray-200 bg-white p-8 shadow-lg">
                <h3 className="text-2xl font-heading font-bold text-kamora-dark mb-3">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed">
                   To provide safe, nutritious, and affordable plant-based fillet products made from locally sourced ingredients, helping consumers enjoy healthier meals without compromising taste or budget.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.4em] text-kamora-orange font-semibold mb-3">
              Partnership
            </p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-kamora-dark">
              Building strong partnerships with every step.
            </h2>
            <p className="mt-4 text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
              We work with trusted suppliers, community partners, and local teams to deliver quality food and consistent service.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-[32px] border border-gray-200 bg-[#faf4ea] p-8 text-center shadow-lg">
              <p className="text-sm uppercase tracking-[0.35em] text-kamora-orange font-semibold mb-4">
                Trusted Suppliers
              </p>
              <h3 className="text-xl font-heading font-bold text-kamora-dark mb-3">
                Fresh ingredients, every day
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Partnering with local growers and producers to ensure the best quality in every dish.
              </p>
            </div>
            <div className="rounded-[32px] border border-gray-200 bg-[#faf4ea] p-8 text-center shadow-lg">
              <p className="text-sm uppercase tracking-[0.35em] text-kamora-orange font-semibold mb-4">
                Community
              </p>
              <h3 className="text-xl font-heading font-bold text-kamora-dark mb-3">
                Serving people together
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Building relationships with our neighborhood to bring people closer over food.
              </p>
            </div>
            <div className="rounded-[32px] border border-gray-200 bg-[#faf4ea] p-8 text-center shadow-lg">
              <p className="text-sm uppercase tracking-[0.35em] text-kamora-orange font-semibold mb-4">
                Hospitality
              </p>
              <h3 className="text-xl font-heading font-bold text-kamora-dark mb-3">
                Service that feels personal
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Working with experienced partners to deliver a welcoming and consistent guest experience.
              </p>
            </div>
          </div>

          <div className="mt-12">
            <div className="flex items-center justify-between flex-col gap-4 md:flex-row md:gap-0 mb-8">
              <div>
                <p className="text-sm uppercase tracking-[0.4em] text-kamora-orange font-semibold mb-2">
                  Our Partners
                </p>
                <h3 className="text-2xl md:text-3xl font-heading font-bold text-kamora-dark">
                  Meet the team behind Kamora.
                </h3>
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5 items-stretch">
              {members.map((member, index) => (
                <div
                  key={member.name}
                  className="opacity-0 h-full"
                  style={{ animation: `slideInUp 0.5s ease-out forwards ${index * 0.08 + 0.15}s` }}
                >
                  <MemberCard name={member.name} role={member.role} avatar={member.avatar} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
