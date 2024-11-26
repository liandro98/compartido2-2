import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { Producto } from '@prisma/client';
import { UpdateProductoDto } from './dto/update-producto.dto';

@Injectable()
export class ProductoService {

  constructor(private prisma: PrismaService){ }

  // Obtener productos con filtro por categoría (excluyendo categorías inactivas)
  async obtenerProductos() {
    return await this.prisma.producto.findMany({
      where: {
        categoria: {
          activo: true,  
        },
      },
      include: {
        categoria: true,  
      },
    });
  }

  // Listar productos por categoría
  async obtenerProductoPorCategoria(cveCategoria: number) {
    return await this.prisma.producto.findMany({
      where: {
        cveCategoria: cveCategoria,  
        categoria: {
          activo: true,  
        },
      },
      include: {
        categoria: true, 
      },
    });
  }

  // Crear un nuevo producto
  async crearProducto(producto: Producto) {
    // Verificar si la categoría existe y está activa
  const categoria = await this.prisma.categoria.findUnique({
    where: {
      cveCategoria: producto.cveCategoria,
    },
  });

  if (!categoria || !categoria.activo) {
    throw new Error('La categoría no existe o no está activa');
  }

  // Verificar si ya existe un producto con el mismo nombre en la categoría
  const productoExistente = await this.prisma.producto.findFirst({
    where: {
      descripcion: producto.descripcion,
      cveCategoria: producto.cveCategoria,
    },
  });

  if (productoExistente) {
    throw new Error('Ya existe un producto con ese nombre en la categoría seleccionada');
  }

  // Si todo está bien, proceder a crear el nuevo producto
  return await this.prisma.producto.create({
    data: {
      descripcion: producto.descripcion,
      precio: producto.precio,
      cantidad: producto.cantidad,
      cveCategoria: producto.cveCategoria,
    },
  });
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

  // Elimina un prodcuto
  async eliminar(cveProducto: number){
    return await this.prisma.producto.delete({
        where: {
          cveProducto: cveProducto
        }
    })
}

}
