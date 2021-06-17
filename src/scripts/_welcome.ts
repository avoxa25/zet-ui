class Welcome {
    private readonly screen = document.querySelector('#screenWelcome') as HTMLElement;
    private readonly screenAuth = document.querySelector('#screenAuth') as HTMLElement;

    constructor() {
        window.addEventListener(`keydown`, (e)=> this.PressKey(e));
    }

    PressKey(event: KeyboardEvent): void {
        if(event.key == `Enter`) {
            this.screen.classList.add(`hide`);
            setTimeout(() => this.screen.hidden = true, 1000);
            this.screenAuth.classList.add(`active`);
        }
    }
}

(window as any).welcome = new Welcome();