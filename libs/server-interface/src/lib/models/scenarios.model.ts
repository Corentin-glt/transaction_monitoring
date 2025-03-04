export interface ScenarioModel {
  id: string;
  name: string;
  isEnabled: boolean;

  createdAt: Date;
  updatedAt?: Date;
}
