from fastapi import APIRouter, HTTPException, Depends, Header
from models import (
    ContactSubmission, ContactSubmissionCreate,
    Project, ProjectCreate, ProjectUpdate,
    User, UserLogin,
    ProfileSettings, ProfileSettingsUpdate
)
from auth import verify_password, get_password_hash, create_access_token, verify_token
from motor.motor_asyncio import AsyncIOMotorClient
import os
from typing import Optional, List
from datetime import datetime

router = APIRouter()

# Get database from app state
def get_db():
    from server import db
    return db

# Email notification function
async def send_email_notification(contact_data: dict):
    """Send email notification for contact form submission"""
    # For now, just log it. In production, integrate with SendGrid, AWS SES, etc.
    print(f"📧 New contact form submission from {contact_data['name']} ({contact_data['email']})")
    print(f"Subject: {contact_data['subject']}")
    print(f"Message: {contact_data['message']}")
    # TODO: Integrate with email service
    return True

# Auth middleware
async def get_current_user(authorization: Optional[str] = Header(None)):
    """Verify JWT token from Authorization header"""
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    token = authorization.replace("Bearer ", "")
    payload = verify_token(token)
    
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    email = payload.get("sub")
    if not email:
        raise HTTPException(status_code=401, detail="Invalid token payload")
    
    db = get_db()
    user = await db.users.find_one({"email": email})
    
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    
    return user

# ============= AUTH ROUTES =============

@router.post("/auth/login")
async def login(credentials: UserLogin):
    """Admin login"""
    db = get_db()
    user = await db.users.find_one({"email": credentials.email})
    
    if not user or not verify_password(credentials.password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    access_token = create_access_token(data={"sub": user["email"]})
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "email": user["email"],
            "id": user["id"]
        }
    }

@router.get("/auth/me")
async def get_current_user_info(current_user: dict = Depends(get_current_user)):
    """Get current logged-in user info"""
    return {
        "email": current_user["email"],
        "id": current_user["id"]
    }

# ============= CONTACT FORM ROUTES =============

@router.post("/contact")
async def submit_contact_form(contact: ContactSubmissionCreate):
    """Public endpoint: Submit contact form"""
    db = get_db()
    
    contact_obj = ContactSubmission(**contact.dict())
    await db.contact_submissions.insert_one(contact_obj.dict())
    
    # Send email notification
    await send_email_notification(contact_obj.dict())
    
    return {"success": True, "message": "Your message has been sent successfully!"}

@router.get("/admin/contacts")
async def get_all_contacts(current_user: dict = Depends(get_current_user)):
    """Admin only: Get all contact submissions"""
    db = get_db()
    contacts = await db.contact_submissions.find().sort("created_at", -1).to_list(1000)
    return contacts

@router.patch("/admin/contacts/{contact_id}/read")
async def mark_contact_as_read(contact_id: str, current_user: dict = Depends(get_current_user)):
    """Admin only: Mark contact as read"""
    db = get_db()
    result = await db.contact_submissions.update_one(
        {"id": contact_id},
        {"$set": {"read": True}}
    )
    
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Contact not found")
    
    return {"success": True}

@router.delete("/admin/contacts/{contact_id}")
async def delete_contact(contact_id: str, current_user: dict = Depends(get_current_user)):
    """Admin only: Delete contact submission"""
    db = get_db()
    result = await db.contact_submissions.delete_one({"id": contact_id})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Contact not found")
    
    return {"success": True}

# ============= PROJECTS ROUTES =============

@router.get("/projects")
async def get_all_projects(type: Optional[str] = None):
    """Public endpoint: Get all projects, optionally filtered by type"""
    db = get_db()
    
    query = {}
    if type:
        query["type"] = type
    
    projects = await db.projects.find(query).sort("order", 1).to_list(1000)
    return projects

@router.get("/projects/{project_id}")
async def get_project_by_id(project_id: str):
    """Public endpoint: Get single project by ID"""
    db = get_db()
    project = await db.projects.find_one({"id": project_id})
    
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    return project

@router.post("/admin/projects")
async def create_project(project: ProjectCreate, current_user: dict = Depends(get_current_user)):
    """Admin only: Create new project"""
    db = get_db()
    
    project_obj = Project(**project.dict())
    await db.projects.insert_one(project_obj.dict())
    
    return project_obj

@router.put("/admin/projects/{project_id}")
async def update_project(project_id: str, project_update: ProjectUpdate, current_user: dict = Depends(get_current_user)):
    """Admin only: Update existing project"""
    db = get_db()
    
    update_data = {k: v for k, v in project_update.dict().items() if v is not None}
    update_data["updated_at"] = datetime.utcnow()
    
    result = await db.projects.update_one(
        {"id": project_id},
        {"$set": update_data}
    )
    
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Project not found")
    
    updated_project = await db.projects.find_one({"id": project_id})
    return updated_project

@router.delete("/admin/projects/{project_id}")
async def delete_project(project_id: str, current_user: dict = Depends(get_current_user)):
    """Admin only: Delete project"""
    db = get_db()
    
    result = await db.projects.delete_one({"id": project_id})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Project not found")
    
    return {"success": True}

# ============= PROFILE/SETTINGS ROUTES =============

@router.get("/profile")
async def get_profile_settings():
    """Public endpoint: Get profile settings"""
    db = get_db()
    profile = await db.profile_settings.find_one()
    
    if not profile:
        # Return default profile if not found
        return {
            "name": "David Antúnez",
            "title": "Audiovisual Creator / Filmmaker",
            "tagline": "Crafting visual stories that move hearts and inspire minds",
            "bio": "I'm David Antúnez, a passionate filmmaker and audiovisual creator.",
            "profile_image": "https://images.unsplash.com/photo-1597465103212-7cd0b847a246",
            "email": "davidantunezconde@gmail.com",
            "showreel_url": "https://youtu.be/rHUYgdc1u7E",
            "social_media": {
                "instagram": "https://instagram.com/davidantunezfilms",
                "youtube": "https://youtube.com/@davidantunezfilms",
                "linkedin": "https://linkedin.com/in/davidantunez"
            }
        }
    
    return profile

@router.put("/admin/profile")
async def update_profile_settings(profile_update: ProfileSettingsUpdate, current_user: dict = Depends(get_current_user)):
    """Admin only: Update profile settings"""
    db = get_db()
    
    update_data = {k: v for k, v in profile_update.dict().items() if v is not None}
    update_data["updated_at"] = datetime.utcnow()
    
    # Check if profile exists
    existing_profile = await db.profile_settings.find_one()
    
    if existing_profile:
        # Update existing
        await db.profile_settings.update_one(
            {"id": existing_profile["id"]},
            {"$set": update_data}
        )
    else:
        # Create new
        profile_obj = ProfileSettings(**update_data)
        await db.profile_settings.insert_one(profile_obj.dict())
    
    updated_profile = await db.profile_settings.find_one()
    return updated_profile
