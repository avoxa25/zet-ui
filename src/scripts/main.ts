class Test {
    private readonly pElement = document.querySelector('#test') as HTMLParagraphElement;

    public setStyle(): void {
        this.pElement.style.color = `blue`;
        console.log(`Set style to blue`)
    }
}

(window as any).Test = new Test;