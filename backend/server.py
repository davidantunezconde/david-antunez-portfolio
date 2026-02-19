from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from auth import get_password_hash

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Import and include routes
from routes import router as api_routes
api_router.include_router(api_routes)

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("startup")
async def startup_db_client():
    """Initialize database with admin user if not exists"""
    # Check if admin user exists
    admin_user = await db.users.find_one({"email": "davidantunezconde@gmail.com"})
    
    if not admin_user:
        # Create admin user
        from models import User
        import uuid
        from datetime import datetime
        
        admin = User(
            id=str(uuid.uuid4()),
            email="davidantunezconde@gmail.com",
            password_hash=get_password_hash("Davidac5858"),
            created_at=datetime.utcnow()
        )
        await db.users.insert_one(admin.dict())
        logger.info("✅ Admin user created: davidantunezconde@gmail.com")
    else:
        logger.info("✅ Admin user already exists")
    
    # Initialize profile settings if not exists
    profile = await db.profile_settings.find_one()
    if not profile:
        from models import ProfileSettings
        default_profile = ProfileSettings(
            name="David Antúnez",
            title="Audiovisual Creator / Filmmaker",
            tagline="Crafting visual stories that move hearts and inspire minds",
            bio="I'm David Antúnez, a passionate filmmaker and audiovisual creator dedicated to bringing stories to life through the power of visual storytelling. With years of experience in cinematography, editing, and color grading, I transform ideas into compelling narratives that resonate emotionally with audiences. My work spans documentaries, music videos, commercial productions, and artistic projects, each crafted with meticulous attention to detail and a deep understanding of visual language.",
            profile_image="https://images.unsplash.com/photo-1597465103212-7cd0b847a246",
            email="davidantunezconde@gmail.com",
            showreel_url="https://youtu.be/rHUYgdc1u7E",
            social_media={
                "instagram": "https://instagram.com/davidantunezfilms",
                "youtube": "https://youtube.com/@davidantunezfilms",
                "linkedin": "https://linkedin.com/in/davidantunez"
            }
        )
        await db.profile_settings.insert_one(default_profile.dict())
        logger.info("✅ Default profile settings created")

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
