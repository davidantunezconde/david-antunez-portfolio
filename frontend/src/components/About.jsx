import React from 'react';

// Profile data - hardcoded
const profileData = {
  name: "David Antúnez",
  profileImage: "https://i.imgur.com/eXbIexB.jpeg",
  bio: "Soc en David Antúnez, creatiu audiovisual i cineasta apassionat per donar vida a històries a través del poder de la narrativa visual. Amb anys d'experiència en cinematografia, edició i correcció de color, transformo idees en narratives convincents que connecten emocionalment amb el públic. El meu treball abasta documentals, videoclips musicals, produccions comercials i projectes artístics, cadascun creat amb una meticulosa atenció al detall i una profunda comprensió del llenguatge visual."
};

const About = () => {
  return (
    <section id="about" className="about-section py-32 px-6 relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${profileData.profileImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-black/85"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Profile Image */}
          <div className="about-image-wrapper">
            <div className="relative overflow-hidden rounded-lg shadow-2xl">
              <img 
                src={profileData.profileImage}
                alt={profileData.name}
                className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>

          {/* Bio Content */}
          <div className="about-content">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              About Me
            </h2>
            <div className="h-1 w-24 bg-white mb-8"></div>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              {profileData.bio}
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <span className="px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm">
                Cinematography
              </span>
              <span className="px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm">
                Directing
              </span>
              <span className="px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm">
                Editing
              </span>
              <span className="px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm">
                Color Grading
              </span>
              <span className="px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm">
                Photography
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
