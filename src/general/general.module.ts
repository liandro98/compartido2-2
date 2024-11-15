import { Module } from '@nestjs/common';
import { GeneralController } from './general.controller';
import { GeneralService } from './general.service';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';


@Module({
  controllers: [GeneralController],
  providers: [GeneralService, PrismaService, JwtService]
})
export class GeneralModule {}
