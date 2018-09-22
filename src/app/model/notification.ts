export class Notification {
    isActive: boolean;
    userId: string;

    constructor(isActive: boolean, userId: string) {
        this.isActive = isActive;
        this.userId = userId;
    }
}
