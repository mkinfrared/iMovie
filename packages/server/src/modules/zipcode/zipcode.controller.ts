import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Query
} from "@nestjs/common";

import { ZipcodeService } from "./zipcode.service";

@Controller("zipcode")
export class ZipcodeController {
  constructor(private readonly zipcodeService: ZipcodeService) {}

  @Get()
  getAll(@Query("page") page: string, @Query("limit") limit: string) {
    return this.zipcodeService.getAll(+page, +limit);
  }

  @Get(":id")
  getOne(@Param("id") id: number) {
    return this.zipcodeService.getOne(id);
  }

  @Get(":countryId/:code")
  getByCodeAndCountry(
    @Param("countryId") countryId: string,
    @Param("code") code: string
  ) {
    try {
      return this.zipcodeService.getByCodeAndCountry(code, countryId);
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }
}
