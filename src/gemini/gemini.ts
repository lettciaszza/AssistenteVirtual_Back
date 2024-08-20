import {
    Controller,
    HttpException,
    HttpStatus,
    Post,
    Req,
} from '@nestjs/common'
import { Request } from 'express'
import { OpenaiService } from './gemini.service'

@Controller('prompt')
export class OpenaiController {
    constructor(private readonly openaiService: OpenaiService) {}

    @Post()
    async findAll(@Req() request: Request): Promise<string> {
        if (!request.body.message)
            throw new HttpException('Forbidden action', HttpStatus.FORBIDDEN)

        try {
            let completion = await this.openaiService.getCompletion(
                request.body.message,
            )

            return completion
        } catch (err) {
            console.error(`openai::controller: ${err}`)
            throw new HttpException(
                err || 'Something went wrong',
                HttpStatus.INTERNAL_SERVER_ERROR,
            )
        }
    }
}
