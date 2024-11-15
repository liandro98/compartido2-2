import { IsNotEmpty, isNotEmpty, IsString, isString } from "class-validator";

export class CategoriaDto {
    cveCategoria: number;
    nombre(nombre: any) {
        throw new Error('Method not implemented.');
    }
    @IsString()
    @IsNotEmpty()
    descripcion: string;

}