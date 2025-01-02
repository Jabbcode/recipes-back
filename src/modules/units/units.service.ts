import { HttpException, Injectable } from '@nestjs/common'

import { UnitRepository } from './units.repository'

import { CreateUnitDto, FilterUnitDto, UpdateUnitDto } from './dto'
import { Unit } from './schemas'

@Injectable()
export class UnitsService {
  constructor(private readonly unitRepository: UnitRepository) {}

  async create(createUnitDto: CreateUnitDto): Promise<{ unit: Unit; message: string }> {
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

      return {
        unit: await this.unitRepository.create(createUnitDto),
        message: 'La unidad se agrego correctamente',
      }
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

  async findByFilter(filter: FilterUnitDto) {
    return await this.unitRepository.findByFilter(filter)
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

  async update(id: string, updateUnitDto: UpdateUnitDto): Promise<{ unit: Unit; message: string }> {
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
      return {
        unit: await this.unitRepository.update(id, updateUnitDto),
        message: 'Unidad actualizada correctamente',
      }
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

  async remove(id: string): Promise<{ unit: Unit; message: string }> {
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

      return {
        unit: await this.unitRepository.delete(id),
        message: 'La unidad se borro correctamente',
      }
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
