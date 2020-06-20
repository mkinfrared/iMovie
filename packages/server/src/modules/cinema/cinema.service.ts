import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CinemaDto } from "modules/cinema/dto/cinema.dto";
import Pagination from "utils/pagination";

import { Cinema } from "./cinema.entity";

@Injectable()
export class CinemaService {
  constructor(
    @InjectRepository(Cinema)
    private readonly cinemaRepository: Repository<Cinema>
  ) {}

  create(cinemaDto: CinemaDto) {
    const cinema = this.cinemaRepository.create(cinemaDto);

    return this.cinemaRepository.save(cinema);
  }

  async get(id: number) {
    const cinema = await this.cinemaRepository.findOne(id, {
      relations: ["auditoriums"]
    });

    cinema?.auditoriums.forEach(({ seats }, index) => {
      cinema.auditoriums[index].seats = seats.filter(
        ({ deletedAt }) => !deletedAt
      );
    });

    return cinema;
  }

  async getAll(offset = 1, limit = 20) {
    const [cinemas, total] = await this.cinemaRepository.findAndCount({
      take: limit,
      skip: limit * (offset - 1),
      join: {
        alias: "cinema",
        leftJoinAndSelect: {
          zipcode: "cinema.zipcode",
          city: "zipcode.city",
          state: "zipcode.state",
          country: "zipcode.country"
        }
      }
    });

    return new Pagination(cinemas, total, offset);
  }

  async update(id: number, cinemaDto: CinemaDto) {
    const result = await this.cinemaRepository.update(id, cinemaDto);

    if (!result.affected) {
      return;
    }

    return this.get(id);
  }

  async delete(id: number) {
    const result = await this.cinemaRepository.delete(id);

    if (!result.affected) {
      return;
    }

    return result;
  }
}
