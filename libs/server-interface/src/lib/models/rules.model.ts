import { ScenarioModel } from "./scenarios.model";

export interface RuleModel {
  id: string;
  name: string;
  jsonLogic: JSON;

  scenario: ScenarioModel;
  
  createdAt: Date;
  updatedAt?: Date;
}
