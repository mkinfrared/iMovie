import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import dayjs from "dayjs";
import { Repository } from "typeorm";

import { AuditoriumService } from "modules/auditorium/auditorium.service";
import { MovieService } from "modules/movie/movie.service";
import { ShowtimeDto } from "modules/showtime/dto/showtime.dto";
import { Showtime } from "modules/showtime/showtime.entity";

@Injectable()
export class ShowtimeService {
  constructor(
    @InjectRepository(Showtime)
    private readonly showtimeRepository: Repository<Showtime>,
    private readonly movieService: MovieService,
    private readonly auditoriumService: AuditoriumService
  ) {}

  async create(screeningDto: ShowtimeDto) {
    const { startDate, auditoriumId, movieId } = screeningDto;
    const movie = await this.movieService.getOne(movieId);
    const auditorium = await this.auditoriumService.getOne(auditoriumId);
    const date = dayjs(startDate).toDate();

    if (!movie) {
      throw new Error("Movie was not found");
    }

    if (!auditorium) {
      throw new Error("Auditorium was not found");
    }

    const screening = this.showtimeRepository.create({
      movie,
      auditorium,
      startDate: date
    });

    return this.showtimeRepository.save(screening);
  }
}
