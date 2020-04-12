import { loginValidation } from "@imovie/common";
import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class LoginPipe implements PipeTransform {
  async transform(value: any, _: ArgumentMetadata) {
    await loginValidation.validate(value, { abortEarly: false });

    return value;
  }
}
