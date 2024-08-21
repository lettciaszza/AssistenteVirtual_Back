import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from './../src/app.module'
import { ConfigService } from '@nestjs/config'

describe('AppController (e2e)', () => {
    let app: INestApplication

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile()

        app = moduleFixture.createNestApplication()
        await app.init()
    })

    it('/ (GET)', () => {
        return request(app.getHttpServer()).get('/health').expect(200)
    })

    it('/prompt no auth (POST)', () => {
        const message = { message: 'Hello, world!' }
        return request(app.getHttpServer())
            .post('/prompt')
            .send(message)
            .expect(401)
    })
    it('/prompt with auth (POST)', () => {
        const configService = new ConfigService()
        const API_KEY = configService.get<string>('API_KEY')
        const message = { message: 'Hello, world!' }
        if (!API_KEY)
            throw Error(
                'No API_KEYS found on the enviroment, please check the .env',
            )

        return request(app.getHttpServer())
            .post('/prompt')
            .set('Authorization', API_KEY)
            .send(message)
            .expect(201)
    })
})
