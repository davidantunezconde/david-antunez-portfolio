import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { apiCall } from '../../utils/auth';
import { Video, Camera, Mail, TrendingUp } from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalProjects: 0,
    videoProjects: 0,
    photoProjects: 0,
    unreadMessages: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [projectsRes, contactsRes] = await Promise.all([
        apiCall('/api/projects'),
        apiCall('/api/admin/contacts')
      ]);

      const projects = await projectsRes.json();
      const contacts = await contactsRes.json();

      const videoCount = projects.filter(p => p.type === 'video').length;
      const photoCount = projects.filter(p => p.type === 'photography').length;
      const unreadCount = contacts.filter(c => !c.read).length;

      setStats({
        totalProjects: projects.length,
        videoProjects: videoCount,
        photoProjects: photoCount,
        unreadMessages: unreadCount
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Projects',
      value: stats.totalProjects,
      icon: TrendingUp,
      color: 'text-blue-500'
    },
    {
      title: 'Video Projects',
      value: stats.videoProjects,
      icon: Video,
      color: 'text-purple-500'
    },
    {
      title: 'Photo Projects',
      value: stats.photoProjects,
      icon: Camera,
      color: 'text-green-500'
    },
    {
      title: 'Unread Messages',
      value: stats.unreadMessages,
      icon: Mail,
      color: 'text-orange-500'
    }
  ];

  return (
    <AdminLayout>
      <div>
        <h2 className="text-3xl font-bold text-white mb-8">Dashboard</h2>

        {loading ? (
          <div className="text-gray-400">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statCards.map((stat) => {
              const Icon = stat.icon;
              return (
                <Card key={stat.title} className="bg-zinc-900 border-zinc-800">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-400">
                      {stat.title}
                    </CardTitle>
                    <Icon className={`w-5 h-5 ${stat.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-white">{stat.value}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        <div className="mt-8">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <a
                  href="/admin/projects/new"
                  className="p-4 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors text-center"
                >
                  <Video className="w-8 h-8 text-white mx-auto mb-2" />
                  <p className="text-white font-medium">Add New Project</p>
                </a>
                <a
                  href="/admin/contacts"
                  className="p-4 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors text-center"
                >
                  <Mail className="w-8 h-8 text-white mx-auto mb-2" />
                  <p className="text-white font-medium">View Messages</p>
                </a>
                <a
                  href="/"
                  target="_blank"
                  className="p-4 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors text-center"
                >
                  <TrendingUp className="w-8 h-8 text-white mx-auto mb-2" />
                  <p className="text-white font-medium">View Live Site</p>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
