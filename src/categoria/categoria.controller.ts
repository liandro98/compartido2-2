import { Body, Controller, Delete, Get, Param, ParseBoolPipe, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CategoriaDto } from './dto/categoria.dto';
import { CategoriaService } from './categoria.service';

@Controller('api/categoria')
export class CategoriaController {

constructor(private categoriaSvc: CategoriaService) {}

    @Get('/')
    async listarCategorias() {
        return await this.categoriaSvc.listarCategorias();
    }
    @Post('/')
    async insertarCategorias(@Body() categoria: CategoriaDto) {
        return await this.categoriaSvc.insertarCategorias(categoria);
    }
    @Patch(':cveCategoria')
    async actualizarCategorias(@Param('cveCategoria', ParseIntPipe) cveCategoria: number, @Body() categoria: CategoriaDto) {
        return await this.categoriaSvc.actualizar(cveCategoria, categoria )
    }


    @Delete(':cvecategoria')
    async eliminarCategorias(@Param('cveCategoria', ParseIntPipe) cveCategoria: number) {
        return await this.categoriaSvc.eliminar(cveCategoria);
    }


    @Patch(':cveCategoria/:estatus')
    async cambiarEstatusCategoria(@Param('cveCategoria', ParseIntPipe) cveCategoria: number, @Param('estatus', ParseBoolPipe) estatus: boolean) {
        return await this.categoriaSvc.cambiarEstatus(cveCategoria, estatus)
    }

}