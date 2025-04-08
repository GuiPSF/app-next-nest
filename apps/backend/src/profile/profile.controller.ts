import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('profile')
export class ProfileController {
  @Get()
  profile(@Req() req) {
    return {message: 'You are in the profile page', userId: req.userId} ;
  }
}
