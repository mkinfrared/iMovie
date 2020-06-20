import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Seat } from "modules/seat/seat.entity";

@Injectable()
export class SeatService {
  constructor(
    @InjectRepository(Seat) private readonly seatRepository: Repository<Seat>
  ) {}

  createMany(rows: Record<string, number>, auditoriumId: number) {
    const seats: Seat[] = [];

    Object.entries(rows).forEach(async (entry) => {
      const [row, seatQuantity] = entry;

      for (let i = 0; i < seatQuantity; i++) {
        const seat = this.seatRepository.create({
          row,
          number: i + 1,
          auditoriumId
        });

        seats.push(seat);
      }
    });

    return this.seatRepository.save(seats);
  }

  async updateMany(rows: Record<string, number>, auditoriumId: number) {
    await this.seatRepository.softDelete({ auditoriumId });

    return this.createMany(rows, auditoriumId);
  }
}
