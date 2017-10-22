import {Status} from '../enum/status';

export class Campaign {
	campaignId: number;
	campaignName: string;
	campaignStatus: Status;
	campaignType: number;
	advertiserRate: number;
	advertiserCurrency: string;
	campaignCategory: number;
	campaignTrackingLink: string;
	advertiserInstallRate: number;
	advertiserLeadRate: number;
	advertiserSaleRate: number;
	advertiserCustomRate: number;
	campaignSubCategories: object;
	dailyBudget: number;
	totalBudget: number;
	dailyCap: number;
	totalCap: number;
	campaignTargetingDeviceType: any;
	campaignTargetingOs: any;
	campaignTargetingSource: any;
	updatedOn: Date;
	campaignStartDate: Date;
	campaignEndDate: Date;
}
