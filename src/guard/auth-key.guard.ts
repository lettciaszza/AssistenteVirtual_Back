import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class ApiKeyAuthGuard implements CanActivate {
    constructor(private configService: ConfigService) {}

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest()
        const apiKey = request.headers.authorization
        console.log(apiKey)

        if (this.validateApiKey(apiKey)) {
            return true
        } else {
            throw new UnauthorizedException('Access denied')
        }
    }

    validateApiKey(apiKey: string): boolean {
        const API_KEY = this.configService.get<string>('API_KEY')

        return apiKey === API_KEY
    }
}
