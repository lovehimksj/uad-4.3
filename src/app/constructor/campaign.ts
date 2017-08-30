import {Status} from '../enum/status';

export class Campaign {
  campaignId: number;
  campaignName: string;
  type: number;
  rate: number;
  dailyBudget: number;
  totalBudget: number;
  dailyCap: number;
  totalCap: number;
  status: Status;
  advertiserInstallRate: number;
  advertiserLeadRate: number;
  advertiserSaleRate: number;
  advertiserCustomRate: number;
  advertiserCurrency: string;
  campaignTrackingLink: string;
  campaignCategory: number;
  campaignTargetingDeviceType: any;
  campaignTargetingOs: any;
  campaignTargetingSource: any;
  updatedOn: Date
}
