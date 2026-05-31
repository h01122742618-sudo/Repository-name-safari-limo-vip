export type CarType = 'Toyota Hiace' | 'GMC Yukon' | 'Cadillac Escalade'

export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled'

export interface Booking {
  id: string
  customer_name: string
  phone: string
  pickup_location: string
  destination: string
  car_type: CarType
  travel_date: string
  travel_time: string
  status: BookingStatus
  notes?: string
  created_at: string
  updated_at: string
}

export interface BookingFormData {
  customer_name: string
  phone: string
  pickup_location: string
  destination: string
  car_type: CarType
  travel_date: string
  travel_time: string
}
