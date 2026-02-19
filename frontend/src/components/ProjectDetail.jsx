import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { allProjects } from '../mockData';
import { Button } from './ui/button';
import { ArrowLeft, Play } from 'lucide-react';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = allProjects.find(p => p.id === parseInt(id));

  if (!project) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl text-white mb-4">Project not found</h2>
          <Button onClick={() => navigate('/')} className="bg-white text-black hover:bg-gray-200">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const isVideoProject = project.videoUrl;

  return (
    <div className="project-detail-page bg-black min-h-screen">
      {/* Back Button */}
      <div className="fixed top-8 left-8 z-50">
        <Button 
          onClick={() => navigate('/')}
          variant="outline"
          className="bg-white/10 backdrop-blur-md text-white border-white/20 hover:bg-white/20"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>

      {/* Hero Section */}
      <div className="relative h-screen">
        {isVideoProject ? (
          <div className="relative w-full h-full bg-black">
            <div className="absolute inset-0 bg-black/50 z-10"></div>
            <iframe
              src={`https://player.vimeo.com/video/1166314185?autoplay=0&loop=0&muted=0`}
              className="absolute top-0 left-0 w-full h-full"
              style={{
                width: '100%',
                height: '100%',
              }}
              frameBorder="0"
              allow="autoplay; fullscreen"
              allowFullScreen
              title={project.title}
            ></iframe>
          </div>
        ) : (
          <div 
            className="w-full h-full bg-cover bg-center relative"
            style={{ backgroundImage: `url(${project.thumbnail})` }}
          >
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
        )}

        {/* Project Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-12 z-20 bg-gradient-to-t from-black via-black/80 to-transparent">
          <div className="max-w-7xl mx-auto">
            <p className="text-sm uppercase tracking-wider text-gray-300 mb-2">{project.category}</p>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">{project.title}</h1>
            <p className="text-xl text-gray-300">{project.year} • {project.role}</p>
          </div>
        </div>
      </div>

      {/* Project Details */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Description */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-6">About This Project</h2>
          <div className="h-1 w-16 bg-white mb-8"></div>
          <p className="text-lg text-gray-300 leading-relaxed max-w-4xl">
            {project.description}
          </p>
        </div>

        {/* Credits */}
        <div className="mb-20 bg-white/5 backdrop-blur-sm p-8 rounded-lg">
          <h3 className="text-2xl font-bold text-white mb-4">Credits</h3>
          <p className="text-gray-300">{project.credits}</p>
        </div>

        {/* Gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <div className="mb-20">
            <h3 className="text-3xl font-bold text-white mb-8">Behind the Scenes</h3>
            <div className="h-1 w-16 bg-white mb-12"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.gallery.map((image, index) => (
                <div key={index} className="overflow-hidden rounded-lg shadow-2xl group">
                  <img 
                    src={image}
                    alt={`${project.title} - Behind the scenes ${index + 1}`}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Navigation to other projects */}
        <div className="text-center pt-12 border-t border-white/10">
          <Button 
            onClick={() => navigate('/')}
            size="lg"
            className="bg-white text-black hover:bg-gray-200 px-8"
          >
            View More Projects
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
