import { BadRequestException, Body, Controller, HttpCode, HttpStatus, InternalServerErrorException, Post, UnauthorizedException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PrismaService } from 'src/prisma.service';
import { AuthDto } from 'src/shared/dto/auth.dto';
import { UtilsService } from 'src/shared/services/utils/utils.service';
import { AuthService } from './auth.service';

@Controller('api/auth')
@ApiTags('Auth')
export class AuthController {
    
    constructor(private utilSvc: UtilsService,
                private authSvc: AuthService
    ) {}

    @Post()
    @HttpCode(HttpStatus.OK)
   async iniciarSesion(@Body() data: AuthDto) {
        //1: Username
        //2: Password
        const{ username, password } = data;

        // TODO: Berificar si el usuario existe
         const usuario = await this.authSvc.obtenerUsuario(username);

        //TODO: Si el usuario no existe devolver error
        if (!usuario) {
            throw new UnauthorizedException('El usuario y/o contraseña es incorrecta');
        }

        //TODO: Verificar la contraseña del ususario
        if (await this.utilSvc.checkPassword(password, usuario.password)) {
            //TODO: Si la contraseña es correcta se genera un payload con la informacion
            const { password, fechaRegistro, ...payload} = usuario;

            //TODO: Generar JWT
            const jwt = await this.utilSvc.generateJWT(payload);


            //TODO: Enviar el JWT
            return {token : jwt};
        } else{
            throw new BadRequestException('El usuario y/o contrasena es incorrecto');
        }
        
    
        //'Sesion iniciada'        
    }
}