import { compare } from '@/libs/bcrypt';
import { UserService } from '@/user/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ROLE } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn({
    email,
    password: inputPassword,
  }: {
    email: string;
    password: string;
  }) {
    const user = await this.userService.findUserByEmail(email, true);

    if (user && compare(inputPassword)) throw new UnauthorizedException();

    const payload = { email: user?.email, id: user?.id, role: user?.role };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async getProfile({ token }: { token: string }) {
    try {
      const user: {
        name: string;
        email: string;
        password: string;
        id: string;
        role: {
          name: ROLE;
          id: string;
        };
      } = await this.jwtService.verifyAsync(token);

      if (user.role.name !== 'ROOT')
        return await this.userService.findUserByEmail(
          user.email,
          false,
          user.role.name === 'CLIENT'
            ? {
                client: { select: { phone: true } },
              }
            : { admin: { select: { phone: true } } },
        );

      return await this.jwtService.verifyAsync(token);
    } catch (error) {
      throw new Error(error);
    }
  }
}
