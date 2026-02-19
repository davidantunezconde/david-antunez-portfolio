import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { apiCall } from '../../utils/auth';
import { toast } from 'sonner';
import { ArrowLeft, Plus, X } from 'lucide-react';

const ProjectForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    type: 'video',
    thumbnail: '',
    description: '',
    year: new Date().getFullYear().toString(),
    role: '',
    credits: '',
    video_url: '',
    gallery: [],
    order: 0
  });
  const [galleryInput, setGalleryInput] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit) {
      fetchProject();
    }
  }, [id]);

  const fetchProject = async () => {
    try {
      const response = await apiCall(`/api/projects/${id}`);
      const project = await response.json();
      setFormData(project);
    } catch (error) {
      console.error('Error fetching project:', error);
      toast.error('Failed to load project');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const addGalleryImage = () => {
    if (galleryInput.trim()) {
      setFormData({
        ...formData,
        gallery: [...formData.gallery, galleryInput.trim()]
      });
      setGalleryInput('');
    }
  };

  const removeGalleryImage = (index) => {
    setFormData({
      ...formData,
      gallery: formData.gallery.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const endpoint = isEdit ? `/api/admin/projects/${id}` : '/api/admin/projects';
      const method = isEdit ? 'PUT' : 'POST';

      await apiCall(endpoint, {
        method,
        body: JSON.stringify(formData)
      });

      toast.success(isEdit ? 'Project updated successfully' : 'Project created successfully');
      navigate('/admin/projects');
    } catch (error) {
      console.error('Error saving project:', error);
      toast.error('Failed to save project');
    } finally {
      setLoading(false);
    }
  };

  const videoCategories = ['Documentary', 'Music Video', 'Commercial', 'Corporate', 'Experimental'];
  const photoCategories = ['Portrait', 'Documentary', 'Artistic', 'Commercial', 'Lifestyle'];
  const categories = formData.type === 'video' ? videoCategories : photoCategories;

  return (
    <AdminLayout>
      <div>
        <Button
          onClick={() => navigate('/admin/projects')}
          variant="ghost"
          className="mb-6 text-gray-400 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Projects
        </Button>

        <h2 className="text-3xl font-bold text-white mb-8">
          {isEdit ? 'Edit Project' : 'Add New Project'}
        </h2>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Project Type */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Project Type *
                </label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => handleSelectChange('type', value)}
                >
                  <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-800 border-zinc-700">
                    <SelectItem value="video">Video Project</SelectItem>
                    <SelectItem value="photography">Photography Project</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Title *
                </label>
                <Input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="bg-zinc-800 border-zinc-700 text-white"
                  placeholder="Project title"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Category *
                </label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => handleSelectChange('category', value)}
                >
                  <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-800 border-zinc-700">
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Thumbnail URL */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Thumbnail Image URL *
                </label>
                <Input
                  name="thumbnail"
                  value={formData.thumbnail}
                  onChange={handleChange}
                  required
                  className="bg-zinc-800 border-zinc-700 text-white"
                  placeholder="https://..."
                />
                {formData.thumbnail && (
                  <div className="mt-2">
                    <img src={formData.thumbnail} alt="Thumbnail preview" className="w-32 h-24 object-cover rounded" />
                  </div>
                )}
              </div>

              {/* Year & Role */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Year *
                  </label>
                  <Input
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    required
                    className="bg-zinc-800 border-zinc-700 text-white"
                    placeholder="2024"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Your Role *
                  </label>
                  <Input
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                    className="bg-zinc-800 border-zinc-700 text-white"
                    placeholder="Director, Cinematographer"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Description *
                </label>
                <Textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="bg-zinc-800 border-zinc-700 text-white resize-none"
                  placeholder="Project description..."
                />
              </div>

              {/* Credits */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Credits *
                </label>
                <Textarea
                  name="credits"
                  value={formData.credits}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="bg-zinc-800 border-zinc-700 text-white resize-none"
                  placeholder="Producer: John Doe | Editor: Jane Smith"
                />
              </div>

              {/* Video URL (optional) */}
              {formData.type === 'video' && (
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Video URL (YouTube/Vimeo)
                  </label>
                  <Input
                    name="video_url"
                    value={formData.video_url}
                    onChange={handleChange}
                    className="bg-zinc-800 border-zinc-700 text-white"
                    placeholder="https://youtube.com/..."
                  />
                </div>
              )}

              {/* Gallery Images */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Gallery Images (Behind the Scenes)
                </label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={galleryInput}
                    onChange={(e) => setGalleryInput(e.target.value)}
                    className="bg-zinc-800 border-zinc-700 text-white"
                    placeholder="Image URL"
                  />
                  <Button
                    type="button"
                    onClick={addGalleryImage}
                    className="bg-zinc-800 text-white hover:bg-zinc-700"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                {formData.gallery.length > 0 && (
                  <div className="grid grid-cols-4 gap-2 mt-2">
                    {formData.gallery.map((img, index) => (
                      <div key={index} className="relative group">
                        <img src={img} alt={`Gallery ${index + 1}`} className="w-full h-24 object-cover rounded" />
                        <button
                          type="button"
                          onClick={() => removeGalleryImage(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex gap-4 pt-4">
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-white text-black hover:bg-gray-200"
                >
                  {loading ? 'Saving...' : isEdit ? 'Update Project' : 'Create Project'}
                </Button>
                <Button
                  type="button"
                  onClick={() => navigate('/admin/projects')}
                  variant="outline"
                  className="bg-transparent border-zinc-700 text-gray-400 hover:text-white hover:bg-zinc-800"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default ProjectForm;
