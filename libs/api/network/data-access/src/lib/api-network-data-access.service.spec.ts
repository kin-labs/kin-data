import { Test } from '@nestjs/testing'
import { ApiNetworkDataAccessService } from './api-network-data-access.service'

describe('ApiNetworkDataAccessService', () => {
  let service: ApiNetworkDataAccessService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiNetworkDataAccessService],
    }).compile()

    service = module.get(ApiNetworkDataAccessService)
  })

  it('should be defined', () => {
    expect(service).toBeTruthy()
  })
})
