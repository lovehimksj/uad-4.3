export class UserLogin {
	username: string;
	password: string;
	newPassword: string;
	otp: string;

	constructor(username?: string, password?: string, otp?: string, newPassword?: string) {
		this.username = username;
		this.password = password;
		this.newPassword = newPassword;
		this.otp = otp;
	}
}
export class ForgotPassword {
	username: string;
	newPassword: string;
	otp: string;

	constructor(username?: string, otp?: string, newPassword?: string) {
		this.username = username;
		this.newPassword = newPassword;
		this.otp = otp;
	}
}
