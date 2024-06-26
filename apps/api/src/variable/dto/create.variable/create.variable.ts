import 'reflect-metadata'
import { Transform, Type } from 'class-transformer'
import {
  IsArray,
  IsOptional,
  IsString,
  IsBoolean,
  Length,
  ValidateNested
} from 'class-validator'

export class CreateVariable {
  @IsString()
  @Transform(({ value }) => value.trim())
  name: string

  @IsString()
  @IsOptional()
  @Length(0, 100)
  @Transform(({ value }) => (value ? value.trim() : null))
  note?: string

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  requireRestart?: boolean

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Entry)
  entries?: Entry[]
}

class Entry {
  @IsString()
  @Transform(({ value }) => value.trim())
  environmentId: string

  @IsString()
  @Transform(({ value }) => value.trim())
  value: string
}
