import { RuleModel } from './rules.model';

export interface ScenarioModel {
  id: string;
  name: string;
  isEnabled: boolean;

  rules?: RuleModel[];

  createdAt: Date;
  updatedAt?: Date;
}
