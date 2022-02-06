import { UserEntity } from '@app/user/user.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FollowEntity } from './follow.entity';
import { ProfileType } from './types/profile.type';
import { IProfileResponse } from './types/profileResponse.type';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(FollowEntity)
    private readonly followRepository: Repository<FollowEntity>,
  ) {}

  async getProfileByUsername(
    username: string,
    currentUserId: number,
  ): Promise<ProfileType> {
    const user = await this.userRepository.findOne({ username });
    if (!user) {
      throw new HttpException('Profile not exist', HttpStatus.NOT_FOUND);
    }

    const follow = await this.followRepository.findOne({
      followerId: currentUserId,
      followingId: user.id,
    });

    return { ...user, following: !!follow };
  }

  async follow(username: string, currentUserId: number): Promise<ProfileType> {
    const user = await this.userRepository.findOne({ username });
    if (!user) {
      throw new HttpException('Profile not exist', HttpStatus.NOT_FOUND);
    }
    if (currentUserId === user.id) {
      throw new HttpException(
        'Follower and following cant be equal',
        HttpStatus.BAD_REQUEST,
      );
    }

    const follow = await this.followRepository.findOne({
      followerId: currentUserId,
      followingId: user.id,
    });

    if (!follow) {
      const followToCreate = new FollowEntity();
      followToCreate.followerId = currentUserId;
      followToCreate.followingId = user.id;
      await this.followRepository.save(followToCreate);
    }

    return { ...user, following: true };
  }

  async unfollow(username: string, currentUserId: number): Promise<any> {
    const user = await this.userRepository.findOne({ username });
    if (!user) {
      throw new HttpException('Profile not exist', HttpStatus.NOT_FOUND);
    }
    if (currentUserId === user.id) {
      throw new HttpException(
        'Follower and following cant be equal',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.followRepository.delete({
      followerId: currentUserId,
      followingId: user.id,
    });

    return { ...user, following: false };
  }

  buildProfileResponse(profile: ProfileType): IProfileResponse {
    delete profile.email;
    return { profile };
  }
}
