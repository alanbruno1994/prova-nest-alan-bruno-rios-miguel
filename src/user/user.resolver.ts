import { UpdateUserInput } from './dto/update-user.input';
import { User } from './user.entity';
import { UserService } from './user.service';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from './dto/create-user.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/auth.guard';
import { Admin } from 'src/auth/admin.guard';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}
  //@Args significa que vai ter uma entreada de dados
  @Mutation(() => User)
  async createUser(@Args('data') data: CreateUserInput): Promise<User> {
    const user = await this.userService.createUser(data);
    return user;
  }

  @UseGuards(GqlAuthGuard, Admin)
  @Mutation(() => User)
  async createUserAdmin(@Args('data') data: CreateUserInput): Promise<User> {
    const user = await this.userService.createUserAdmin(data);
    return user;
  }

  @UseGuards(GqlAuthGuard, Admin)
  @Mutation(() => User)
  async updateUser(
    @Args('id') id: number,
    @Args('data') data: UpdateUserInput,
  ): Promise<User> {
    const user = await this.userService.updateUser(id, data);
    return user;
  }
  @UseGuards(GqlAuthGuard, Admin)
  @Mutation(() => Boolean)
  async deleteUser(@Args('id') id: number): Promise<boolean> {
    const deleteUser = await this.userService.deleteUser(id);
    return deleteUser;
  }

  @UseGuards(GqlAuthGuard, Admin)
  @Query(() => [User])
  async users(): Promise<User[]> {
    const users = await this.userService.findAllUsers();
    return users;
  }

  @UseGuards(GqlAuthGuard, Admin)
  @Query(() => User)
  async user(@Args('id') id: number): Promise<User> {
    const user = await this.userService.findById(id);
    return user;
  }
}
