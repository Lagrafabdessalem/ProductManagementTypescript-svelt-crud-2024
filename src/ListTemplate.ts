import FullList from "./model/FullList";

interface DOMList {
    ul: HTMLUListElement,
    clear(): void,
    render(fullList: FullList): void
}

export default class ListTemplate implements DOMList {
    static instance: ListTemplate = new ListTemplate();
    ul: HTMLUListElement;

    private constructor() {
        this.ul = document.getElementById("listItems") as HTMLUListElement;
    }

    clear(): void {
        this.ul.innerHTML = '';
    }

    render(fullList: FullList): void {
        this.clear();
        fullList.list.forEach(product => {
            const li = document.createElement('li') as HTMLLIElement;
            li.className = "product";
            li.style.listStyleType = 'none'; // Ensures no bullets are shown, though this should be unnecessary if the container is styled properly

            // Create and configure checkbox
            const check = document.createElement("input") as HTMLInputElement;
            check.type = "checkbox";
            check.id = product.id;
            check.tabIndex = 0;
            check.checked = product.checked;
            li.append(check);
            check.addEventListener("change", () => {
                product.checked = !product.checked;
                fullList.save();
            });

            // Create and configure label
            const label = document.createElement("label") as HTMLLabelElement;
            label.htmlFor = product.id;
            label.textContent = product.product;
            li.append(label);

            // Create and configure remove button with Font Awesome icon
            const button = document.createElement("button") as HTMLButtonElement;
            button.className = "button remove-button";
            button.innerHTML = '<i class="fas fa-trash"></i>'; // Font Awesome trash icon
            li.append(button);

            button.addEventListener("click", () => {
                fullList.removeProduct(product.id);
                this.render(fullList);
            });

            this.ul.append(li);
        });
    }
}
