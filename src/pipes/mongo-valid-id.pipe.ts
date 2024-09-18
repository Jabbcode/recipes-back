import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common'
import { isMongoId } from 'class-validator'

@Injectable()
export class MongoValidIdPipe implements PipeTransform<string, string> {
  transform(value: string): string {
    if (!isMongoId(value)) {
      throw new BadRequestException(`El ${value} no es un id de mongo valido`)
    }
    return value
  }
}
