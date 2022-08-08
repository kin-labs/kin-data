import { Test } from '@nestjs/testing'
import { ApiUnstableFeatureController } from './api-unstable-feature.controller'

describe('ApiUnstableFeatureController', () => {
  let controller: ApiUnstableFeatureController

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [],
      controllers: [ApiUnstableFeatureController],
    }).compile()

    controller = module.get(ApiUnstableFeatureController)
  })

  it('should be defined', () => {
    expect(controller).toBeTruthy()
  })
})
