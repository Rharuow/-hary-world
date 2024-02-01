import { encodeSha256 } from '@/libs/bcrypt';
import { UserService } from '@/user/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
// import { ROLE } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn({
    name,
    password: inputPassword,
  }: {
    name: string;
    password: string;
  }) {
    const user = await this.userService.findUserByName(name, true);

    if (user?.password !== encodeSha256(inputPassword))
      throw new UnauthorizedException();

    const payload = { name: user.name, id: user.id, role: user.role };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async getProfile({ token }: { token: string }) {
    try {
      // const user: {
      //   name: string;
      //   password: string;
      //   id: string;
      //   role: {
      //     name: ROLE;
      //     id: string;
      //   };
      // } = await this.jwtService.verifyAsync(token);

      return await this.jwtService.verifyAsync(token);
    } catch (error) {
      throw new Error(error);
    }
  }
}
