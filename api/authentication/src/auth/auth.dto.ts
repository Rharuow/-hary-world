import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  password: string;
}
