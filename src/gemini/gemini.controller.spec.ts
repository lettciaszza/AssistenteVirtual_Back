import { Test, TestingModule } from '@nestjs/testing'
import { GeminiController } from './gemini.controller'
import { GeminiService } from './gemini.service'
import { ConfigService } from '@nestjs/config'

describe('AppController', () => {
    let geminiController: GeminiController

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [GeminiController],
            providers: [GeminiService, ConfigService],
        }).compile()

        geminiController = app.get<GeminiController>(GeminiController)
    })

    describe('root', () => {
        it('should be defined', () => {
            expect(geminiController).toBeDefined()
        })
    })
})
