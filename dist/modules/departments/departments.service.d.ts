import { Model, Types } from 'mongoose';
import { Department } from './schemas/department.schema';
import { Field } from './schemas/field.schema';
export declare class DepartmentsService {
    private departmentModel;
    private fieldModel;
    constructor(departmentModel: Model<Department>, fieldModel: Model<Field>);
    findAllDepartmentsWithFields(): Promise<{
        fields: (import("mongoose").FlattenMaps<{
            name: string;
            department: Types.ObjectId;
        }> & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        })[];
        name: string;
        description?: string;
        logo?: string;
        _id: Types.ObjectId;
        __v: number;
    }[]>;
    createDepartment(createData: any): Promise<import("mongoose").Document<unknown, {}, Department, {}, {}> & Department & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
    findDepartmentById(id: string): Promise<{
        fields: (import("mongoose").FlattenMaps<{
            name: string;
            department: Types.ObjectId;
        }> & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        })[];
        name: string;
        description?: string;
        logo?: string;
        _id: Types.ObjectId;
        __v: number;
    }>;
    updateDepartment(id: string, updateData: any): Promise<import("mongoose").FlattenMaps<{
        name: string;
        description?: string;
        logo?: string;
    }> & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
    deleteDepartment(id: string): Promise<void>;
    createField(createData: any): Promise<import("mongoose").Document<unknown, {}, Field, {}, {}> & Field & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
    findFieldById(id: string): Promise<import("mongoose").FlattenMaps<{
        name: string;
        department: Types.ObjectId;
    }> & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
    updateField(id: string, updateData: any): Promise<import("mongoose").FlattenMaps<{
        name: string;
        department: Types.ObjectId;
    }> & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
    deleteField(id: string): Promise<void>;
}
