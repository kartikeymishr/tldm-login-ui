export class DisplayMessage {
    isDisplayed: boolean;
    userId: string;

    constructor(isDisplayed: boolean, userId: string) {
        this.isDisplayed = isDisplayed;
        this.userId = userId;
    }
}