import { Test } from '@nestjs/testing'
import { ApiUnstableDataAccessService } from './api-unstable-data-access.service'

describe('ApiUnstableDataAccessService', () => {
  let service: ApiUnstableDataAccessService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiUnstableDataAccessService],
    }).compile()

    service = module.get(ApiUnstableDataAccessService)
  })

  it('should be defined', () => {
    expect(service).toBeTruthy()
  })
})
