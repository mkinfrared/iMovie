import { Controller, Get, Query } from "@nestjs/common";

import { PersonService } from "modules/person/person.service";

@Controller("person")
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Get()
  getMovies(@Query("name") name: string) {
    return this.personService.getPeopleByName(name);
  }
}
