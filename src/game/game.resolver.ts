import { UpdateGameInput } from './dto/update-game.input';
import { GameService } from './game.service';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateGameInput } from './dto/create-game.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/auth.guard';
import { Game } from './game.entity';

@Resolver()
export class GameResolver {
  constructor(private userService: GameService) {}
  //@Args significa que vai ter uma entreada de dados
  @Mutation(() => Game)
  async createGame(@Args('data') data: CreateGameInput): Promise<Game> {
    const user = await this.userService.creatGame(data);
    return user;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Game)
  async updateUser(
    @Args('id') id: number,
    @Args('data') data: UpdateGameInput,
  ): Promise<Game> {
    const user = await this.userService.updateGame(id, data);
    return user;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  async deleteUser(@Args('id') id: number): Promise<boolean> {
    const deleteUser = await this.userService.deleteGame(id);
    return deleteUser;
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Game])
  async users(): Promise<Game[]> {
    const users = await this.userService.findAllGame();
    return users;
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Game)
  async user(@Args('id') id: number): Promise<Game> {
    const user = await this.userService.findById(id);
    return user;
  }
}
