export interface WalkingSpot {
  id: number;
  name: string;
  address: string;
  description: string;
  rating: number;
  tags: string[];
  image_url: string;
}

export interface SpotsResponse {
  city: string;
  spots: WalkingSpot[];
}

export interface CitiesResponse {
  cities: string[];
}
