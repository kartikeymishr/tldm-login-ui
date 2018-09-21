export class User {
    userId: string;
    userName: string;
    phoneNumber: string;
    userMail: string;

    constructor(userId: string, userMail: string) {
        this.userId = userId;
        this.userMail = userMail;
    }
}
