import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Department } from './schemas/department.schema';
import { Field } from './schemas/field.schema';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectModel(Department.name) private departmentModel: Model<Department>,
    @InjectModel(Field.name) private fieldModel: Model<Field>,
  ) {}

  async findAllDepartmentsWithFields() {
    const departments = await this.departmentModel.find().lean();

    const results = await Promise.all(
      departments.map(async (dept) => {
        const fields = await this.fieldModel
          .find({ department: dept._id })
          .lean();
        return { ...dept, fields };
      }),
    );

    return results;
  }
}
