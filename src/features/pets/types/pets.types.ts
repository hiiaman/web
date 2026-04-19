export type PetSpecies = "dog" | "cat" | "other";
export type PetGender  = "male" | "female";
export type LocationMode = "radius" | "city" | "province";
export type RadiusKm  = 30 | 50 | 100;

export interface PetResponse {
  id: string;
  owner_id: string;
  name: string;
  species: PetSpecies;
  breed: string | null;
  age: number;           // months
  gender: PetGender;
  weight: number | null; // kg
  neutered: boolean;
  personality_tags: string[];
  bio: string | null;
  photos: string[];
  latitude: number;
  longitude: number;
  city: string | null;
  province: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface PetCandidateResponse extends PetResponse {
  distance_km: number;
}

export interface PetCreate {
  name: string;
  species: PetSpecies;
  breed?: string;
  age: number;
  gender: PetGender;
  weight?: number;
  neutered?: boolean;
  personality_tags?: string[];
  bio?: string;
  photos?: string[];
  latitude: number;
  longitude: number;
  city?: string;
  province?: string;
}

export interface PetUpdate extends Partial<Omit<PetCreate, "species" | "gender">> {
  is_active?: boolean;
}

export interface CandidateParams {
  location_mode?: LocationMode;
  radius_km?: RadiusKm;
  opposite_gender?: boolean;
  limit?: number;
  offset?: number;
  latitude?: number;
  longitude?: number;
}

export interface SwipeRequest {
  swiped_pet_id: string;
  action: "like" | "pass";
}

export interface SwipeResponse {
  id: string;
  swiper_pet_id: string;
  swiped_pet_id: string;
  action: "like" | "pass";
  matched: boolean;
  match_id: string | null;
  created_at: string;
}
