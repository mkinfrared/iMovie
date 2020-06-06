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
      const regex = /(?<=\().+(?=\)=)/;
      const [columns] = exception.detail.match(regex) as string[];
      const result: Record<string, string[]> = {};

      columns.split(", ").forEach((column) => {
        const [name] = column.match(/[a-z]+/) as string[];

        result[name] = [`${name} is already taken`];
      });

      response.status(HttpStatus.CONFLICT).json(result);

      return;
    }

    response.status(HttpStatus.CONFLICT).json({
      error: "Test error from Custom Exception Handler Marklar"
    });
  }
}
