import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UtilsService } from './shared/services/utils/utils.service';
import { JwtService } from '@nestjs/jwt';
import { UsuarioModule } from './usuario/usuario.module';
import { GeneralModule } from './general/general.module';
import { CategoriaModule } from './categoria/categoria.module';
import { ProductoModule } from './producto/producto.module';

@Module({
  imports: [AuthModule, UsuarioModule, GeneralModule, CategoriaModule, ProductoModule],
  controllers: [AppController],
  providers: [AppService, UtilsService,JwtService],
})
export class AppModule {}
