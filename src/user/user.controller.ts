import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() body: { username: string; password: string }) {
    const user = await this.userService.create(body.username, body.password);
    return user;
  }

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    const user = await this.userService.findOne(body.username);
    if (user && user.password === body.password) {
      return { message: 'ログイン成功！！' };
    } else {
      return { message: 'ユーザー名またはパスワードが違います' };
    }
  }
}
