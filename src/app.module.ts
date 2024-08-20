import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { GeminiController } from './gemini/gemini.controller'
import { GeminiService } from './gemini/gemini.service'
import { ConfigModule } from '@nestjs/config'

@Module({
    imports: [ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true })],
    controllers: [AppController, GeminiController],
    providers: [AppService, GeminiService],
})
export class AppModule {}
