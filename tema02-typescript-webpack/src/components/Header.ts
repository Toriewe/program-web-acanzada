export class Header {
    constructor(public title: string) {}

    //metodo para mostrar lo que este dentro
    render(): string {
        return `<h1>${this.title}</h1>`
    }
}
