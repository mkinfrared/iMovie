import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Auditorium } from "./auditorium.entity";
import { AuditoriumDto, UpdateAuditoriumDto } from "./dto/auditorium.dto";

@Injectable()
export class AuditoriumService {
  constructor(
    @InjectRepository(Auditorium)
    private readonly auditoriumRepository: Repository<Auditorium>
  ) {}

  create(auditoriumDto: AuditoriumDto) {
    const auditorium = this.auditoriumRepository.create(auditoriumDto);

    return this.auditoriumRepository.save(auditorium);
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
