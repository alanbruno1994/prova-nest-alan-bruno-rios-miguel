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
  constructor(private gameService: GameService) {}
  //@Args significa que vai ter uma entreada de dados
  @UseGuards(GqlAuthGuard, Admin)
  @Mutation(() => Game)
  async createGame(@Args('data') data: CreateGameInput): Promise<Game> {
    const game = await this.gameService.creatGame(data);
    return game;
  }

  @UseGuards(GqlAuthGuard, Admin)
  @Mutation(() => Game)
  async updateGame(
    @Args('id') id: number,
    @Args('data') data: UpdateGameInput,
  ): Promise<Game> {
    const game = await this.gameService.updateGame(id, data);
    return game;
  }

  @UseGuards(GqlAuthGuard, Admin)
  @Mutation(() => Boolean)
  async deleteGame(@Args('id') id: number): Promise<boolean> {
    const deleteGame = await this.gameService.deleteGame(id);
    return deleteGame;
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Game])
  async games(): Promise<Game[]> {
    const games = await this.gameService.findAllGame();
    return games;
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Game)
  async game(@Args('id') id: number): Promise<Game> {
    const game = await this.gameService.findById(id);
    return game;
  }
}
