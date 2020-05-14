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
    Object.entries(rows).forEach((entry) => {
      const [row, seatQuantity] = entry;
      const seats: Seat[] = [];

      for (let i = 0; i < seatQuantity; i++) {
        const seat = this.seatRepository.create({
          row,
          number: i + 1,
          auditoriumId
        });

        seats.push(seat);
      }

      this.seatRepository.save(seats);
    });
  }
}
