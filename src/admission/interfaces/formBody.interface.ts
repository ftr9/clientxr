import { GenderType, Programs } from '@prisma/client';
export interface FormBodyType {
  studentName: string;
  studentPhone: string;
  studentAddress: string;
  studentEmail: string;
  program: Programs;
  parentName: string;
  gender: GenderType;
  parentPhone: string;
  profilePicName: string;
  marksheet11Name: string;
  marksheet12Name: string;
}
