import { User } from '@app/decorators/user.decorator';
import { AuthGuard } from '@app/user/guards/auth.guard';
import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { IProfileResponse } from './types/profileResponse.type';

@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get(':username')
  async getProfile(
    @Param('username') username: string,
    @User('id') currentUserId: number,
  ): Promise<IProfileResponse> {
    const profile = await this.profileService.getProfileByUsername(
      username,
      currentUserId,
    );
    return this.profileService.buildProfileResponse(profile);
  }

  @Post(':username/follow')
  @UseGuards(AuthGuard)
  async follow(
    @User('id') currentUserId: number,
    @Param('username') username: string,
  ): Promise<IProfileResponse> {
    const profile = await this.profileService.follow(username, currentUserId);
    return this.profileService.buildProfileResponse(profile);
  }

  @Delete(':username/follow')
  @UseGuards(AuthGuard)
  async unfollow(
    @User('id') currentUserId: number,
    @Param('username') username: string,
  ): Promise<IProfileResponse> {
    const profile = await this.profileService.unfollow(username, currentUserId);
    return this.profileService.buildProfileResponse(profile);
  }
}
