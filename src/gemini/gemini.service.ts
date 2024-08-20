import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai'

@Injectable()
export class OpenaiService {
    constructor(private configService: ConfigService) {}

    private initGemini(): GenerativeModel {
        const GEMINI_KEY = this.configService.get<string>('GOOGLE_GEMINI_KEY')

        if (!GEMINI_KEY) throw new Error('Gemini Key is missing')

        const genAI = new GoogleGenerativeAI(GEMINI_KEY)
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
        return model
    }

    private async getGeminiCompletion(message: string) {
        const gemini = this.initGemini()
        const result = await gemini.generateContent(message)

        const response = result.response
        const text = response.text()
        return text
    }

    async getCompletion(message: string): Promise<string> {
        try {
            const response = await this.getGeminiCompletion(message)
            return response
        } catch (err) {
            throw err
        }
    }
}
