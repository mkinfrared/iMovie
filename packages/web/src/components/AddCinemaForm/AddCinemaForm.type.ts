export interface AddCinemaFormProps {
  open: boolean;
  onClose: () => void;
}

export interface Country {
  alpha2Code: string;
  name: string;
  alpha3Code: string;
  callingCode: number;
  region: string;
  subregion: string;
  nativeName: string;
  flag: string;
  cioc: string;
  createdAt: string;
  updatedAt: string;
}

export interface State {
  id: number;
  name: string;
  abbreviation: string;
  countryId: string;
  country: Country;
  createdAt: string;
  updatedAt: string;
}

export interface City {
  id: number;
  name: string;
  zipcode: [Zipcode];
  stateId: number;
  state: State;
  countryId: string;
  country: Country;
  createdAt: string;
  updatedAt: string;
}

export interface Zipcode {
  id: number;
  code: string;
  longitude: string;
  latitude: string;
  cityId: number;
  countryId: string;
  stateId: number;
  city: City;
  country: Country;
  state: State;
  createdAt: string;
  updatedAt: string;
}
