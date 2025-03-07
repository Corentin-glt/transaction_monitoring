import { ScenarioModel } from './scenarios.model';

export interface RuleModel {
  id: string;
  name: string;
  jsonLogic: any;
  isAggregate: boolean;
  scenarios?: ScenarioModel[];

  createdAt: Date;
  updatedAt?: Date;
}
