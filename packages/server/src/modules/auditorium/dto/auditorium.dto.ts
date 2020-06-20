type AuditoriumDto = Record<string, number | string> & {
  name: string;

  cinemaId: number;
};

type UpdateAuditoriumDto = Omit<AuditoriumDto, "cinemaId"> & {
  id: number;
};

export { AuditoriumDto, UpdateAuditoriumDto };
