FROM python:3.11-slim

WORKDIR /app

# Copy requirements and install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY backend/ ./backend/

# Set working directory to backend
WORKDIR /app/backend

# Expose port (Railway uses PORT env variable)
ENV PORT=8001
EXPOSE 8001

# Start the server
CMD uvicorn server:app --host 0.0.0.0 --port $PORT
