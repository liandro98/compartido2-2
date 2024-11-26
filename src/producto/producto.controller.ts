import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { Producto } from '@prisma/client';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

@Controller('producto')
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}

  // Listar productos con filtro por categoría
  @Get('/')
  async obtenerProductos() {
    return await this.productoService.obtenerProductos();
  }

  // Crear un producto
  @Post('/')
  async crearProducto(@Body() data: Producto) {
    return await this.productoService.crearProducto(data);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productoService.findOne(+id);
  }

  // Actualizar producto
  @Patch(':cveProducto')
  async actualizarCategorias(@Param('cveProducto', ParseIntPipe) cveProducto:number, @Body() producto: Producto) {
    return await this.productoService.actualizar(cveProducto, producto );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productoService.remove(+id);
  }
}
