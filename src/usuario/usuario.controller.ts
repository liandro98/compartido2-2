import { BadRequestException, Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { get } from 'http';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UtilsService } from 'src/shared/services/utils/utils.service';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { AuthGuard } from 'src/shared/guard/auth/auth.guard';

@Controller('api/usuario')
@ApiTags('usuarios')
@UseGuards(AuthGuard)
export class UsuarioController {
    

    constructor(private usuarioSvc: UsuarioService,
        private utilSvc: UtilsService ) {}
    
    @Get()
    async listaUsuario(){
        return await this.usuarioSvc.listarUsuarios();
    }

    @Post()
    async insertUsuario(@Body () usuario: CreateUsuarioDto) {

        //TODO: Verificar que el rol exista
        const roles = await this.usuarioSvc.verificarRol(usuario.cveRol);
        if (roles.length <= 0){
            throw new BadRequestException('El rol no existe')
        }

        //TODO: si el username existe
        const usernames = await this.usuarioSvc.verificarUsername(usuario.username)
        if (usernames.length > 0) {
            throw new BadRequestException('El nombre del usuario ya existe')
        }

        //TODO: Encriptar contraseña 
        var encriptedText = await this.utilSvc.hashPassword(usuario.password)
        usuario.password = encriptedText;

        //TODO: insertar usuario y devolver el usuario insertado
        return await this.usuarioSvc.insertar(usuario)

    }

    //insertar usuario

    @Patch(':cveUsuario')
    async actualizarUsuario(@Param('cveUsuario', ParseIntPipe) cveUsuario: number, @Body () usuario: UpdateUsuarioDto){

        //TODO: Verificar el usuario 
        const verifyUser = await this.usuarioSvc.verificarClave(cveUsuario);
        if (verifyUser.length <= 0){
            throw new BadRequestException('El usuario no existe')
        }

        //TODO: verificar el rol 
        const rol = await this.usuarioSvc.verificarRol(usuario.cveRol);
        if (rol.length <= 0) {
            throw new BadRequestException('El rol no existe')
        }

        //TODO: actualizar la informacion y devolver el usuario actualizado
        return await this.usuarioSvc.actualizar(cveUsuario, usuario);

    }

    @Delete(':cveUsuario')
    async eliminarUsuario(@Param('cveUsuario', ParseIntPipe)cveUsuario: number){

        // Verificar que el usuario exista
        const verifyUser = await this.usuarioSvc.verificarClave(cveUsuario);
        if (verifyUser.length <= 0) {
            throw new BadRequestException('El usuario no existe')

        }
        //Eliminar usuario
        return await this.usuarioSvc.eliminar(cveUsuario);//
    }
}
