import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
const bcrypt = require("bcrypt");

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(email: string, password: string): Promise<{ user_id: string; access_token: string }> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException("User with this email does not exist");
    }
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException("Incorrect password");
    }

    const payload = { sub: user.id, email: user.name };
    return {
      user_id: user.id,
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
