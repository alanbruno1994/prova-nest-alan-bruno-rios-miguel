import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { GqlExecutionContext, Args } from '@nestjs/graphql';
import { AccessprofileService } from 'src/accessprofile/accessprofile.service';

@Injectable()
export class Admin implements CanActivate {
  constructor(private access: AccessprofileService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const user = ctx.getContext().req.user;
    let access = await this.access.findById(user.id);
    if (access.level === 'client') {
      throw new ForbiddenException('Account is not admin!');
    }
    return true;
  }
}
