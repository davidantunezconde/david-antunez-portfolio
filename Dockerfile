FROM python:3.11-slim

WORKDIR /app

# Copy requirements and install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY backend/ ./

# Expose port (Railway uses PORT env variable)
ENV PORT=8001
EXPOSE 8001

# Start the server
CMD ["sh", "-c", "uvicorn server:app --host 0.0.0.0 --port $PORT"]
