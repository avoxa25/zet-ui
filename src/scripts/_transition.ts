class Transition {
    private readonly screenAuth = document.querySelector(`#screenAuth`) as HTMLElement;
    private readonly screenRegistration = document.querySelector(`#screenRegistration`) as HTMLElement;
    private readonly screenRestore = document.querySelector(`#screenRestore`) as HTMLElement;

    private readonly buttons = document.querySelectorAll(`.button-transition`) as NodeListOf<HTMLElement>;

    constructor() {
        this.buttons.forEach(b => b.addEventListener(`click`, () => this.ChangeScreen(b.dataset.target)));
    }

    ChangeScreen(screenName: string | undefined): void {
        const currentScreen = document.querySelector(`.active`) as HTMLElement;
        const newScreen = this.DetectScreen(screenName);

        if (newScreen != null) {
            newScreen.hidden = false;

            if (newScreen.classList.contains(`to-left`) || newScreen.classList.contains(`to-right`)) {
                newScreen.classList.contains(`to-left`) ? newScreen.classList.remove(`to-left`) : newScreen.classList.remove(`to-right`);
            } else {
                currentScreen.classList.add(Math.random() > 0.5 ? `to-left` : `to-right`);
                currentScreen.classList.remove(`active`);
            }
            newScreen.classList.add(`active`);
            setTimeout(() => currentScreen.hidden = true, 1000);
        }
    }

    DetectScreen(screenName: string | undefined): HTMLElement | null {
        switch (screenName) {
            case `auth`:
                return this.screenAuth;
            case `registration`:
                return this.screenRegistration;
            case `restore`:
                return this.screenRestore;
            default:
                return null;
        }
    }
}

(window as any).auth = new Transition();