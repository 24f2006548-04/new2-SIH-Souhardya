export const featureToTitle = (feature: string): string => {
  const titles: Record<string, string> = {
    'pest-detection': 'Pest Detection',
    'yield-prediction': 'Yield Prediction',
    'weather-alerts': 'Weather Alerts',
    'crop-suggestions': 'Crop Suggestions',
    'fertilizer-recommendations': 'Fertilizer Recommendations',
    'market-prices': 'Market Prices'
  }
  return titles[feature] || feature
}

export const featureToHtml = (feature: string): string => {
  const content: Record<string, string> = {
    'pest-detection': `
      <div class="feature-content">
        <div class="feature-overview">
          <h3>AI-Powered Pest & Disease Detection</h3>
          <p>Upload photos of your crops to get instant identification of pests and diseases with actionable recommendations.</p>
        </div>
        
        <div class="feature-details">
          <h4>How it works:</h4>
          <ol>
            <li>Take a clear photo of the affected plant area</li>
            <li>Upload the image to our AI system</li>
            <li>Get instant identification and severity assessment</li>
            <li>Receive treatment recommendations and prevention tips</li>
          </ol>
        </div>
        
        <div class="feature-benefits">
          <h4>Benefits:</h4>
          <ul>
            <li>Early detection prevents crop loss</li>
            <li>Reduces pesticide overuse</li>
            <li>Improves yield quality and quantity</li>
            <li>Cost-effective disease management</li>
          </ul>
        </div>
        
        <div class="feature-demo">
          <h4>Try the Demo:</h4>
          <p>Upload a sample image to see how our AI identifies common agricultural pests and diseases.</p>
          <button class="btn-primary pulse">Upload Sample Image</button>
        </div>
      </div>
    `,
    'yield-prediction': `
      <div class="feature-content">
        <div class="feature-overview">
          <h3>Smart Yield Prediction</h3>
          <p>Get accurate yield predictions based on weather data, soil conditions, and historical patterns.</p>
        </div>
        
        <div class="feature-details">
          <h4>Prediction Factors:</h4>
          <ul>
            <li>Historical yield data</li>
            <li>Weather patterns and forecasts</li>
            <li>Soil health indicators</li>
            <li>Crop growth stage analysis</li>
            <li>Pest and disease impact</li>
          </ul>
        </div>
        
        <div class="feature-benefits">
          <h4>Benefits:</h4>
          <ul>
            <li>Better harvest planning</li>
            <li>Optimized resource allocation</li>
            <li>Market timing decisions</li>
            <li>Risk assessment and mitigation</li>
          </ul>
        </div>
      </div>
    `,
    'weather-alerts': `
      <div class="feature-content">
        <div class="feature-overview">
          <h3>Weather Alerts & Monitoring</h3>
          <p>Stay informed with real-time weather alerts and forecasts tailored to your farm location.</p>
        </div>
        
        <div class="feature-details">
          <h4>Alert Types:</h4>
          <ul>
            <li>Heavy rainfall warnings</li>
            <li>Drought conditions</li>
            <li>Temperature extremes</li>
            <li>Wind and storm alerts</li>
            <li>Frost warnings</li>
          </ul>
        </div>
        
        <div class="feature-benefits">
          <h4>Benefits:</h4>
          <ul>
            <li>Protect crops from weather damage</li>
            <li>Plan irrigation schedules</li>
            <li>Optimize planting and harvesting times</li>
            <li>Reduce weather-related losses</li>
          </ul>
        </div>
      </div>
    `,
    'crop-suggestions': `
      <div class="feature-content">
        <div class="feature-overview">
          <h3>Smart Crop Suggestions</h3>
          <p>Get personalized crop recommendations based on your soil, climate, and market conditions.</p>
        </div>
        
        <div class="feature-details">
          <h4>Recommendation Factors:</h4>
          <ul>
            <li>Soil type and pH levels</li>
            <li>Climate and weather patterns</li>
            <li>Market demand and prices</li>
            <li>Water availability</li>
            <li>Previous crop history</li>
          </ul>
        </div>
        
        <div class="feature-benefits">
          <h4>Benefits:</h4>
          <ul>
            <li>Maximize profitability</li>
            <li>Optimize land use</li>
            <li>Reduce crop failure risk</li>
            <li>Improve soil health</li>
          </ul>
        </div>
      </div>
    `,
    'fertilizer-recommendations': `
      <div class="feature-content">
        <div class="feature-overview">
          <h3>Fertilizer Recommendations</h3>
          <p>Get precise fertilizer recommendations based on soil analysis and crop requirements.</p>
        </div>
        
        <div class="feature-details">
          <h4>Recommendation Factors:</h4>
          <ul>
            <li>Soil nutrient analysis</li>
            <li>Crop nutrient requirements</li>
            <li>Growth stage timing</li>
            <li>Environmental conditions</li>
            <li>Cost optimization</li>
          </ul>
        </div>
        
        <div class="feature-benefits">
          <h4>Benefits:</h4>
          <ul>
            <li>Optimize nutrient application</li>
            <li>Reduce fertilizer costs</li>
            <li>Improve crop yield and quality</li>
            <li>Minimize environmental impact</li>
          </ul>
        </div>
      </div>
    `,
    'market-prices': `
      <div class="feature-content">
        <div class="feature-overview">
          <h3>Market Price Tracking</h3>
          <p>Stay updated with real-time market prices and trends for your crops.</p>
        </div>
        
        <div class="feature-details">
          <h4>Price Information:</h4>
          <ul>
            <li>Current market prices</li>
            <li>Price trends and forecasts</li>
            <li>Regional price variations</li>
            <li>Seasonal price patterns</li>
            <li>Export and import data</li>
          </ul>
        </div>
        
        <div class="feature-benefits">
          <h4>Benefits:</h4>
          <ul>
            <li>Better selling decisions</li>
            <li>Market timing optimization</li>
            <li>Price negotiation support</li>
            <li>Revenue maximization</li>
          </ul>
        </div>
      </div>
    `
  }
  return content[feature] || '<p>Feature information coming soon...</p>'
}
