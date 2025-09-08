// 会場関連の型定義

export interface Station {
  id: number;
  station_name: string;
  line_name: string;
  exit_name?: string | null;
  transportation_method?: string | null;
  walking_time?: number | null;
  taxi_time?: number | null;
  bus_time?: number | null;
  distance_km?: number | null;
  notes?: string | null;
}

export interface Room {
  id: number;
  room_name: string;
  room_type: string;
  floor?: string | null;
  ceiling_height?: number | null;
  floor_area?: number | null;
  capacity_theater?: number | null;
  capacity_school?: number | null;
  capacity_banquet?: number | null;
  width?: number | null;
  depth?: number | null;
  is_dividable: boolean;
  has_stage: boolean;
  notes?: string | null;
}

export interface Equipment {
  projector: boolean;
  screen: boolean;
  microphone: boolean;
  wireless_microphone: boolean;
  whiteboard: boolean;
  podium: boolean;
  pointer: boolean;
  sound_system: boolean;
  lighting_control: boolean;
  air_conditioning: boolean;
  wifi: boolean;
  lan_cable: boolean;
  power_outlets: boolean;
  extension_cords: boolean;
  hdmi_cable: boolean;
  video_conference: boolean;
}

export interface Facilities {
  parking_capacity?: number | null;
  parking_fee?: string | null;
  parking_notes?: string | null;
  can_eat_drink: boolean;
  can_wear_shoes: boolean;
  is_barrier_free: boolean;
  has_elevator: boolean;
  has_escalator: boolean;
  is_earthquake_resistant: boolean;
  earthquake_resistance_year?: number | null;
  has_emergency_exit: boolean;
  has_aed: boolean;
  has_nursing_room: boolean;
  has_prayer_room: boolean;
  has_smoking_area: boolean;
  has_vending_machine: boolean;
  has_convenience_store: boolean;
  has_restaurant: boolean;
  has_cafe: boolean;
  has_catering_service: boolean;
}

export interface Venue {
  id: number;
  venue_no: string;
  venue_name: string;
  official_name: string;
  prefecture: string;
  city: string;
  address: string;
  postal_code: string;
  phone_number?: string | null;
  email?: string | null;
  official_url?: string | null;
  reservation_url?: string | null;
  google_map_url?: string | null;
  contact_person?: string | null;
  contact_department?: string | null;
  rooms: Room[];
  stations: Station[];
  equipment: Equipment;
  equipment_fees?: any;
  facilities: Facilities;
  operating_hours?: any;
  fees?: any;
  reservation_conditions?: any;
  cancellation_policy?: any;
  package_handling?: any;
  nearby_facilities?: any;
  tags: string[];
  status: string;
  last_verified_date: string;
  created_by: string;
  updated_by: string;
  created_at: string;
  updated_at: string;
}

export interface VenuesData {
  venues: Venue[];
  metadata: {
    total_count: number;
    data_source: string;
    export_date: string;
    version: string;
    schema_version: string;
    notes: string;
  };
}