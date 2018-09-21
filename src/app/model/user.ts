export class User {
    userId: string;
    userName: string;
    phoneNumber: string;
    userMail: string;

    constructor(userId: string, userName: string, userMail: string) {
        this.userName = userName;
        this.userId = userId;
        this.userMail = userMail;
    }
}
