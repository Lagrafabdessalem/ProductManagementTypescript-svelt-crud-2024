import { ListProduct } from "./ListProduct";

interface List {
    list: ListProduct[],
    load(): void,
    save(): void,
    clearList(): void,
    addProduct(productObj: ListProduct): void,
    removeProduct(id: string): void
}

export default class FullList implements List {
    static instance: FullList = new FullList();

    private constructor(private _list: ListProduct[] = []){}
        get list(): ListProduct[] {
            return this._list; 
        }
  

        load(): void {
            const storedProduct: string | null = localStorage.getItem("myList");
            if(typeof storedProduct !== "string") return;
            const parsedList: {_id: string, _product: string, checked: boolean}[] = 
            JSON.parse(storedProduct) ;


            parsedList.forEach(productObj => {
                const newListProduct = new ListProduct(productObj._id, productObj._product, productObj.checked)
                FullList.instance.addProduct(newListProduct);
            })
        }   

        save(): void {
            localStorage.setItem("myList", JSON.stringify(this._list))
        }

        clearList(): void {
            this._list = []
            this.save()
        }

        addProduct(productObj: ListProduct): void {
            this._list.push(productObj);
            this.save(); 
         }

         removeProduct(id: string): void {
            this._list = this._list.filter(product => product.id !== id)
            this.save()
         }
    
}