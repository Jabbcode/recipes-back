import { Test, TestingModule } from '@nestjs/testing'
import { FoodTypesController } from './food-types.controller'
import { FoodTypesService } from './food-types.service'

describe('FoodTypesController', () => {
  let controller: FoodTypesController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FoodTypesController],
      providers: [FoodTypesService],
    }).compile()

    controller = module.get<FoodTypesController>(FoodTypesController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
