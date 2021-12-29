import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Document } from 'mongoose';

const options: SchemaOptions = {
  // createAt, updateAt이 자동적으로 생성
  timestamps: true,
};
import { ApiProperty } from '@nestjs/swagger';

@Schema(options)
export class Cat extends Document {
  @ApiProperty({
    example: 'baegofda@daum.net',
    description: 'email',
    required: true,
  })
  @Prop({ required: true, unique: true })
  //class-validator
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'baegofda',
    description: 'name',
    required: true,
  })
  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '12345',
    description: 'password',
    required: true,
  })
  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  password: string;

  @Prop()
  @IsString()
  imgUrl: string;

  readonly readOnlyData: { id: string; eamil: string; name: string };
}

export const CatSchema = SchemaFactory.createForClass(Cat);

// virtual field: 실제로 디비에서 저장되지는않지만 비지니스로직에서 사용할 수 있도록해준다.
CatSchema.virtual('readOnlyData').get(function (this: Cat) {
  return {
    id: this.id,
    email: this.email,
    name: this.name,
  };
});
