export class Customer {
    public id: string;
    public document: number;
    public name: string;

    constructor(id, doc, name) {
        this.id = id
        this.document = doc
        this.name = name
    }
}