import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()
    
    // Validate required fields
    const requiredFields = ['state', 'district', 'farmSize', 'soilType', 'irrigation']
    const missingFields = requiredFields.filter(field => !formData[field])
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      )
    }

    // Generate a unique ID for the profile
    const profileId = `profile_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    // Create profile object with additional fields
    const profile = {
      id: profileId,
      name: formData.name || 'Farmer',
      avatar: formData.avatar || null,
      location: `${formData.district}, ${formData.state}`,
      state: formData.state,
      district: formData.district,
      farmSize: formData.farmSize,
      soilType: formData.soilType,
      irrigation: formData.irrigation,
      languages: formData.languages || [],
      crops: formData.crops || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    // In a real application, you would save this to a database
    // For now, we'll just return the profile
    console.log('Profile saved:', profile)

    return NextResponse.json(profile, { status: 200 })
  } catch (error) {
    console.error('Error saving profile:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
