import {
    Controller,
    HttpException,
    HttpStatus,
    Post,
    Req,
    UseGuards,
} from '@nestjs/common'
import { Request } from 'express'
import { GeminiService } from './gemini.service'
import { ApiKeyAuthGuard } from '../guard/auth-key.guard'

@Controller('prompt')
@UseGuards(ApiKeyAuthGuard)
export class GeminiController {
    constructor(private readonly geminiService: GeminiService) {}

    @Post()
    async getPrompt(@Req() request: Request): Promise<string> {
        if (!request.body.message)
            throw new HttpException('Forbidden action', HttpStatus.FORBIDDEN)

        try {
            let completion = await this.geminiService.getCompletion(
                request.body.message,
            )

            return completion
        } catch (err) {
            console.error(`gemini::controller: ${err}`)
            throw new HttpException(
                err || 'Something went wrong',
                HttpStatus.INTERNAL_SERVER_ERROR,
            )
        }
    }
}
