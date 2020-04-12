import { ValidationError, formatValidatorError } from "@imovie/common";
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus
} from "@nestjs/common";
import { Response } from "express";

@Catch(ValidationError)
export class ValidationException implements ExceptionFilter {
  catch(exception: ValidationError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const error = formatValidatorError(exception);

    response.status(HttpStatus.BAD_REQUEST).json(error);
  }
}
