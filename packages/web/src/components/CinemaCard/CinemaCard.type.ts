export interface CinemaCardProps {
  cinemaId: number;
  cinemaName: string;
  cityName: string;
  stateName: string;
  countryName: string;
  zipcode: string;
  onEdit: (id: number) => void;
}
