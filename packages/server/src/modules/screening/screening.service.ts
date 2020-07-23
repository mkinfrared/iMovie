import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import dayjs from "dayjs";
import { Repository } from "typeorm";

import { AuditoriumService } from "modules/auditorium/auditorium.service";
import { MovieService } from "modules/movie/movie.service";
import { ScreeningDto } from "modules/screening/dto/screening.dto";
import { Screening } from "modules/screening/screening.entity";

@Injectable()
export class ScreeningService {
  constructor(
    @InjectRepository(Screening)
    private readonly screeningRepository: Repository<Screening>,
    private readonly movieService: MovieService,
    private readonly auditoriumService: AuditoriumService
  ) {}

  async create(screeningDto: ScreeningDto) {
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

    const screening = this.screeningRepository.create({
      movie,
      auditorium,
      startDate: date
    });

    return this.screeningRepository.save(screening);
  }
}
