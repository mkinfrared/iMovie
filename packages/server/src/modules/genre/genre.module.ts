import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Genre } from "modules/genre/genre.entity";
import { GenreService } from "modules/genre/genre.service";

@Module({
  imports: [TypeOrmModule.forFeature([Genre])],
  providers: [GenreService],
  exports: [GenreService]
})
export class GenreModule {}
