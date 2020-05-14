type AuditoriumDto = Record<string, string | number> & {
  name: string;

  cinemaId: number;
};

class UpdateAuditoriumDto {
  id: number;

  name: string;
}

export { AuditoriumDto, UpdateAuditoriumDto };
