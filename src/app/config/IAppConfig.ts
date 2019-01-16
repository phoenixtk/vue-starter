export interface IAppConfig {
  api: {
    mockUrl: string;
    baseUrl: string;
    privateKey: string;
  };
  features: {
    disableParticles: boolean,
  };
}
