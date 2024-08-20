import { Injectable, Param } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class OpenaiService {
    constructor(private configService: ConfigService) {}
    private async getOpenaiCompletion(message: string): Promise<string> {
        const data = {
            model: 'gpt-4o-mini',
            messages: [{ role: 'user', content: message }],
            temperature: 0.7,
        }
        const OPENAI_API_KEY = this.configService.get<string>('OPENAI_KEY')

        try {
            const response = await fetch(
                'https://api.openai.com/v1/chat/completions',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${OPENAI_API_KEY}`,
                    },
                    body: JSON.stringify(data),
                },
            )

            if (!response.ok) {
                throw new Error(
                    `Error: ${response.status} ${response.statusText}`,
                )
            }

            const result = await response.json()
            return result.choices[0].message.content
        } catch (err) {
            throw new Error(`Failed to get completion from OpenAI: ${err}`)
        }
    }

    async getCompletion(message: string): Promise<string> {
        try {
            const response = await this.getOpenaiCompletion(message)
            return response
        } catch (err) {
            throw err
        }
    }
}
