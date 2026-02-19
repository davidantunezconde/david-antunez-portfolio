import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { videoProjects, photographyProjects } from '../mockData';
import { useNavigate } from 'react-router-dom';

const Portfolio = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('video');

  const handleProjectClick = (projectId) => {
    navigate(`/project/${projectId}`);
  };

  const ProjectCard = ({ project }) => (
    <div 
      onClick={() => handleProjectClick(project.id)}
      className="project-card group relative overflow-hidden rounded-lg cursor-pointer shadow-xl"
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img 
          src={project.thumbnail}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300"></div>
      
      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <p className="text-sm uppercase tracking-wider text-gray-300 mb-2">{project.category}</p>
        <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
        <p className="text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2">
          {project.description}
        </p>
        <p className="text-xs text-gray-400 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {project.year}
        </p>
      </div>
    </div>
  );

  return (
    <section id="portfolio" className="portfolio-section py-32 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Portfolio
          </h2>
          <div className="h-1 w-24 bg-white mx-auto mb-6"></div>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Explore my work across video production and photography
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-16 bg-white/5 backdrop-blur-sm p-1 rounded-lg">
            <TabsTrigger 
              value="video"
              className="data-[state=active]:bg-white data-[state=active]:text-black text-white transition-all duration-300"
            >
              Video Projects
            </TabsTrigger>
            <TabsTrigger 
              value="photography"
              className="data-[state=active]:bg-white data-[state=active]:text-black text-white transition-all duration-300"
            >
              Photography
            </TabsTrigger>
          </TabsList>

          <TabsContent value="video" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {videoProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="photography" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {photographyProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Portfolio;
