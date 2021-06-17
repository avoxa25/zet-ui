class Welcome {
    private readonly screen = document.querySelector('#screenWelcome') as HTMLElement;

    constructor() {
        window.addEventListener(`keydown`, (e)=> this.PressKey(e));
    }

    PressKey(event: KeyboardEvent): void {
        console.log(`123`)
        if(event.key == `Enter`) {
            this.screen.classList.add(`hide`);
            setTimeout(() => this.screen.hidden = true, 1000);
            console.log(`asd`)
        }
    }
}

(window as any).welcome = new Welcome();