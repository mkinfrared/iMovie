import { Controller, Get, Query } from "@nestjs/common";

import { CityService } from "modules/city/city.service";

@Controller("city")
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get()
  getCitiesByState(@Query("stateId") stateId: string) {
    const id = parseInt(stateId, 0);

    return this.cityService.getByState(id);
  }
}
