from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import Optional, List
from datetime import datetime
import uuid

# User/Admin Model
class User(BaseModel):
    model_config = ConfigDict(arbitrary_types_allowed=True)
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: EmailStr
    password_hash: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

class UserCreate(BaseModel):
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

# Contact Form Model
class ContactSubmission(BaseModel):
    model_config = ConfigDict(arbitrary_types_allowed=True)
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    subject: str
    message: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    read: bool = False

class ContactSubmissionCreate(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str

# Project Model
class Project(BaseModel):
    model_config = ConfigDict(arbitrary_types_allowed=True)
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    category: str  # Documentary, Music Video, Commercial, etc.
    type: str  # video or photography
    thumbnail: str
    description: str
    year: str
    role: str
    credits: str
    video_url: Optional[str] = None
    gallery: List[str] = []
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    order: int = 0  # For custom ordering

class ProjectCreate(BaseModel):
    title: str
    category: str
    type: str
    thumbnail: str
    description: str
    year: str
    role: str
    credits: str
    video_url: Optional[str] = None
    gallery: List[str] = []
    order: int = 0

class ProjectUpdate(BaseModel):
    title: Optional[str] = None
    category: Optional[str] = None
    type: Optional[str] = None
    thumbnail: Optional[str] = None
    description: Optional[str] = None
    year: Optional[str] = None
    role: Optional[str] = None
    credits: Optional[str] = None
    video_url: Optional[str] = None
    gallery: Optional[List[str]] = None
    order: Optional[int] = None

# Profile/Settings Model
class ProfileSettings(BaseModel):
    model_config = ConfigDict(arbitrary_types_allowed=True)
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    title: str
    tagline: str
    bio: str
    profile_image: str
    email: str
    showreel_url: str
    social_media: dict
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class ProfileSettingsUpdate(BaseModel):
    name: Optional[str] = None
    title: Optional[str] = None
    tagline: Optional[str] = None
    bio: Optional[str] = None
    profile_image: Optional[str] = None
    email: Optional[str] = None
    showreel_url: Optional[str] = None
    social_media: Optional[dict] = None
