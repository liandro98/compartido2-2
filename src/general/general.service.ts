import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class GeneralService {

    constructor(private prisma: PrismaService){}

    async getRoles(){
        const roles = await this.prisma.rol.findMany({
            where: {
                activo: true
            }
        });

        return roles;
    }
}
