import { Body, Controller, Post } from "@nestjs/common";

import { ShowtimeDto } from "modules/showtime/dto/showtime.dto";
import { ShowtimeService } from "modules/showtime/showtime.service";

@Controller("showtime")
export class ShowtimeController {
  constructor(private readonly showtimeService: ShowtimeService) {}

  @Post()
  create(@Body() showtimeDto: ShowtimeDto) {
    return this.showtimeService.create(showtimeDto);
  }
}
