import {
  IsString,
  IsNotEmpty,
  IsPhoneNumber,
  IsEmail,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { GenderType, Programs } from '@prisma/client';

export class AdmissionFormDto {
  @IsNotEmpty()
  @IsString()
  studentName: string;

  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber('NP')
  studentPhone: string;

  @IsNotEmpty()
  @IsString()
  studentAddress: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  studentEmail: string;

  @IsNotEmpty()
  @IsEnum(Programs)
  program: Programs;

  @IsNotEmpty()
  @IsString()
  parentName: string;

  @IsNotEmpty()
  @IsString()
  parentPhone: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  profilePicName: string;

  @IsNotEmpty()
  @IsEnum(GenderType)
  gender: GenderType;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  marksheet11Name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  marksheet12Name: string;
}
