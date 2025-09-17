# AgriSight Backend API

A FastAPI-based backend service for the AgriSight smart agriculture platform, providing AI-powered insights for crop management, pest detection, and market analysis.

## Features

- 🌾 **Yield Prediction API** - AI-powered crop yield forecasting
- 🔍 **Pest Detection API** - Image-based pest and disease identification
- 🌤️ **Weather API** - Real-time weather data and alerts
- 🌱 **Crop Suggestions API** - Personalized crop recommendations
- 🧪 **Fertilizer Recommendations API** - Smart fertilizer guidance
- 📈 **Market Prices API** - Real-time market price tracking
- 📚 **OpenAPI Documentation** - Interactive API documentation
- 🐳 **Docker Support** - Easy deployment with Docker

## Tech Stack

- **Framework**: FastAPI
- **Language**: Python 3.11+
- **Documentation**: OpenAPI/Swagger
- **Containerization**: Docker
- **ASGI Server**: Uvicorn

## Quick Start

### Using Docker (Recommended)

1. **Clone and navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Build and run with Docker Compose**
   ```bash
   docker-compose up --build
   ```

3. **Access the API**
   - API: http://localhost:8000
   - Documentation: http://localhost:8000/docs
   - ReDoc: http://localhost:8000/redoc

### Manual Installation

1. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt
   ```

2. **Run the development server**
   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

3. **Access the API**
   - API: http://localhost:8000
   - Documentation: http://localhost:8000/docs

## API Endpoints

### Core Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Root endpoint |
| `/health` | GET | Health check |
| `/docs` | GET | Interactive API documentation |
| `/redoc` | GET | Alternative API documentation |

### Agriculture APIs

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/v1/yield-prediction` | GET | Get crop yield predictions |
| `/api/v1/pest-detection` | POST | Detect pests from images |
| `/api/v1/weather` | GET | Get weather data and alerts |
| `/api/v1/crop-suggestions` | GET | Get crop recommendations |
| `/api/v1/fertilizer-recommendations` | GET | Get fertilizer suggestions |
| `/api/v1/market-prices` | GET | Get market prices |

## API Usage Examples

### Yield Prediction
```bash
curl "http://localhost:8000/api/v1/yield-prediction?crop=tomato&farm_size=2.5&soil_type=alluvial&lat=19.0760&lon=72.8777"
```

### Pest Detection
```bash
curl -X POST "http://localhost:8000/api/v1/pest-detection" \
  -F "image=@plant_photo.jpg" \
  -F "crop_type=tomato"
```

### Weather Data
```bash
curl "http://localhost:8000/api/v1/weather?lat=19.0760&lon=72.8777&days=5"
```

### Crop Suggestions
```bash
curl "http://localhost:8000/api/v1/crop-suggestions?state=Maharashtra&district=Mumbai&soil_type=alluvial&farm_size=2.5&lat=19.0760&lon=72.8777"
```

### Fertilizer Recommendations
```bash
curl "http://localhost:8000/api/v1/fertilizer-recommendations?crop=tomato&soil_type=alluvial&farm_size=2.5"
```

### Market Prices
```bash
curl "http://localhost:8000/api/v1/market-prices?crop=tomato&days=7"
```

## Environment Configuration

Copy `env.example` to `.env` and configure:

```bash
cp env.example .env
```

Key environment variables:
- `ENVIRONMENT`: development/production
- `API_HOST`: API host (default: 0.0.0.0)
- `API_PORT`: API port (default: 8000)
- `CORS_ORIGINS`: Allowed CORS origins

## Development

### Project Structure
```
backend/
├── main.py                 # FastAPI application
├── requirements.txt        # Python dependencies
├── Dockerfile             # Docker configuration
├── docker-compose.yml     # Docker Compose setup
├── env.example            # Environment variables template
└── README.md              # This file
```

### Adding New Endpoints

1. **Define Pydantic models** in `main.py`
2. **Create endpoint function** with proper typing
3. **Add error handling** and validation
4. **Update OpenAPI schema** if needed

Example:
```python
@app.get("/api/v1/new-endpoint", response_model=NewResponse)
async def new_endpoint(param: str):
    try:
        # Your logic here
        return NewResponse(data=result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
```

### Testing

Run the API and test endpoints using:
- **Interactive docs**: http://localhost:8000/docs
- **curl commands**: See examples above
- **Postman**: Import OpenAPI schema from `/openapi.json`

## Deployment

### Docker Deployment

1. **Build image**
   ```bash
   docker build -t agrisight-api .
   ```

2. **Run container**
   ```bash
   docker run -p 8000:8000 agrisight-api
   ```

### Production Deployment

1. **Set environment variables**
   ```bash
   export ENVIRONMENT=production
   export API_HOST=0.0.0.0
   export API_PORT=8000
   ```

2. **Run with production server**
   ```bash
   uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
   ```

### Cloud Deployment

The API is ready for deployment on:
- **AWS**: Use ECS, Lambda, or EC2
- **Google Cloud**: Use Cloud Run or Compute Engine
- **Azure**: Use Container Instances or App Service
- **Heroku**: Use container deployment
- **DigitalOcean**: Use App Platform or Droplets

## Integration with Frontend

The backend is designed to work seamlessly with the AgriSight UI frontend:

1. **Update frontend environment**:
   ```env
   NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
   NEXT_PUBLIC_MOCK_API=false
   ```

2. **Frontend will automatically use real API endpoints**

## API Response Format

All API responses follow this format:

```json
{
  "success": true,
  "data": { ... },
  "metadata": { ... }
}
```

Error responses:
```json
{
  "success": false,
  "error": "Error Type",
  "message": "Error description",
  "details": { ... }
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the API documentation at `/docs`
