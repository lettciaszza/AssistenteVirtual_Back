import { Controller, Get, Req } from '@nestjs/common'
import { Request } from 'express'
import { OpenaiService } from './openai.service'

@Controller('prompt')
export class OpenaiController {
    constructor(private readonly openaiService: OpenaiService) {}

    @Get()
    findAll(@Req() request: Request): string {
        return this.openaiService.getCompletion()
    }
}
