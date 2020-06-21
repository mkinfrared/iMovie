import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { LoggerModule } from "config/logger/logger.module";
import { CastModule } from "modules/cast/cast.module";
import { CompanyModule } from "modules/company/company.module";
import { CountryModule } from "modules/country/country.module";
import { CrewModule } from "modules/crew/crew.module";
import { GenreModule } from "modules/genre/genre.module";
import { MovieController } from "modules/movie/movie.controller";
import { Movie } from "modules/movie/movie.entity";
import { MovieService } from "modules/movie/movie.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Movie]),
    CompanyModule,
    GenreModule,
    CountryModule,
    CastModule,
    CrewModule,
    LoggerModule
  ],
  providers: [MovieService],
  controllers: [MovieController]
})
export class MovieModule {}
