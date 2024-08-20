import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { OpenaiController } from './openai/openai.controller';
import { OpenaiService } from './openai/openai.service';

@Module({
    imports: [],
    controllers: [AppController, OpenaiController],
    providers: [AppService, OpenaiService],
})
export class AppModule {}
