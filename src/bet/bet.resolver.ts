import { Admin } from './../auth/admin.guard';
import { UpdateBetInput } from './dto/update-bet.input';
import { BetService } from './bet.service';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateBetInput } from './dto/create-bet.input';
import { UseGuards, Injectable, Scope, Inject } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/auth.guard';
import { Bet } from './bet.entity';
import { CONTEXT } from '@nestjs/graphql';

@Resolver()
@Injectable({ scope: Scope.REQUEST })
export class BetResolver {
  constructor(
    private betService: BetService,
    @Inject(CONTEXT) private context,
  ) {}
  //@Args significa que vai ter uma entreada de dados
  @UseGuards(GqlAuthGuard)
  @Mutation(() => [Bet])
  async createBet(
    @Args({ name: 'data', type: () => CreateBetInput })
    data: CreateBetInput,
  ): Promise<Bet[]> {
    const bet = await this.betService.createBet(data, this.context.req.user.id);
    return bet;
  }

  @UseGuards(GqlAuthGuard, Admin)
  @Mutation(() => Bet)
  async updateBet(
    @Args('id') id: number,
    @Args('data') data: UpdateBetInput,
  ): Promise<Bet> {
    const bet = await this.betService.updateBet(id, data);
    return bet;
  }

  @UseGuards(GqlAuthGuard, Admin)
  @Mutation(() => Boolean)
  async deleteBet(@Args('id') id: number): Promise<boolean> {
    const deleteUser = await this.betService.deleteBet(id);
    return deleteUser;
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Bet])
  async bets(): Promise<Bet[]> {
    const bets = await this.betService.findAllBets();
    return bets;
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Bet)
  async bet(@Args('id') id: number): Promise<Bet> {
    const bet = await this.betService.findById(id);
    return bet;
  }
}
