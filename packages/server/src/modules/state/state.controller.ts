import { Controller, Get, Query } from "@nestjs/common";

import { StateService } from "modules/state/state.service";

@Controller("state")
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @Get()
  getStatesByCountry(@Query("countryId") countryId: string) {
    return this.stateService.getByCountry(countryId);
  }
}
