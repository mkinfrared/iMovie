import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param
} from "@nestjs/common";

import { ZipcodeService } from "./zipcode.service";

@Controller("zipcode")
export class ZipcodeController {
  constructor(private readonly zipcodeService: ZipcodeService) {}

  @Get()
  getAll() {
    return this.zipcodeService.getAll();
  }

  @Get(":id")
  getOne(@Param("id") id: number) {
    return this.zipcodeService.getOne(id);
  }

  @Get(":countryId/:code")
  async getByCodeAndCountry(
    @Param("countryId") countryId: string,
    @Param("code") code: string
  ) {
    const zipcode = await this.zipcodeService.getByCodeAndCountry(
      code,
      countryId
    );

    if (!zipcode) {
      throw new HttpException(
        "Bad request or entity was not found",
        HttpStatus.BAD_REQUEST
      );
    }

    return zipcode;
  }
}
