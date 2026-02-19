# David Antúnez Films - Audiovisual Portfolio Website

## Product Requirement Document

**Created:** December 19, 2025  
**Last Updated:** December 19, 2025

---

## Original Problem Statement

Create a modern, cinematic and minimal landing page for an audiovisual portfolio. The website is for David Antúnez, a young audiovisual creator and filmmaker. The design must feel premium, clean, visual and highly aesthetic, inspired by film industry portfolios.

---

## User Personas

**Primary User:** David Antúnez (Portfolio Owner)
- Professional filmmaker and audiovisual creator
- Needs to showcase video and photography work
- Wants to attract potential clients
- Requires professional online presence

**Secondary Users:** Potential Clients & Visitors
- Looking for filmmaker/videographer services
- Want to view portfolio work
- Need to contact for projects
- Interested in services offered

---

## Core Requirements (Static)

### Design Requirements
- Minimalist design with cinematic look
- Dark mode color scheme
- Large visuals and full-width images
- Smooth animations and transitions
- Modern typography (Inter font)
- Professional and artistic feeling
- Mobile responsive

### Functional Requirements
- Hero section with background and CTA
- About section with bio and profile
- Portfolio gallery (Videos & Photography)
- Individual project detail pages
- Services showcase
- Contact form
- Social media integration
- Smooth scrolling navigation

---

## What's Been Implemented (Phase 1 - December 19, 2025)

### ✅ Frontend Structure
- **Hero Section**
  - Fullscreen with cinematic background image
  - Name: "David Antúnez"
  - Title: "Audiovisual Creator / Filmmaker"
  - Tagline and CTA button
  - Smooth scroll indicator

- **Header/Navigation**
  - Fixed header with smooth scroll
  - Responsive mobile menu
  - Navigation links (About, Portfolio, Services, Contact)

- **About Section**
  - Profile image with parallax effect
  - Professional bio
  - Skill tags (Cinematography, Directing, Editing, Color Grading, Photography)

- **Portfolio Section**
  - Tab navigation (Video Projects / Photography)
  - Grid layout (3 columns)
  - 6 video projects with categories:
    - Documentary
    - Music Videos
    - Commercial
    - Corporate
    - Experimental
  - 5 photography projects with categories:
    - Portrait
    - Documentary
    - Artistic
    - Commercial
    - Lifestyle
  - Hover effects with overlay
  - Click to view project details

- **Project Detail Pages**
  - Hero image/video embed
  - Project description
  - Credits section
  - Behind-the-scenes gallery
  - Back navigation
  - Related projects CTA

- **Services Section**
  - 4 service cards:
    - Video Production
    - Photography
    - Editing & Post-Production
    - Color Grading
  - Icon-based design with hover effects

- **Contact Section**
  - Contact form (Name, Email, Subject, Message)
  - Frontend form validation
  - Email display
  - Social media links (Instagram, YouTube, LinkedIn)
  - Success toast notifications

- **Footer**
  - Brand information
  - Quick navigation links
  - Social media icons
  - Copyright information

### ✅ Technical Implementation
- React 19 with React Router for SPA
- Shadcn UI components
- Tailwind CSS for styling
- Lucide React icons
- Sonner for toast notifications
- Mock data structure for projects
- Responsive design
- Smooth animations and transitions
- Dark theme color scheme

### ✅ Design Assets
- 3 filmmaker/cinematography images
- 8 video project thumbnails
- 8 photography project thumbnails
- All images from Unsplash/Pexels

---

## Known Issues

### Vimeo Video Embedding
- **Issue:** Showreel video (https://vimeo.com/1166314185) returns 401 Unauthorized
- **Reason:** Video may be private or have embedding restrictions
- **Current Solution:** Using static cinematic background image as fallback
- **Future Solution:** User needs to make video public or provide embeddable video URL

---

## Prioritized Backlog

### P0 (Phase 2 - Backend Development)

#### Backend Features
1. **Contact Form Backend**
   - Create `/api/contact` POST endpoint
   - Store form submissions in MongoDB
   - Email notification integration
   - Form validation

2. **Projects Management API**
   - CRUD endpoints for projects
   - `/api/projects` GET (list all)
   - `/api/projects/:id` GET (single)
   - `/api/projects` POST (create)
   - `/api/projects/:id` PUT (update)
   - `/api/projects/:id` DELETE (remove)
   - Image upload handling

3. **Database Models**
   - Project model (title, category, description, year, role, credits, images, video URL)
   - Contact submission model
   - Analytics/views tracking

### P1 (Phase 3 - Admin Panel)

4. **Admin Authentication**
   - Login system for David
   - JWT token-based auth
   - Protected admin routes

5. **Admin Dashboard**
   - View all projects
   - Add new projects
   - Edit existing projects
   - Delete projects
   - Upload images
   - Manage video URLs
   - View contact form submissions

6. **Content Management**
   - Edit about section content
   - Update services
   - Manage social media links
   - Update profile image

### P2 (Future Enhancements)

7. **Advanced Features**
   - Project categories filtering
   - Search functionality
   - Video hosting integration
   - Analytics dashboard
   - Client testimonials section
   - Blog/News section
   - Multi-language support
   - SEO optimization
   - Performance optimization
   - Image lazy loading

8. **Video Integration**
   - Fix Vimeo embedding (make video public)
   - Or integrate with alternative video platforms
   - Add showreel section with multiple videos

---

## Next Action Items

1. **Fix Vimeo Video** (If user wants)
   - User needs to make the Vimeo video public
   - Or provide an alternative embeddable video URL
   - Or use a different video hosting service

2. **Phase 2: Backend Development** (When user requests)
   - Set up backend API endpoints
   - Create MongoDB models
   - Integrate contact form with backend
   - Remove mock data and connect to database

3. **Phase 3: Admin Panel** (When user requests)
   - Build admin authentication
   - Create admin dashboard
   - Implement project management interface

---

## API Contracts (For Phase 2)

### Contact Form
```
POST /api/contact
Body: {
  name: string,
  email: string,
  subject: string,
  message: string
}
Response: {
  success: boolean,
  message: string
}
```

### Projects
```
GET /api/projects?category=video|photography
Response: {
  projects: Project[]
}

GET /api/projects/:id
Response: {
  project: Project
}

POST /api/projects (Admin only)
Body: Project data
Response: {
  success: boolean,
  project: Project
}

PUT /api/projects/:id (Admin only)
Body: Project data
Response: {
  success: boolean,
  project: Project
}

DELETE /api/projects/:id (Admin only)
Response: {
  success: boolean
}
```

---

## Mock Data Reference

Currently using `/app/frontend/src/mockData.js` for:
- Profile data (name, bio, social links, images)
- Services data
- Video projects (6 projects)
- Photography projects (5 projects)

**To Remove:** Mock data will be replaced with database data in Phase 2

---

## Technical Stack

**Frontend:**
- React 19
- React Router v7
- Tailwind CSS
- Shadcn UI
- Lucide React Icons
- Sonner (Toast notifications)

**Backend (Not yet implemented):**
- FastAPI
- MongoDB with Motor
- JWT Authentication

**Deployment:**
- Emergent Platform
- Supervisor for process management

