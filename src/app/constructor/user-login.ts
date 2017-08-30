import sha256 from 'crypto-js/sha256';
export class UserLogin {
  username: string;
  password: string;
  constructor(username?: string, password?: string) {
    this.username = username;
    this.password =  sha256(password).toString();
  }
}
