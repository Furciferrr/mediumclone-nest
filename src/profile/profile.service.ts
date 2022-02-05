import { UserEntity } from '@app/user/user.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfileType } from './types/profile.type';
import { IProfileResponse } from './types/profileResponse.type';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getProfileByUsername(username: string): Promise<ProfileType> {
    const user = await this.userRepository.findOne({ username });
    if (!user) {
      throw new HttpException('Profile not exist', HttpStatus.NOT_FOUND);
    }
    const profile = {
      username: user.username,
      bio: user.bio,
      image: user.image,
      following: false,
    };

    return profile;
  }

  async follow(username: string, currentUserId: number): Promise<any> {
    return new Promise((res, rej) => res('followed'));
  }

  async unfollow(username: string, currentUserId: number): Promise<any> {
    return new Promise((res, rej) => res('followed'));
  }

  buildProfileResponse(profile: ProfileType): IProfileResponse {
    return { profile };
  }
}
