import { Model } from 'mongoose';
import { Department } from './schemas/department.schema';
import { Field } from './schemas/field.schema';
export declare class DepartmentsService {
    private departmentModel;
    private fieldModel;
    constructor(departmentModel: Model<Department>, fieldModel: Model<Field>);
    findAllDepartmentsWithFields(): Promise<{
        fields: (import("mongoose").FlattenMaps<{
            name: string;
            department: import("mongoose").Types.ObjectId;
        }> & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        })[];
        name: string;
        description?: string;
        logo?: string;
        _id: import("mongoose").Types.ObjectId;
        __v: number;
    }[]>;
}
