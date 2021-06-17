class Auth {
    private readonly screenAuth = document.querySelector(`#screenAuth`) as HTMLElement;
    private readonly screenRegistration = document.querySelector(`#screenRegistration`) as HTMLElement;
    private readonly screenRestore = document.querySelector(`#screenRestore`) as HTMLElement;

    private readonly buttonRegistration = document.querySelector(`#buttonRegistration`) as HTMLElement;
    private readonly buttonRestore = document.querySelector(`#buttonRestore`) as HTMLElement;

    constructor() {
        this.buttonRegistration.addEventListener(`click`, () => this.ChangeScreen(`registration`));
        this.buttonRestore.addEventListener(`click`, () => this.ChangeScreen(`restore`));
    }

    ChangeScreen(screenName: string): void {
        this.UnhideScreen(screenName);
        this.screenAuth.classList.add(`to-left`);
    }

    UnhideScreen(screenName: string): void {
        switch (screenName) {
            case `registration`:
                this.screenRegistration.hidden = false;
                break;
            case `restore`:
                this.screenRestore.hidden = false;
                break;
        }
    }
}

(window as any).auth = new Auth();