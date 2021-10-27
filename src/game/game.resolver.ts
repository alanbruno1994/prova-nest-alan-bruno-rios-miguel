import { UpdateGameInput } from './dto/update-game.input';
import { GameService } from './game.service';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateGameInput } from './dto/create-game.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/auth.guard';
import { Game } from './game.entity';
import { Admin } from '../auth/admin.guard';

@Resolver()
export class GameResolver {
  constructor(private userService: GameService) {}
  //@Args significa que vai ter uma entreada de dados
  @UseGuards(GqlAuthGuard, Admin)
  @Mutation(() => Game)
  async createGame(@Args('data') data: CreateGameInput): Promise<Game> {
    const user = await this.userService.creatGame(data);
    return user;
  }

  @UseGuards(GqlAuthGuard, Admin)
  @Mutation(() => Game)
  async updateGame(
    @Args('id') id: number,
    @Args('data') data: UpdateGameInput,
  ): Promise<Game> {
    const user = await this.userService.updateGame(id, data);
    return user;
  }

  @UseGuards(GqlAuthGuard, Admin)
  @Mutation(() => Boolean)
  async deleteGame(@Args('id') id: number): Promise<boolean> {
    const deleteUser = await this.userService.deleteGame(id);
    return deleteUser;
  }

  @UseGuards(GqlAuthGuard, Admin)
  @Query(() => [Game])
  async games(): Promise<Game[]> {
    const users = await this.userService.findAllGame();
    return users;
  }

  @UseGuards(GqlAuthGuard, Admin)
  @Query(() => Game)
  async game(@Args('id') id: number): Promise<Game> {
    const user = await this.userService.findById(id);
    return user;
  }
}
