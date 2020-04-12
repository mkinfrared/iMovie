import { registerValidation } from "@imovie/common";
import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class RegisterPipe implements PipeTransform {
  async transform(value: any, _: ArgumentMetadata) {
    await registerValidation.validate(value, { abortEarly: false });

    return value;
  }
}
