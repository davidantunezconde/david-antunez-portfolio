import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Instagram, Youtube, Linkedin, Mail, Send } from 'lucide-react';
import { profileData } from '../mockData';
import { toast } from 'sonner';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast.success('Message sent successfully! I will get back to you soon.');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section id="contact" className="contact-section py-32 px-6 bg-black relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 to-black"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Let's Work Together
          </h2>
          <div className="h-1 w-24 bg-white mx-auto mb-6"></div>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Have a project in mind? Let's create something extraordinary together.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="contact-form">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-white/30 h-12"
                />
              </div>
              <div>
                <Input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-white/30 h-12"
                />
              </div>
              <div>
                <Input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-white/30 h-12"
                />
              </div>
              <div>
                <Textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-white/30 resize-none"
                />
              </div>
              <Button 
                type="submit"
                disabled={isSubmitting}
                size="lg"
                className="w-full bg-white text-black hover:bg-gray-200 transition-all duration-300 h-12"
              >
                {isSubmitting ? (
                  'Sending...'
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="contact-info">
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-white mb-6">Get In Touch</h3>
              <div className="space-y-4">
                <a 
                  href={`mailto:${profileData.email}`}
                  className="flex items-center text-gray-300 hover:text-white transition-colors duration-300 group"
                >
                  <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mr-4 group-hover:bg-white/10 transition-colors duration-300">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span className="text-lg">{profileData.email}</span>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Follow Me</h3>
              <div className="flex gap-4">
                <a
                  href={profileData.socialMedia.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center hover:bg-white/10 transition-all duration-300 group"
                >
                  <Instagram className="w-5 h-5 text-white" />
                </a>
                <a
                  href={profileData.socialMedia.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center hover:bg-white/10 transition-all duration-300 group"
                >
                  <Youtube className="w-5 h-5 text-white" />
                </a>
                <a
                  href={profileData.socialMedia.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center hover:bg-white/10 transition-all duration-300 group"
                >
                  <Linkedin className="w-5 h-5 text-white" />
                </a>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-12 p-6 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
              <p className="text-gray-300 leading-relaxed">
                Available for freelance projects, collaborations, and creative partnerships. 
                Let's bring your vision to life with compelling visual storytelling.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
