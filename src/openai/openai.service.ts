import { Injectable } from '@nestjs/common'

@Injectable()
export class OpenaiService {
    getCompletion(): string {
        return 'This action returns completion from openai'
    }
}
