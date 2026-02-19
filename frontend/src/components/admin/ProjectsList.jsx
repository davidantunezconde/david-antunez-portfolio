import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { apiCall } from '../../utils/auth';
import { Plus, Edit, Trash2, Video, Camera } from 'lucide-react';
import { toast } from 'sonner';

const ProjectsList = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, video, photography

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await apiCall('/api/projects');
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (projectId) => {
    if (!window.confirm('Are you sure you want to delete this project?')) {
      return;
    }

    try {
      await apiCall(`/api/admin/projects/${projectId}`, {
        method: 'DELETE'
      });
      toast.success('Project deleted successfully');
      fetchProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
      toast.error('Failed to delete project');
    }
  };

  const filteredProjects = projects.filter(project => {
    if (filter === 'all') return true;
    return project.type === filter;
  });

  return (
    <AdminLayout>
      <div>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-white">Projects</h2>
          <Button
            onClick={() => navigate('/admin/projects/new')}
            className="bg-white text-black hover:bg-gray-200"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Project
          </Button>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6">
          <Button
            onClick={() => setFilter('all')}
            variant={filter === 'all' ? 'default' : 'outline'}
            className={filter === 'all' ? 'bg-white text-black' : 'bg-transparent border-zinc-700 text-gray-400 hover:text-white hover:bg-zinc-800'}
          >
            All Projects ({projects.length})
          </Button>
          <Button
            onClick={() => setFilter('video')}
            variant={filter === 'video' ? 'default' : 'outline'}
            className={filter === 'video' ? 'bg-white text-black' : 'bg-transparent border-zinc-700 text-gray-400 hover:text-white hover:bg-zinc-800'}
          >
            <Video className="w-4 h-4 mr-2" />
            Video ({projects.filter(p => p.type === 'video').length})
          </Button>
          <Button
            onClick={() => setFilter('photography')}
            variant={filter === 'photography' ? 'default' : 'outline'}
            className={filter === 'photography' ? 'bg-white text-black' : 'bg-transparent border-zinc-700 text-gray-400 hover:text-white hover:bg-zinc-800'}
          >
            <Camera className="w-4 h-4 mr-2" />
            Photography ({projects.filter(p => p.type === 'photography').length})
          </Button>
        </div>

        {loading ? (
          <div className="text-gray-400">Loading projects...</div>
        ) : filteredProjects.length === 0 ? (
          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="py-12 text-center">
              <p className="text-gray-400 mb-4">No projects found</p>
              <Button
                onClick={() => navigate('/admin/projects/new')}
                className="bg-white text-black hover:bg-gray-200"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Project
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="bg-zinc-900 border-zinc-800 overflow-hidden">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {project.type === 'video' ? (
                          <Video className="w-4 h-4 text-purple-500" />
                        ) : (
                          <Camera className="w-4 h-4 text-green-500" />
                        )}
                        <span className="text-xs text-gray-400 uppercase">{project.category}</span>
                      </div>
                      <CardTitle className="text-white text-lg">{project.title}</CardTitle>
                      <p className="text-sm text-gray-400 mt-1">{project.year}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => navigate(`/admin/projects/edit/${project.id}`)}
                      size="sm"
                      className="flex-1 bg-zinc-800 text-white hover:bg-zinc-700"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(project.id)}
                      size="sm"
                      variant="destructive"
                      className="flex-1"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default ProjectsList;
