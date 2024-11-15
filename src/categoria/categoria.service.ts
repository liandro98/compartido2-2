import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CategoriaDto } from './dto/categoria.dto'
import { createVerify } from 'crypto';
//'./dto/create/categoria.dto';

@Injectable()
export class CategoriaService {

    constructor(private prismaSvc: PrismaService){ }

    async listarCategorias(){
        return await this.prismaSvc.categoria.findMany();
    }

    async insertarCategorias(categoria: CategoriaDto){
        return await this.prismaSvc.categoria.create({
            data: {
                descripcion: categoria.descripcion,
                activo:true
            }
        })
    }

    async actualizar(cveCategoria: number, categoria: CategoriaDto){
        return await this.prismaSvc.categoria.update({
            where: {
                cveCategoria: cveCategoria
            },
            data: categoria
        })
    }

    async eliminar(cveCategoria: number){
        return await this.prismaSvc.categoria.delete({
            where: {
                cveCategoria: cveCategoria
            }
        })
    }

    async cambiarEstatus(cveCategoria: number, estatus:boolean){
        return await this.prismaSvc.categoria.update({
            where: {
                cveCategoria: cveCategoria
            },
            data: {
                activo: estatus
            }
        })
    }

}