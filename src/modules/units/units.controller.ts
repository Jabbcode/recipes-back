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

@Controller('units')
export class UnitsController {
  constructor(private readonly unitsService: UnitsService) {}

  @Post()
  async create(@Body() createUnitDto: CreateUnitDto): Promise<Unit> {
    return this.unitsService.create(createUnitDto)
  }

  @Get()
  async findAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<{ units: Unit[]; pages: number; total: number }> {
    return this.unitsService.findAll(page, limit)
  }

  @Get('/is-active')
  async findIsActive(): Promise<Unit[]> {
    return await this.unitsService.findIsActive()
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Unit> {
    return this.unitsService.findOne(id)
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUnitDto: UpdateUnitDto,
  ): Promise<Unit> {
    return this.unitsService.update(id, updateUnitDto)
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.unitsService.remove(id)
  }
}
