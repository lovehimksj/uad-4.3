export class AccessToken {
  userId: number;
  username: string;
  scope: string;
  refreshToken: string;
  accessToken: string;
  tokenType: string;
  expiresIn: number;
  issued: Date;
  expires: Date;
}
