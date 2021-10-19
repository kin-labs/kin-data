import { Injectable } from '@nestjs/common'

@Injectable()
export class ApiStatsDataAccessService {
  index() {
    return ['/kre']
  }
}
