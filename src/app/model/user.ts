export class User {
    userId: string;
    password: string;
    userName: string;
    phoneNumber: string;
    userMail: string;

    constructor(userId: string, userName: string, password: string, userMail: string) {
        this.userId = userId;
        this.userName = userName;
        this.password = password;
        this.userMail = userMail;
    }
}
