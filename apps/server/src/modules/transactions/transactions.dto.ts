import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Transaction {
  @Field(() => ID)
  public id: string;
}
