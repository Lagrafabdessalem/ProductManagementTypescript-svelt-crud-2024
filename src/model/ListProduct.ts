export interface Product {
    id: string,
    product: string,
    checked: boolean
}

export class ListProduct implements Product {
    constructor (
        private _id:string = '',
        private _product: string =  '',
        private _checked: boolean =  false
    ) {}

    get id(): string {
        return this._id;
    }

    set id(id: string) {
        id = this._id;
    }

    get product(): string {
        return this._product;
    }

    set product(product: string) {
        product = this._product;
    }

    get checked(): boolean {
        return this._checked;
    }

    set checked(checked: boolean) {
        checked = this.checked;
    }
}