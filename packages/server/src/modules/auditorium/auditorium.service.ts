import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { SeatService } from "modules/seat/seat.service";

import { Auditorium } from "./auditorium.entity";
import { AuditoriumDto, UpdateAuditoriumDto } from "./dto/auditorium.dto";

@Injectable()
export class AuditoriumService {
  constructor(
    @InjectRepository(Auditorium)
    private readonly auditoriumRepository: Repository<Auditorium>,
    private readonly seatService: SeatService
  ) {}

  async create(auditoriumDto: AuditoriumDto) {
    const { name, cinemaId, ...rows } = auditoriumDto;
    const auditorium = this.auditoriumRepository.create(auditoriumDto);
    const record = await this.auditoriumRepository.save(auditorium);

    this.seatService.createMany(rows as Record<string, number>, record.id);

    return record;
  }

  getOne(id: number) {
    return this.auditoriumRepository.findOne(id);
  }

  async update(auditoriumDto: UpdateAuditoriumDto) {
    const { id, name } = auditoriumDto;
    const result = await this.auditoriumRepository.update(id, { name });

    if (!result.affected) {
      return;
    }

    return this.getOne(id);
  }

  async delete(id: number) {
    const result = await this.auditoriumRepository.delete(id);

    if (!result.affected) {
      return;
    }

    return result;
  }
}
