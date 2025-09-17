from fastapi import FastAPI, HTTPException, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import uvicorn
import json
from datetime import datetime, timedelta
import random
import os

# Initialize FastAPI app
app = FastAPI(
    title="AgriSight API",
    description="Smart Agriculture Platform API for crop management, pest detection, and market insights",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://agrisight-ui.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models
class YieldDataPoint(BaseModel):
    month: str
    predicted: float
    actual: Optional[float] = None
    confidence: Optional[float] = None

class YieldPredictionResponse(BaseModel):
    success: bool = True
    predictions: List[YieldDataPoint]
    metadata: Dict[str, Any]

class PestDetection(BaseModel):
    pest: str
    confidence: float
    severity: str
    recommendations: List[str]
    alternative_pests: Optional[List[Dict[str, Any]]] = None

class PestDetectionResponse(BaseModel):
    success: bool = True
    detection: PestDetection
    metadata: Dict[str, Any]

class CurrentWeather(BaseModel):
    temperature: float
    humidity: float
    wind_speed: float
    condition: str
    icon: str
    feels_like: Optional[float] = None
    uv_index: Optional[float] = None
    visibility: Optional[float] = None

class WeatherAlert(BaseModel):
    id: str
    type: str
    title: str
    description: str
    time: str
    severity: Optional[str] = None

class WeatherForecast(BaseModel):
    day: str
    high: float
    low: float
    condition: str
    precipitation: float
    wind_speed: Optional[float] = None

class Location(BaseModel):
    city: str
    state: str
    coordinates: Dict[str, float]

class WeatherResponse(BaseModel):
    success: bool = True
    current: CurrentWeather
    alerts: List[WeatherAlert]
    forecast: List[WeatherForecast]
    location: Location
    last_updated: str

class CropSuggestion(BaseModel):
    id: str
    name: str
    variety: str
    suitability: float
    planting_season: str
    expected_yield: str
    market_price: float
    growth_period: str
    water_requirement: str
    soil_compatibility: List[str]
    benefits: List[str]
    challenges: Optional[List[str]] = None
    investment: Optional[str] = None
    profit_potential: Optional[str] = None

class CropSuggestionsResponse(BaseModel):
    success: bool = True
    suggestions: List[CropSuggestion]
    metadata: Dict[str, Any]

class FertilizerRecommendation(BaseModel):
    id: str
    name: str
    type: str
    application_time: str
    quantity: str
    frequency: str
    benefits: List[str]
    price: float
    availability: str
    soil_compatibility: List[str]
    composition: Optional[str] = None
    application_method: Optional[str] = None
    precautions: Optional[List[str]] = None

class FertilizerRecommendationsResponse(BaseModel):
    success: bool = True
    recommendations: List[FertilizerRecommendation]
    metadata: Dict[str, Any]

class PriceTrendPoint(BaseModel):
    date: str
    price: float

class MarketDetails(BaseModel):
    volume: str
    quality: str
    demand: str

class MarketPrice(BaseModel):
    id: str
    crop: str
    current_price: float
    previous_price: float
    change: float
    change_percent: float
    unit: str
    market: str
    last_updated: str
    trend: List[PriceTrendPoint]
    market_details: MarketDetails

class MarketPricesResponse(BaseModel):
    success: bool = True
    prices: List[MarketPrice]
    metadata: Dict[str, Any]

class ErrorResponse(BaseModel):
    success: bool = False
    error: str
    message: str
    details: Optional[Dict[str, Any]] = None

# Mock data generators
def generate_yield_predictions(crop: str, farm_size: float, soil_type: str) -> List[YieldDataPoint]:
    """Generate mock yield prediction data"""
    base_yield = {
        'tomato': 150,
        'onion': 200,
        'potato': 250,
        'capsicum': 120,
        'brinjal': 180
    }.get(crop.lower(), 150)
    
    months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
    predictions = []
    
    for i, month in enumerate(months):
        predicted = base_yield + (i * 10) + random.uniform(-5, 5)
        actual = predicted + random.uniform(-10, 10) if i > 0 else None
        confidence = random.uniform(85, 95)
        
        predictions.append(YieldDataPoint(
            month=month,
            predicted=round(predicted, 1),
            actual=round(actual, 1) if actual else None,
            confidence=round(confidence, 1)
        ))
    
    return predictions

def generate_pest_detection() -> PestDetection:
    """Generate mock pest detection result"""
    pests = [
        {
            'pest': 'Aphids',
            'confidence': 87,
            'severity': 'medium',
            'recommendations': [
                'Apply neem oil spray every 7-10 days',
                'Introduce ladybugs as natural predators',
                'Remove affected leaves and dispose properly',
                'Improve air circulation around plants'
            ]
        },
        {
            'pest': 'Whiteflies',
            'confidence': 92,
            'severity': 'high',
            'recommendations': [
                'Use yellow sticky traps',
                'Apply insecticidal soap',
                'Remove heavily infested plants',
                'Use reflective mulch'
            ]
        },
        {
            'pest': 'Fungal Leaf Spot',
            'confidence': 78,
            'severity': 'low',
            'recommendations': [
                'Remove affected leaves',
                'Improve air circulation',
                'Avoid overhead watering',
                'Apply copper fungicide'
            ]
        }
    ]
    
    pest = random.choice(pests)
    return PestDetection(**pest)

def generate_weather_data() -> WeatherResponse:
    """Generate mock weather data"""
    current = CurrentWeather(
        temperature=random.uniform(20, 35),
        humidity=random.uniform(40, 80),
        wind_speed=random.uniform(5, 20),
        condition=random.choice(['Sunny', 'Partly Cloudy', 'Cloudy', 'Rainy']),
        icon='cloud',
        feels_like=random.uniform(22, 37),
        uv_index=random.uniform(3, 8),
        visibility=random.uniform(8, 15)
    )
    
    alerts = [
        WeatherAlert(
            id='1',
            type='warning',
            title='Heavy Rain Expected',
            description='Heavy rainfall expected in the next 24 hours. Consider delaying irrigation.',
            time='2 hours ago',
            severity='moderate'
        )
    ]
    
    forecast = []
    days = ['Today', 'Tomorrow', 'Wed', 'Thu', 'Fri']
    for day in days:
        forecast.append(WeatherForecast(
            day=day,
            high=random.uniform(25, 35),
            low=random.uniform(15, 25),
            condition=random.choice(['Sunny', 'Partly Cloudy', 'Cloudy', 'Rainy']),
            precipitation=random.uniform(0, 80),
            wind_speed=random.uniform(5, 15)
        ))
    
    location = Location(
        city='Mumbai',
        state='Maharashtra',
        coordinates={'lat': 19.0760, 'lon': 72.8777}
    )
    
    return WeatherResponse(
        current=current,
        alerts=alerts,
        forecast=forecast,
        location=location,
        last_updated=datetime.now().isoformat()
    )

def generate_crop_suggestions() -> List[CropSuggestion]:
    """Generate mock crop suggestions"""
    suggestions = [
        CropSuggestion(
            id='1',
            name='Tomato',
            variety='Hybrid F1',
            suitability=92,
            planting_season='Oct - Dec',
            expected_yield='25-30 tons/acre',
            market_price=45,
            growth_period='90-120 days',
            water_requirement='medium',
            soil_compatibility=['Alluvial', 'Black Soil'],
            benefits=['High market demand', 'Good profit margin', 'Multiple harvests'],
            challenges=['Pest susceptibility', 'Water management'],
            investment='₹50,000-70,000/acre',
            profit_potential='High'
        ),
        CropSuggestion(
            id='2',
            name='Okra',
            variety='Pusa Sawani',
            suitability=88,
            planting_season='Mar - May',
            expected_yield='8-12 tons/acre',
            market_price=35,
            growth_period='60-80 days',
            water_requirement='low',
            soil_compatibility=['Alluvial', 'Red Soil'],
            benefits=['Drought resistant', 'Quick harvest', 'Export potential'],
            challenges=['Harvest timing', 'Market price fluctuation'],
            investment='₹25,000-35,000/acre',
            profit_potential='Medium'
        )
    ]
    return suggestions

def generate_fertilizer_recommendations() -> List[FertilizerRecommendation]:
    """Generate mock fertilizer recommendations"""
    recommendations = [
        FertilizerRecommendation(
            id='1',
            name='NPK 19:19:19',
            type='inorganic',
            application_time='Before planting & during growth',
            quantity='50-75 kg/acre',
            frequency='Every 3-4 weeks',
            benefits=['Balanced nutrition', 'Quick absorption', 'High yield'],
            price=25,
            availability='high',
            soil_compatibility=['Alluvial', 'Black Soil', 'Red Soil'],
            composition='N: 19%, P: 19%, K: 19%',
            application_method='Broadcast or side dressing',
            precautions=['Avoid over-application', 'Store in dry place']
        ),
        FertilizerRecommendation(
            id='2',
            name='Vermicompost',
            type='organic',
            application_time='During soil preparation',
            quantity='2-3 tons/acre',
            frequency='Once per season',
            benefits=['Improves soil structure', 'Long-term fertility', 'Eco-friendly'],
            price=8,
            availability='high',
            soil_compatibility=['All soil types'],
            composition='Organic matter: 60-70%, NPK: 1-2%',
            application_method='Mix with topsoil',
            precautions=['Ensure proper decomposition', 'Avoid fresh manure']
        )
    ]
    return recommendations

def generate_market_prices() -> List[MarketPrice]:
    """Generate mock market prices"""
    crops = [
        {
            'crop': 'Tomato',
            'current_price': 45,
            'previous_price': 42,
            'market': 'Mumbai APMC'
        },
        {
            'crop': 'Onion',
            'current_price': 28,
            'previous_price': 32,
            'market': 'Delhi APMC'
        },
        {
            'crop': 'Potato',
            'current_price': 22,
            'previous_price': 20,
            'market': 'Kolkata APMC'
        }
    ]
    
    prices = []
    for i, crop_data in enumerate(crops):
        change = crop_data['current_price'] - crop_data['previous_price']
        change_percent = (change / crop_data['previous_price']) * 100
        
        # Generate trend data
        trend = []
        months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
        base_price = crop_data['current_price']
        for month in months:
            price = base_price + random.uniform(-5, 5)
            trend.append(PriceTrendPoint(date=month, price=round(price, 1)))
        
        prices.append(MarketPrice(
            id=str(i + 1),
            crop=crop_data['crop'],
            current_price=crop_data['current_price'],
            previous_price=crop_data['previous_price'],
            change=round(change, 1),
            change_percent=round(change_percent, 1),
            unit='kg',
            market=crop_data['market'],
            last_updated=f'{random.randint(1, 4)} hours ago',
            trend=trend,
            market_details=MarketDetails(
                volume=f'{random.randint(100, 300)} tons',
                quality='Grade A',
                demand=random.choice(['low', 'medium', 'high'])
            )
        ))
    
    return prices

# API Endpoints
@app.get("/")
async def root():
    """Root endpoint"""
    return {"message": "AgriSight API is running!", "version": "1.0.0"}

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

@app.get("/api/v1/yield-prediction", response_model=YieldPredictionResponse)
async def get_yield_prediction(
    crop: str,
    farm_size: float,
    soil_type: str,
    lat: float,
    lon: float
):
    """Get crop yield predictions"""
    try:
        predictions = generate_yield_predictions(crop, farm_size, soil_type)
        metadata = {
            "crop": crop,
            "variety": "Hybrid F1",
            "farm_size": farm_size,
            "soil_type": soil_type,
            "last_updated": datetime.now().isoformat()
        }
        
        return YieldPredictionResponse(
            predictions=predictions,
            metadata=metadata
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/v1/pest-detection", response_model=PestDetectionResponse)
async def detect_pest(
    image: UploadFile = File(...),
    crop_type: Optional[str] = Form(None)
):
    """Detect pests and diseases from plant images"""
    try:
        # In a real implementation, you would process the image here
        # For now, we'll return mock detection results
        
        if not image.content_type.startswith('image/'):
            raise HTTPException(status_code=400, detail="File must be an image")
        
        detection = generate_pest_detection()
        metadata = {
            "image_processed": True,
            "processing_time": f"{random.uniform(1.5, 3.0):.1f}s",
            "model_version": "v2.1",
            "timestamp": datetime.now().isoformat()
        }
        
        return PestDetectionResponse(
            detection=detection,
            metadata=metadata
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/v1/weather", response_model=WeatherResponse)
async def get_weather(lat: float, lon: float, days: int = 5):
    """Get weather data and alerts"""
    try:
        weather_data = generate_weather_data()
        return weather_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/v1/crop-suggestions", response_model=CropSuggestionsResponse)
async def get_crop_suggestions(
    state: str,
    district: str,
    soil_type: str,
    farm_size: float,
    lat: float,
    lon: float,
    irrigation: Optional[str] = None,
    season: Optional[str] = None
):
    """Get crop recommendations"""
    try:
        suggestions = generate_crop_suggestions()
        metadata = {
            "location": f"{district}, {state}",
            "soil_type": soil_type,
            "season": season or "Kharif",
            "last_updated": datetime.now().isoformat()
        }
        
        return CropSuggestionsResponse(
            suggestions=suggestions,
            metadata=metadata
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/v1/fertilizer-recommendations", response_model=FertilizerRecommendationsResponse)
async def get_fertilizer_recommendations(
    crop: str,
    soil_type: str,
    farm_size: float,
    growth_stage: Optional[str] = None
):
    """Get fertilizer recommendations"""
    try:
        recommendations = generate_fertilizer_recommendations()
        metadata = {
            "crop": crop,
            "soil_type": soil_type,
            "season": "Kharif",
            "last_updated": datetime.now().isoformat()
        }
        
        return FertilizerRecommendationsResponse(
            recommendations=recommendations,
            metadata=metadata
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/v1/market-prices", response_model=MarketPricesResponse)
async def get_market_prices(
    crop: Optional[str] = None,
    market: Optional[str] = None,
    days: int = 7
):
    """Get market prices"""
    try:
        prices = generate_market_prices()
        
        # Filter by crop if specified
        if crop:
            prices = [p for p in prices if p.crop.lower() == crop.lower()]
        
        # Filter by market if specified
        if market:
            prices = [p for p in prices if market.lower() in p.market.lower()]
        
        metadata = {
            "last_updated": datetime.now().isoformat(),
            "total_markets": len(prices),
            "price_source": "APMC Official Data"
        }
        
        return MarketPricesResponse(
            prices=prices,
            metadata=metadata
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Error handlers
@app.exception_handler(404)
async def not_found_handler(request, exc):
    return JSONResponse(
        status_code=404,
        content=ErrorResponse(
            error="Not Found",
            message="The requested resource was not found"
        ).dict()
    )

@app.exception_handler(500)
async def internal_error_handler(request, exc):
    return JSONResponse(
        status_code=500,
        content=ErrorResponse(
            error="Internal Server Error",
            message="An unexpected error occurred"
        ).dict()
    )

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True if os.getenv("ENVIRONMENT") == "development" else False
    )
