export interface Car {
  id: number;
  uid: string;
  name: string;
  brand: string;
  model: string;
  image?: string;
  available: boolean;
  baseLocation: LocationLatLng;
  currentLocation: LocationLatLng;
  returnLocation?: LocationLatLng | null;
  bookingName?: string | null;
  bookingStartDate?: Date | null;
  bookingEndDate?: Date | null;
}

export interface LocationLatLng {
  lat: number;
  lng: number;
}
