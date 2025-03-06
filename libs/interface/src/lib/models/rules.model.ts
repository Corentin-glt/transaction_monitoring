import { ScenarioModel } from './scenarios.model';

export interface RuleModel {
  id: string;
  name: string;
  jsonLogic: any;

  scenarios?: ScenarioModel[];

  createdAt: Date;
  updatedAt?: Date;
}
