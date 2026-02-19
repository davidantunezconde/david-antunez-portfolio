import React from 'react';
import { Video, Camera, Film, Palette } from 'lucide-react';

// Services data - hardcoded
const services = [
  {
    id: 1,
    title: "Video Production",
    description: "Full-service video production from concept to final delivery, including pre-production planning, filming, and post-production.",
    icon: "video"
  },
  {
    id: 2,
    title: "Photography",
    description: "Professional photography services for portraits, events, commercial work, and artistic projects with a cinematic approach.",
    icon: "camera"
  },
  {
    id: 3,
    title: "Editing & Post-Production",
    description: "Expert video editing, sound design, and motion graphics to bring your footage to life with professional polish.",
    icon: "film"
  },
  {
    id: 4,
    title: "Color Grading",
    description: "Cinematic color grading to enhance mood, atmosphere, and visual storytelling in your video projects.",
    icon: "palette"
  }
];

const iconMap = {
  video: Video,
  camera: Camera,
  film: Film,
  palette: Palette
};

const Services = () => {
  return (
    <section id="services" className="services-section py-32 px-6 bg-zinc-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Services
          </h2>
          <div className="h-1 w-24 bg-white mx-auto mb-6"></div>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Professional audiovisual services tailored to bring your vision to life
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => {
            const Icon = iconMap[service.icon];
            return (
              <div 
                key={service.id}
                className="service-card bg-white/5 backdrop-blur-sm p-8 rounded-lg hover:bg-white/10 transition-all duration-300 group border border-white/10"
              >
                <div className="mb-6">
                  <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-white/20 transition-colors duration-300">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
