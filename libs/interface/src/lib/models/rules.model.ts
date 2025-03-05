import { ScenarioModel } from "./scenarios.model";

export interface RuleModel {
  id: string;
  name: string;
  jsonLogic: any;

  scenario: ScenarioModel;
  
  createdAt: Date;
  updatedAt?: Date;
}
