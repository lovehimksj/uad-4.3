// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
      production: false,
      productionUrlFalse: 'http://ads.uahoy.in/uadtest/',
      productionUrlTrue: 'https://ads.uahoy.in/bi/',
      productionUrlLocal: 'http://192.168.29.201:8080/uadtest/',
      oAuth: 'oauth/token',
      addCampaign: 'addc/?',
      addCampaignCreative: 'acc/?',
      addAdvertiserRawCreative: 'addarc/?',
      getAdvertiserCampaigns: 'getac/?',
      getCampaign: 'getc/?',
      getMappedCampaign: 'getamc/?',
      getAdvertiserCreatives: 'getarc/?',
      categoryList: 'categorylist.json',
      getCampaignCreatives: 'getcc/?',
      renderAdvertiserCreative: 'renderarc/?',
      renderAdvertiserCampaignCreative: 'rendercc/?',
      updateStatus: 'us/?',
      updateCampaign: 'uc/?',
      updateCampaignCreative: 'ucc/?',
      getAdvertiserProfile: 'a/?',
      updateAdvertiserDetail: 'ua/?',
      updatePassword: 'upass/?',
      getPublishers: 'getp/?',
      getPublisherProperties: 'getpp/?',
      getPropertyAbilities: 'getpa/?',
      getDashboardCampaigns: 'getdc/?',
      getPropertyCampaigns: 'acfp/?',
      getAdvertiserCampaignAvailableProperties: 'apfc/?',
      updateCampaignForProperty: 'ucfp/?',
      updatePropertyForCampaign: 'upfc/?',
      addPublisher: 'addp/?',
      addAdvertiser: 'adda/?',
      getAdvertiser: 'geta/?',
      editAdPubStatus: 'us/?',
      addPropertyForPublisher: 'addpfp/?',
      updatePublisherProperty: 'upp/?',
      updatePublisherPropertyAbility: 'us/?',
      addPropertyAbility: 'addpa/?',
      editPublisher: 'up/?',
      getReport: 'gr/?',
      downloadReport: 'dr/?',
      createReport: 'cr/?'};

