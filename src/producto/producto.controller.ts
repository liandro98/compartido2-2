import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { Producto } from '@prisma/client';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

@Controller('api/producto')
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}

  // Listar productos 
  @Get('/')
  async obtenerProductos() {
    return await this.productoService.obtenerProductos();
  }

  // Listar productos por categoría
  @Get('/OrdCatego/:cveCategoria')
  async obtenerProductoCategoria(@Param('cveCategoria', ParseIntPipe) cveCategoria:number) {
    return await this.productoService.obtenerProductoPorCategoria(cveCategoria);
  }

  // Crear un producto
  @Post('/')
  async crearProducto(@Body() data: Producto) {
    return await this.productoService.crearProducto(data);
  }

  // Actualizar producto
  @Patch(':cveProducto')
  async actualizarCategorias(@Param('cveProducto', ParseIntPipe) cveProducto:number, @Body() producto: Producto) {
    return await this.productoService.actualizar(cveProducto, producto );
  }

  // Eliminar producto
  @Delete(':cveProducto')
    async eliminarCategorias(@Param('cveProducto', ParseIntPipe) cveProducto: number) {
        return await this.productoService.eliminar(cveProducto);
    }
}
