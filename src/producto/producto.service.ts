import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { Producto } from '@prisma/client';
import { UpdateProductoDto } from './dto/update-producto.dto';

@Injectable()
export class ProductoService {

  constructor(private prisma: PrismaService){ }

  // Obtener productos con filtro por categoría (excluyendo categorías inactivas)
  async obtenerProductos(){
    return await this.prisma.producto.findMany();
  }

   // Crear un nuevo producto
   async crearProducto(producto: Producto) {
    return this.prisma.producto.create({  data: {
      descripcion: producto.descripcion,
      precio: producto.precio,
      cantidad : producto.cantidad,
      cveCategoria : producto.cveCategoria
  } });
  }


  findOne(id: number) {
    return `This action returns a #${id} producto`;
  }

  // Actualizar un producto existente
  async actualizar(cveProducto: number, producto: Producto){
    return await this.prisma.producto.update({
        where: {
            cveProducto: cveProducto
        },
        data: producto
    })
}

  remove(id: number) {
    return `This action removes a #${id} producto`;
  }
}
