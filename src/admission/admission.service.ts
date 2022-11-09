import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/prisma.service';
import { FormBodyType } from './interfaces/formBody.interface';

@Injectable()
export class AdmissionService {
  constructor(private readonly prismaService: PrismaService) {}
  async admitStudents(body: FormBodyType) {
    try {
      const newStudent = await this.prismaService.admittingStudent.create({
        data: body,
      });
      return newStudent;
    } catch (err) {
      throw this._handleError(err);
    }
  }

  getAllStudents() {
    return this.prismaService.admittingStudent.findMany({
      orderBy: {
        studentName: 'asc',
      },
    });
  }

  async deleteStudent(id: number) {
    const deletedStudent = await this.prismaService.admittingStudent.delete({
      where: {
        id: id,
      },
    });
    return deletedStudent;
  }

  _handleError(err: Error) {
    if (err instanceof PrismaClientKnownRequestError) {
      if (err.meta.target === 'AdmittingStudent_studentEmail_key') {
        return new UnauthorizedException('email already exists');
      } else {
        return new InternalServerErrorException(
          'OPPS ! something went wrong ....',
        );
      }
    }
  }
}
