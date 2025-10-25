import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
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
        const fields = await this.fieldModel.find({ department: dept._id }).lean();
        return { ...dept, fields };
      }),
    );
    return results;
  }

  async createDepartment(createData: any) {
    const newDepartment = new this.departmentModel(createData);
    return await newDepartment.save();
  }

  //  Chi tiết department
  async findDepartmentById(id: string) {
    if (!Types.ObjectId.isValid(id)) return null;
    const department = await this.departmentModel.findById(id).lean();
    if (!department) return null;
    const fields = await this.fieldModel.find({ department: id }).lean();
    return { ...department, fields };
  }

  //  Cập nhật department
  async updateDepartment(id: string, updateData: any) {
    return this.departmentModel.findByIdAndUpdate(id, updateData, { new: true }).lean();
  }

  //  Xóa department (và các field thuộc về nó)
  async deleteDepartment(id: string) {
    await this.fieldModel.deleteMany({ department: id });
    await this.departmentModel.findByIdAndDelete(id);
  }

  async createField(createData: any) {
  const { name, department } = createData;
  const departmentId = new Types.ObjectId(department);
  const deptExists = await this.departmentModel.findById(departmentId);
  if (!deptExists) throw new Error('Khoa không tồn tại');
  const newField = new this.fieldModel({
    name,
    department: departmentId, // ✅ dùng ObjectId thật
  });

  return await newField.save();
}
  
  //  Chi tiết field
  async findFieldById(id: string) {
    if (!Types.ObjectId.isValid(id)) return null;
    return this.fieldModel.findById(id).populate('department').lean();
  }

  // Cập nhật field
  async updateField(id: string, updateData: any) {
    return this.fieldModel.findByIdAndUpdate(id, updateData, { new: true }).lean();
  }

  // Xóa field
  async deleteField(id: string) {
    await this.fieldModel.findByIdAndDelete(id);
  }
}
