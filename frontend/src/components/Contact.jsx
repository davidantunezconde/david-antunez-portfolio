import React from 'react';
import { Instagram, Youtube, Linkedin, Mail } from 'lucide-react';

// Profile data - hardcoded for now, can be fetched from API later
const profileData = {
  email: "davidantunezconde@gmail.com",
  socialMedia: {
    instagram: "https://www.instagram.com/davidantunez__/",
    youtube: "https://www.youtube.com/@davidantunezconde",
    linkedin: "https://www.linkedin.com/in/davidantunezconde"
  }
};

const Contact = () => {
  return (
    <section id="contact" className="contact-section py-32 px-6 bg-black relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 to-black"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Let's Connect
          </h2>
          <div className="h-1 w-24 bg-white mx-auto mb-6"></div>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Ready to collaborate? Get in touch through my social channels or email.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Email */}
          <div className="mb-12 text-center">
            <a 
              href={`mailto:${profileData.email}`}
              className="inline-flex items-center justify-center text-gray-300 hover:text-white transition-colors duration-300 group"
            >
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mr-4 group-hover:bg-white/10 transition-colors duration-300">
                <Mail className="w-7 h-7" />
              </div>
              <span className="text-2xl font-medium">{profileData.email}</span>
            </a>
          </div>

          {/* Social Media */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-8">Follow Me</h3>
            <div className="flex justify-center gap-6">
              <a
                href={profileData.socialMedia.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10 transition-all duration-300 group hover:scale-110"
              >
                <Instagram className="w-7 h-7 text-white" />
              </a>
              <a
                href={profileData.socialMedia.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10 transition-all duration-300 group hover:scale-110"
              >
                <Youtube className="w-7 h-7 text-white" />
              </a>
              <a
                href={profileData.socialMedia.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10 transition-all duration-300 group hover:scale-110"
              >
                <Linkedin className="w-7 h-7 text-white" />
              </a>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-16 p-8 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 text-center">
            <p className="text-gray-300 leading-relaxed">
              Available for freelance projects, collaborations, and creative partnerships. 
              Let's bring your vision to life with compelling visual storytelling.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
