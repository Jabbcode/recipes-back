import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common'
import { UnitsService } from './units.service'
import { CreateUnitDto } from './dto/create-unit.dto'
import { UpdateUnitDto } from './dto/update-unit.dto'
import { Unit } from './schemas/unit.schema'
import { FilterUnitDto } from './dto/filter-unit.dto'
import { MongoValidIdPipe } from 'src/pipes/mongo-valid-id.pipe'

interface ResponseUnit {
  unit: Unit
  message: string
}

@Controller('units')
export class UnitsController {
  constructor(private readonly unitsService: UnitsService) {}

  @Post()
  async create(@Body() createUnitDto: CreateUnitDto): Promise<ResponseUnit> {
    return this.unitsService.create(createUnitDto)
  }

  @Get()
  async findAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<{ units: Unit[]; pages: number; total: number }> {
    return this.unitsService.findAll(page, limit)
  }

  @Post('/search')
  async findByFilter(@Body() filter: FilterUnitDto): Promise<Unit[]> {
    return await this.unitsService.findByFilter(filter)
  }

  @Get(':id')
  async findOne(@Param('id', MongoValidIdPipe) id: string): Promise<Unit> {
    return this.unitsService.findOne(id)
  }

  @Patch(':id')
  async update(
    @Param('id', MongoValidIdPipe) id: string,
    @Body() updateUnitDto: UpdateUnitDto,
  ): Promise<ResponseUnit> {
    return this.unitsService.update(id, updateUnitDto)
  }

  @Delete(':id')
  async remove(
    @Param('id', MongoValidIdPipe) id: string,
  ): Promise<ResponseUnit> {
    return this.unitsService.remove(id)
  }
}
