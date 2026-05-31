-- Safari Limo VIP Database Schema
-- Run this SQL in your Supabase SQL Editor to create the bookings table

-- Create bookings table
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  pickup_location TEXT NOT NULL,
  destination TEXT NOT NULL,
  car_type TEXT NOT NULL CHECK (car_type IN ('Toyota Hiace', 'GMC Yukon', 'Cadillac Escalade')),
  travel_date DATE NOT NULL,
  travel_time TIME NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public inserts (for booking form)
CREATE POLICY "Allow public inserts" ON public.bookings
  FOR INSERT WITH CHECK (true);

-- Create policy to allow public reads (for admin)
CREATE POLICY "Allow public reads" ON public.bookings
  FOR SELECT USING (true);

-- Create policy to allow updates (for admin status changes)
CREATE POLICY "Allow public updates" ON public.bookings
  FOR UPDATE USING (true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS update_bookings_updated_at ON public.bookings;
CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON public.bookings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
