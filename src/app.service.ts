import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
    getHealth(): string {
        let heap = process.memoryUsage().heapTotal
        return `Memory heap usage: ${(heap / 1000000).toFixed(2)} MB at ${new Date()}`
    }
}
