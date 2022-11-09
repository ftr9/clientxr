import {
  Controller,
  Post,
  Get,
  UseInterceptors,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { Body, Param, UploadedFiles } from '@nestjs/common/decorators';
import { FileFieldsInterceptor } from '@nestjs/platform-express/multer';
import * as multer from 'multer';
import * as Path from 'path';
import { v4 as uuid } from 'uuid';
import { AdmissionService } from './admission.service';
import { AdmissionFormDto } from './Dtos/AdmissionForm.dtos';
import { filesType } from './interfaces/uploadFile.interface';

const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/client/frontend/img/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, uuid() + Path.extname(file.originalname));
  },
});

@Controller('admission')
export class AdmissionController {
  constructor(private readonly admissionService: AdmissionService) {}
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        {
          name: 'profilepic',
          maxCount: 1,
        },
        {
          name: 'marksheetgrade11',
          maxCount: 1,
        },
        {
          name: 'marksheetgrade12',
          maxCount: 1,
        },
      ],
      {
        storage: diskStorage,
      },
    ),
  )
  admitStudents(
    @Body() body: AdmissionFormDto,
    @UploadedFiles()
    files: filesType,
  ) {
    return this.admissionService.admitStudents({
      studentName: body.studentName,
      studentPhone: body.studentPhone,
      studentAddress: body.studentAddress,
      studentEmail: body.studentEmail,
      program: body.program,
      parentName: body.parentName,
      gender: body.gender,
      parentPhone: body.parentPhone,
      profilePicName: files.profilepic[0].filename,
      marksheet11Name: files.marksheetgrade11[0].filename,
      marksheet12Name: files.marksheetgrade12[0].filename,
    });
  }

  @Get('students')
  getAllStudents() {
    return this.admissionService.getAllStudents();
  }

  @Delete('/students/:id')
  deleteStudent(@Param('id', ParseIntPipe) studentId: number) {
    return this.admissionService.deleteStudent(studentId);
  }
}
