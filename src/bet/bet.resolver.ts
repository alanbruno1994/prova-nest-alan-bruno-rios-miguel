import { UpdateBetInput } from './dto/update-bet.input';
import { BetService } from './bet.service';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateBetInput } from './dto/create-bet.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/auth.guard';
import { Bet } from './bet.entity';

@Resolver()
export class BetResolver {
  constructor(private betService: BetService) {}
  //@Args significa que vai ter uma entreada de dados
  @Mutation(() => Bet)
  async createGame(@Args('data') data: CreateBetInput): Promise<Bet[]> {
    const bet = await this.betService.createBet(data);
    return bet;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Bet)
  async updateUser(
    @Args('id') id: number,
    @Args('data') data: UpdateBetInput,
  ): Promise<Bet> {
    const bet = await this.betService.updateBet(id, data);
    return bet;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  async deleteUser(@Args('id') id: number): Promise<boolean> {
    const deleteUser = await this.betService.deleteBet(id);
    return deleteUser;
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Bet])
  async users(): Promise<Bet[]> {
    const bets = await this.betService.findAllBets();
    return bets;
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Bet)
  async user(@Args('id') id: number): Promise<Bet> {
    const bet = await this.betService.findById(id);
    return bet;
  }
}
