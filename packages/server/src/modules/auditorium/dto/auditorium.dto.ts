class AuditoriumDto {
  name: string;

  cinemaId: number;
}

class UpdateAuditoriumDto {
  id: number;

  name: string;
}

export { AuditoriumDto, UpdateAuditoriumDto };
