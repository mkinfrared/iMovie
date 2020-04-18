import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Query,
  UseInterceptors
} from "@nestjs/common";

import { CountryService } from "./country.service";

@Controller("country")
@UseInterceptors(ClassSerializerInterceptor)
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get()
  getAll(@Query("page") offset: string, @Query("limit") limit: string) {
    return this.countryService.getAll(+offset, +limit);
  }

  @Get(":alpha2code")
  get(@Param(":alpha2Code") alpha2code: string) {
    return this.countryService.getOne(alpha2code);
  }
}
