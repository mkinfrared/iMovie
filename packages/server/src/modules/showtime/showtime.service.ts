import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import dayjs, { Dayjs } from "dayjs";
import { Repository } from "typeorm";

import { Movie } from "modules/movie/movie.entity";
import { MovieService } from "modules/movie/movie.service";
import { ShowtimeDto } from "modules/showtime/dto/showtime.dto";
import { Showtime } from "modules/showtime/showtime.entity";

@Injectable()
export class ShowtimeService {
  constructor(
    @InjectRepository(Showtime)
    private readonly showtimeRepository: Repository<Showtime>,
    private readonly movieService: MovieService
  ) {}

  async create(screeningDto: ShowtimeDto) {
    const { startDate, auditoriumId, movieId } = screeningDto;
    const date = dayjs(startDate);
    const movie = await this.movieService.getOne(movieId);

    if (!movie) {
      throw new Error("Movie was not found");
    }

    const isAvailable = await this.getTimeSlotAvailable(
      movie,
      auditoriumId,
      date
    );

    if (!isAvailable) {
      throw new Error("Slot is not available");
    }

    const screening = this.showtimeRepository.create({
      movieId,
      auditoriumId,
      startDate: date.toDate(),
      endDate: date.add(movie.runtime, "m")
    });

    return this.showtimeRepository.save(screening);
  }

  async getTimeSlotAvailable(movie: Movie, auditoriumId: number, date: Dayjs) {
    const gap = 20; // minutes
    const difference = movie.runtime + gap;
    const prevNearestDate = date.subtract(gap, "m");
    const nextNearestDate = date.add(difference, "m");

    const showtimes = await this.showtimeRepository
      .createQueryBuilder("showtime")
      .select()
      .where(
        '"auditoriumId" = :auditoriumId AND "endDate" BETWEEN :prevDate AND :nextDate',
        {
          prevDate: prevNearestDate.toISOString(),
          nextDate: nextNearestDate.toISOString(),
          auditoriumId
        }
      )
      .orWhere(
        '"auditoriumId" = :auditoriumId AND "startDate" BETWEEN :prevDate AND :nextDate',
        {
          prevDate: prevNearestDate.toISOString(),
          nextDate: nextNearestDate.toISOString(),
          auditoriumId
        }
      )
      .getMany();

    const isAvailable = !showtimes.length;

    return isAvailable;
  }
}
