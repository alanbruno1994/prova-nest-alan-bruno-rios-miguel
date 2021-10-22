import { UpdateAccessProfileInput } from './dto/update-access-profile.input';
import { AccessprofileService } from './accessprofile.service';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateAccessProfileInput } from './dto/create-acess-profile.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/auth.guard';
import { AcessProfile } from './accessprofile.entity';

@Resolver()
export class AccessprofileResolver {
  constructor(private accessService: AccessprofileService) {}
  //@Args significa que vai ter uma entreada de dados
  @Mutation(() => AcessProfile)
  async createGame(
    @Args('data') data: CreateAccessProfileInput,
  ): Promise<AcessProfile> {
    const access = await this.accessService.createAccessProfile(data);
    return access;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => AcessProfile)
  async updateUser(
    @Args('id') id: number,
    @Args('data') data: UpdateAccessProfileInput,
  ): Promise<AcessProfile> {
    const access = await this.accessService.updateAccessProfile(id, data);
    return access;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  async deleteUser(@Args('id') id: number): Promise<boolean> {
    const deleteUser = await this.accessService.deleteAccessProfile(id);
    return deleteUser;
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [AcessProfile])
  async users(): Promise<AcessProfile[]> {
    const access = await this.accessService.findAllAccessProfile();
    return access;
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => AcessProfile)
  async user(@Args('id') id: number): Promise<AcessProfile> {
    const access = await this.accessService.findById(id);
    return access;
  }
}
