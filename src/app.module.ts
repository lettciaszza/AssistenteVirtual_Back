import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { OpenaiController } from './gemini/gemini'
import { OpenaiService } from './gemini/gemini.service'
import { ConfigModule } from '@nestjs/config'

@Module({
    imports: [ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true })],
    controllers: [AppController, OpenaiController],
    providers: [AppService, OpenaiService],
})
export class AppModule {}
