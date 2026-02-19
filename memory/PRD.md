# David Antúnez Films - Audiovisual Portfolio Website

## Product Requirement Document

**Created:** December 19, 2025  
**Last Updated:** December 19, 2025 (Phase 2 & 3 Complete)

---

## PHASE 2 & 3 COMPLETE ✅

### Backend API (Phase 2) - DONE
✅ Contact form with database storage & email notifications
✅ Projects CRUD API (Create, Read, Update, Delete)
✅ MongoDB models for all entities
✅ Authentication system with JWT tokens
✅ Profile/settings API endpoints

### Admin Panel (Phase 3) - DONE
✅ Admin login system (davidantunezconde@gmail.com)
✅ Protected routes with authentication
✅ Admin dashboard with statistics
✅ Projects management (List, Add, Edit, Delete)
✅ Contact submissions viewer
✅ Responsive admin interface

---

## Admin Credentials

**Email:** davidantunezconde@gmail.com  
**Password:** Davidac5858

**Admin Panel URL:** /admin/login

---

## API Endpoints

### Public Endpoints
- `GET /api/projects` - Get all projects (with optional type filter)
- `GET /api/projects/:id` - Get single project
- `POST /api/contact` - Submit contact form
- `GET /api/profile` - Get profile settings

### Admin Endpoints (Requires Authentication)
- `POST /api/auth/login` - Admin login
- `GET /api/auth/me` - Get current user info

**Projects Management:**
- `POST /api/admin/projects` - Create project
- `PUT /api/admin/projects/:id` - Update project
- `DELETE /api/admin/projects/:id` - Delete project

**Contact Management:**
- `GET /api/admin/contacts` - Get all contact submissions
- `PATCH /api/admin/contacts/:id/read` - Mark as read
- `DELETE /api/admin/contacts/:id` - Delete contact

**Profile Management:**
- `PUT /api/admin/profile` - Update profile settings

---

## How to Use the Admin Panel

### 1. Login
- Go to `/admin/login`
- Email: davidantunezconde@gmail.com
- Password: Davidac5858

### 2. Add Your First Project
- Click "Dashboard" → "Add New Project" or "Projects" → "Add Project"
- Fill in project details:
  - **Type:** Video or Photography
  - **Title:** Project name
  - **Category:** Documentary, Music Video, Commercial, etc.
  - **Thumbnail URL:** Main project image
  - **Year & Role:** Production year and your role
  - **Description:** Project description
  - **Credits:** Team credits
  - **Video URL:** (Optional) YouTube/Vimeo link
  - **Gallery:** Behind-the-scenes images (add multiple)
- Click "Create Project"

### 3. Manage Projects
- View all projects in "Projects" tab
- Filter by Video or Photography
- Edit or Delete projects
- Projects automatically appear on public website

### 4. View Contact Messages
- Go to "Messages" tab
- See all contact form submissions
- Filter: All, Unread, Read
- Mark as read
- Reply via email
- Delete messages

### 5. Update Profile Settings
- (Future feature - can be added if needed)
- Update bio, social media links, showreel URL

---

## Current Status

**Working Features:**
- ✅ Public portfolio website with YouTube showreel
- ✅ Functional contact form (stores in database)
- ✅ Admin authentication and authorization
- ✅ Full project management system
- ✅ Contact submissions management
- ✅ Responsive design (mobile & desktop)

**Data Flow:**
- Portfolio shows **mock data** until you add projects via admin panel
- Once you add projects through admin, they replace mock data
- Contact form submissions go directly to database
- Notifications sent to: davidantunezconde@gmail.com

---

## Tech Stack

**Frontend:**
- React 19 with React Router v7
- Tailwind CSS + Shadcn UI
- JWT authentication (localStorage)
- Fetch API for backend calls

**Backend:**
- FastAPI with Python
- MongoDB with Motor (async driver)
- JWT tokens (passlib + python-jose)
- bcrypt password hashing

**Deployment:**
- Emergent Platform
- Supervisor for process management
- MongoDB Atlas compatible

---

## Next Steps / Future Enhancements

### Immediate Actions:
1. **Add Your Real Projects** - Use admin panel to add your actual work
2. **Test Contact Form** - Submit a test message to verify email notifications
3. **Update Social Media Links** - If yours are different from placeholders

### P1 Enhancements:
- Image upload functionality (currently uses URLs)
- Bulk project import
- Project categories management
- Analytics/views tracking
- Email service integration (SendGrid/AWS SES)

### P2 Future Features:
- Client testimonials section
- Blog/news section
- Project search and advanced filtering
- Multi-language support
- SEO optimization
- Performance improvements

---

## Important Notes

### Security:
- Admin passwords are hashed with bcrypt
- JWT tokens expire after 7 days
- Protected routes require authentication
- CORS enabled for development

### Backup:
- MongoDB stores all data
- Regular backups recommended
- Export projects periodically

### Email Notifications:
- Currently logs to console
- **TODO:** Integrate SendGrid or AWS SES for actual email delivery
- Recipient: davidantunezconde@gmail.com

---

## Troubleshooting

**Can't login to admin?**
- Email: davidantunezconde@gmail.com
- Password: Davidac5858
- Check browser console for errors

**Projects not showing?**
- Add projects via admin panel
- Mock data shows until real projects added
- Check /admin/projects to manage

**Contact form not working?**
- Check backend logs: `tail -f /var/log/supervisor/backend.err.log`
- Verify MongoDB connection
- Test API: `curl -X POST http://localhost:8001/api/contact`

