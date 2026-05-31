import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = await createClient()
    
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching bookings:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (err) {
    console.error('Unexpected error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const body = await request.json()

    const { customer_name, phone, pickup_location, destination, car_type, travel_date, travel_time, notes } = body

    // Validate required fields
    if (!customer_name || !phone || !pickup_location || !destination || !car_type || !travel_date || !travel_time) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Validate car type
    const validCarTypes = ['Toyota Hiace', 'GMC Yukon', 'Cadillac Escalade']
    if (!validCarTypes.includes(car_type)) {
      return NextResponse.json({ error: 'Invalid car type' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('bookings')
      .insert({
        customer_name,
        phone,
        pickup_location,
        destination,
        car_type,
        travel_date,
        travel_time,
        notes: notes || null,
        status: 'pending'
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating booking:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data, { status: 201 })
  } catch (err) {
    console.error('Unexpected error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
