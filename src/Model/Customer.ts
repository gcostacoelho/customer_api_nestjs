export class Customer {
    public id: string;
    public document: number;
    public name: string;

    constructor() { }

    validDocument(document: string) {
        return document.replace(/[a-z]|[-.]/gmi, "");
    }
}