import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Department, DepartmentSchema } from './schemas/department.schema';
import { Field, FieldSchema } from './schemas/field.schema';
import { DepartmentsController } from './departments.controller';
import { DepartmentsService } from './departments.service';
import { JwtModule } from '@nestjs/jwt'; // 👈 thêm dòng này
import { AdminGuard } from '../../common/guards/admin.guard';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Department.name, schema: DepartmentSchema },
      { name: Field.name, schema: FieldSchema },
    ]),
    JwtModule.register({        // 👈 thêm block này
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [DepartmentsController],
  providers: [DepartmentsService, AdminGuard],
})
export class DepartmentsModule {}
