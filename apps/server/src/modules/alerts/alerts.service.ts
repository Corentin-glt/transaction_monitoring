import { Injectable } from '@nestjs/common';
import {
  AlertEntity,
  AlertsDbService,
} from '@transaction-monitoring/db-driver';
import {
  AlertModel,
  AlertStatus,
  Sorting,
  TransactionModel,
} from '@transaction-monitoring/interface';

interface UpdateAlertParams {
  status: AlertStatus;
}

interface FindAlertsParams {
  ids?: string[];
  name?: string;
}

interface FindOptions {
  limit?: number;
  offset?: number;
  sorting?: SortingOptions;
}

interface SortingOptions {
  createdAt?: Sorting;
}

@Injectable()
export class AlertsService {
  constructor(
    private readonly alertsDbService: AlertsDbService
  ) {}

  #buildFormat(alert: AlertEntity): AlertModel {
    return alert;
  }

  async getAlertById(id: string): Promise<AlertModel> {
    const alert = await this.alertsDbService.getAlertById(
      id
    );
    return this.#buildFormat(alert);
  }

  async updateAlert(
    id: string,
    params: UpdateAlertParams
  ): Promise<AlertModel> {
    const alert = await this.alertsDbService.updateAlert(
      id,
      params
    );
    return this.#buildFormat(alert);
  }

  async findAlerts(
    params: FindAlertsParams,
    options?: FindOptions
  ) {
    const alerts = await this.alertsDbService.getAlerts(
      params,
      options
    );

    return alerts.map((t) => this.#buildFormat(t));
  }

  async countAlerts(params: FindAlertsParams) {
    return this.alertsDbService.getCountAlerts(params);
  }

  async getAlertTransactions(
    id: string
  ): Promise<TransactionModel[]> {
    return this.alertsDbService.getAlertTransactions(id);
  }
}
