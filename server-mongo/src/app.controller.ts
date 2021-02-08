import { Controller, Get, Post, Body, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { RequestUser, RequestUserType, UseJwtAuth, UseLocalAuth, User, UserService, } from '@hilma/auth-mongo-nest';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService,
  ) { }


  @Post("/signUp")
  async signUp(@Body() body: { username: string, password: string }, @Res() res: Response): Promise<void> {

    const userForDB = new User({
      username: body.username,
      password: body.password,
      roles: [
        {
          name: "simple",
          roleKey: "aaabbb"
        }
      ]
    });
    const user = await this.userService.createUser(userForDB);

    const requestUser: RequestUserType = {
      _id: user.id,
      username: body.username,
      type: 'User',
      roles: userForDB.roles.map(role => role.name),
      roleKeys: userForDB.roles.map(role => role.roleKey)
    }
    const resBody = this.userService.login(requestUser, res);
    res.send(resBody);

  }

  @Post("/login")
  @UseLocalAuth()
  login(@Res() res: Response, @RequestUser() user: RequestUserType): void {
    const body = this.userService.login(user, res);
    res.send(body);
  }
}
