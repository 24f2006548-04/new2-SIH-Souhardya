# AgriSight UI - Smart Agriculture Platform

A modern Next.js + TypeScript frontend for smart agriculture management with AI-powered insights, real-time weather monitoring, and comprehensive farming tools.

## Features

- 🌾 **Animated Landing Page** - Beautiful Lottie animations with Framer Motion
- 👨‍🌾 **Farmer Profile Management** - Comprehensive farm and personal information
- 📊 **Smart Dashboard** - AI-powered insights and recommendations
- 🔍 **Pest & Disease Detection** - Photo upload with instant analysis
- 🌤️ **Weather Alerts** - Real-time weather monitoring and forecasts
- 🌱 **Crop Suggestions** - Personalized crop recommendations
- 🧪 **Fertilizer Recommendations** - Smart fertilizer guidance
- 📈 **Market Prices** - Live market price tracking
- 🌐 **i18n Support** - Hindi and English language support
- ♿ **Accessibility** - WCAG compliant with screen reader support

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Animations**: Framer Motion, Lottie React
- **Charts**: Recharts
- **Internationalization**: react-i18next
- **Forms**: React Hook Form
- **File Upload**: React Dropzone
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd agrisight-ui
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   # API Configuration
   NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
   NEXT_PUBLIC_MOCK_API=true
   
   # Optional: External Services
   NEXT_PUBLIC_WEATHER_API_KEY=your_weather_api_key
   NEXT_PUBLIC_MAP_API_KEY=your_map_api_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
agrisight-ui/
├── app/                          # Next.js 13+ app directory
│   ├── api/mock/                 # Mock API endpoints
│   ├── dashboard/                # Dashboard page
│   ├── profile/                  # Profile page
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Landing page
│   └── providers.tsx             # App providers
├── components/                   # Reusable components
│   ├── dashboard/                # Dashboard-specific components
│   ├── Navigation.tsx            # Main navigation
│   └── LottieAnimation.tsx       # Animation component
├── lib/                          # Utility libraries
│   └── i18n.ts                   # Internationalization setup
├── public/                       # Static assets
│   └── locales/                  # Translation files
│       ├── en/                   # English translations
│       └── hi/                   # Hindi translations
└── backend/                      # FastAPI backend (separate)
```

## API Integration

### Current Setup (Mock APIs)

The application currently uses mock API endpoints located in `app/api/mock/`:

- `/api/mock/yield-prediction` - Crop yield predictions
- `/api/mock/pest-detection` - Pest and disease detection
- `/api/mock/weather` - Weather data and alerts
- `/api/mock/crop-suggestions` - Crop recommendations
- `/api/mock/fertilizer-recommendations` - Fertilizer suggestions
- `/api/mock/market-prices` - Market price data

### Switching to Real Backend

To connect to a real backend:

1. **Update Environment Variables**
   ```env
   NEXT_PUBLIC_API_BASE_URL=https://your-backend-api.com
   NEXT_PUBLIC_MOCK_API=false
   ```

2. **Update API Calls**
   Replace mock API calls in components with real endpoints:
   ```typescript
   // Before (mock)
   const response = await fetch('/api/mock/yield-prediction')
   
   // After (real backend)
   const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/yield-prediction`)
   ```

3. **Handle Authentication**
   Add authentication headers to API calls:
   ```typescript
   const response = await fetch(url, {
     headers: {
       'Authorization': `Bearer ${token}`,
       'Content-Type': 'application/json'
     }
   })
   ```

## Internationalization

The app supports Hindi and English languages:

- **Language Files**: `public/locales/{lang}/common.json`
- **Adding New Languages**: 
  1. Create new locale directory in `public/locales/`
  2. Add language to `next-i18next.config.js`
  3. Update `lib/i18n.ts` with new resources

## Accessibility Features

- **Keyboard Navigation**: Full keyboard support
- **Screen Reader**: ARIA labels and semantic HTML
- **High Contrast**: Support for high contrast mode
- **Reduced Motion**: Respects user motion preferences
- **Focus Management**: Clear focus indicators

## Deployment

### Vercel (Recommended)

1. **Connect to Vercel**
   ```bash
   npm i -g vercel
   vercel
   ```

2. **Set Environment Variables**
   Add your environment variables in Vercel dashboard

### Docker

1. **Build Docker Image**
   ```bash
   docker build -t agrisight-ui .
   ```

2. **Run Container**
   ```bash
   docker run -p 3000:3000 agrisight-ui
   ```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Style

- **TypeScript**: Strict mode enabled
- **ESLint**: Next.js recommended rules
- **Prettier**: Code formatting (optional)

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

---

**Note**: This is a frontend application. For the complete system, you'll need to integrate with the provided FastAPI backend or implement your own backend services.
