import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GeneralService } from './general.service';
import { AuthGuard } from 'src/shared/guard/auth/auth.guard';

@Controller('api/general')
@ApiTags ('General')
@UseGuards(AuthGuard)
export class GeneralController { 

    constructor( private generalSvc: GeneralService){}

    @Get('roles')
    @ApiOperation({summary: 'Obtener todos lo sactivos'})
    async getRoles(){
        const roles= await this.generalSvc.getRoles();
        return roles; 
    }
}
