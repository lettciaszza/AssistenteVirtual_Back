import { Test, TestingModule } from '@nestjs/testing'
import { OpenaiController } from './gemini'

describe('OpenaiController', () => {
    let controller: OpenaiController

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [OpenaiController],
        }).compile()

        controller = module.get<OpenaiController>(OpenaiController)
    })

    it('should be defined', () => {
        expect(controller).toBeDefined()
    })
})
