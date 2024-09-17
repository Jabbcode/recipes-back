import { HttpException, Injectable } from '@nestjs/common'
import { CreateUnitDto } from './dto/create-unit.dto'
import { UpdateUnitDto } from './dto/update-unit.dto'
import { UnitRepository } from './units.repository'
import { Unit } from './schemas/unit.schema'

@Injectable()
export class UnitsService {
  constructor(private readonly unitRepository: UnitRepository) {}

  async create(createUnitDto: CreateUnitDto) {
    try {
      const existUnit = await this.unitRepository.findByName(createUnitDto.name)

      if (existUnit) {
        throw new HttpException(
          {
            statusCode: 400,
            message: 'Existe una unidad con ese nombre',
          },
          400,
        )
      }

      return this.unitRepository.create(createUnitDto)
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      } else {
        throw new HttpException(
          {
            statusCode: 500,
            message: 'Internal server error',
          },
          500,
        )
      }
    }
  }

  async findAll(
    page: number,
    limit: number,
  ): Promise<{ units: Unit[]; pages: number; total: number }> {
    return await this.unitRepository.findAll(page, limit)
  }

  async findIsActive() {
    return await this.unitRepository.findIsActive()
  }

  async findOne(id: string) {
    try {
      const unit = await this.unitRepository.findOne(id)

      if (!unit) {
        throw new HttpException(
          {
            statusCode: 400,
            message: `No existe unidad con el id ${id}`,
          },
          400,
        )
      }

      return unit
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      } else {
        throw new HttpException(
          {
            statusCode: 500,
            message: 'Internal server error',
          },
          500,
        )
      }
    }
  }

  async update(id: string, updateUnitDto: UpdateUnitDto) {
    try {
      const unit = await this.unitRepository.findOne(id)

      if (!unit) {
        throw new HttpException(
          {
            statusCode: 400,
            message: `No existe unidad con el id ${id}`,
          },
          400,
        )
      }
      return await this.unitRepository.update(id, updateUnitDto)
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      } else {
        throw new HttpException(
          {
            statusCode: 500,
            message: 'Internal server error',
          },
          500,
        )
      }
    }
  }

  async remove(id: string) {
    try {
      const unit = await this.unitRepository.findOne(id)

      if (!unit) {
        throw new HttpException(
          {
            statusCode: 400,
            message: `No existe unidad con el id ${id}`,
          },
          400,
        )
      }

      return await this.unitRepository.delete(id)
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      } else {
        throw new HttpException(
          {
            statusCode: 500,
            message: 'Internal server error',
          },
          500,
        )
      }
    }
  }
}
