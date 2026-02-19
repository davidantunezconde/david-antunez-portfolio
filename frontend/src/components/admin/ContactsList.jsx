import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { apiCall } from '../../utils/auth';
import { Mail, Trash2, CheckCircle, Clock } from 'lucide-react';
import { toast } from 'sonner';

const ContactsList = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, unread, read

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await apiCall('/api/admin/contacts');
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      toast.error('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (contactId) => {
    try {
      await apiCall(`/api/admin/contacts/${contactId}/read`, {
        method: 'PATCH'
      });
      toast.success('Marked as read');
      fetchContacts();
    } catch (error) {
      console.error('Error marking as read:', error);
      toast.error('Failed to update');
    }
  };

  const handleDelete = async (contactId) => {
    if (!window.confirm('Are you sure you want to delete this message?')) {
      return;
    }

    try {
      await apiCall(`/api/admin/contacts/${contactId}`, {
        method: 'DELETE'
      });
      toast.success('Message deleted');
      fetchContacts();
    } catch (error) {
      console.error('Error deleting contact:', error);
      toast.error('Failed to delete message');
    }
  };

  const filteredContacts = contacts.filter(contact => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !contact.read;
    if (filter === 'read') return contact.read;
    return true;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  return (
    <AdminLayout>
      <div>
        <h2 className="text-3xl font-bold text-white mb-8">Contact Messages</h2>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6">
          <Button
            onClick={() => setFilter('all')}
            variant={filter === 'all' ? 'default' : 'outline'}
            className={filter === 'all' ? 'bg-white text-black' : 'bg-transparent border-zinc-700 text-gray-400 hover:text-white hover:bg-zinc-800'}
          >
            All ({contacts.length})
          </Button>
          <Button
            onClick={() => setFilter('unread')}
            variant={filter === 'unread' ? 'default' : 'outline'}
            className={filter === 'unread' ? 'bg-white text-black' : 'bg-transparent border-zinc-700 text-gray-400 hover:text-white hover:bg-zinc-800'}
          >
            <Mail className="w-4 h-4 mr-2" />
            Unread ({contacts.filter(c => !c.read).length})
          </Button>
          <Button
            onClick={() => setFilter('read')}
            variant={filter === 'read' ? 'default' : 'outline'}
            className={filter === 'read' ? 'bg-white text-black' : 'bg-transparent border-zinc-700 text-gray-400 hover:text-white hover:bg-zinc-800'}
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Read ({contacts.filter(c => c.read).length})
          </Button>
        </div>

        {loading ? (
          <div className="text-gray-400">Loading messages...</div>
        ) : filteredContacts.length === 0 ? (
          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="py-12 text-center">
              <Mail className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">No messages found</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredContacts.map((contact) => (
              <Card
                key={contact.id}
                className={`bg-zinc-900 border-zinc-800 ${!contact.read ? 'border-l-4 border-l-blue-500' : ''}`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {!contact.read && (
                          <span className="px-2 py-1 bg-blue-500 text-white text-xs rounded">
                            New
                          </span>
                        )}
                        <span className="text-sm text-gray-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatDate(contact.created_at)}
                        </span>
                      </div>
                      <CardTitle className="text-white text-lg mb-1">
                        {contact.subject}
                      </CardTitle>
                      <p className="text-sm text-gray-400">
                        From: {contact.name} ({contact.email})
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4 whitespace-pre-wrap">{contact.message}</p>
                  <div className="flex gap-2">
                    {!contact.read && (
                      <Button
                        onClick={() => markAsRead(contact.id)}
                        size="sm"
                        className="bg-zinc-800 text-white hover:bg-zinc-700"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Mark as Read
                      </Button>
                    )}
                    <Button
                      onClick={() => window.location.href = `mailto:${contact.email}?subject=Re: ${contact.subject}`}
                      size="sm"
                      className="bg-blue-600 text-white hover:bg-blue-700"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Reply
                    </Button>
                    <Button
                      onClick={() => handleDelete(contact.id)}
                      size="sm"
                      variant="destructive"
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

export default ContactsList;
