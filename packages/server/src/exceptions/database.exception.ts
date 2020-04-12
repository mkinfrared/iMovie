import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus
} from "@nestjs/common";
import { Response } from "express";
import { QueryFailedError } from "typeorm";

@Catch(QueryFailedError)
export class DatabaseException implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception.code === "23505") {
      const regex = /(?<=\()[a-z]+(?=\))/;
      const column = exception.detail.match(regex);

      response
        .status(HttpStatus.CONFLICT)
        .json({ [column]: `${column} is already taken` });
    }

    response.status(HttpStatus.CONFLICT).json({
      error: "Test error from Custom Exception Handler Marklar"
    });
  }
}
