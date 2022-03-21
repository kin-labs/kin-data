import { Test } from '@nestjs/testing'
import { ApiNetworkFeatureController } from './api-network-feature.controller'

describe('ApiNetworkFeatureController', () => {
  let controller: ApiNetworkFeatureController

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [],
      controllers: [ApiNetworkFeatureController],
    }).compile()

    controller = module.get(ApiNetworkFeatureController)
  })

  it('should be defined', () => {
    expect(controller).toBeTruthy()
  })
})
