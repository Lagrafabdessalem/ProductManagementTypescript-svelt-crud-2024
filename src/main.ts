import './css/style.css'


import FullList from './model/FullList'
import { ListProduct } from './model/ListProduct'
import ListTemplate from './ListTemplate'


const initApp = (): void => {
  const fullList = FullList.instance
  const template = ListTemplate.instance
  const productEntryForm = document.getElementById("productEntryForm") as HTMLFormElement
  productEntryForm.addEventListener("submit", (event: SubmitEvent): void => {
    event.preventDefault()

    const input = document.getElementById("newProduct") as HTMLButtonElement;
     const newEntryText: string = input.value.trim()
     if(!newEntryText.length) return
     const productId: number = fullList.list.length
     ? parseInt(fullList.list[fullList.list.length -1].id) + 1
      : 1
     const newProduct = new ListProduct(productId.toString(), newEntryText)

     fullList.addProduct(newProduct)
     template.render(fullList)
  } )


  const clearProducts = document.getElementById("clearProductsButton") as HTMLButtonElement

  clearProducts.addEventListener("click", ():void => {
    fullList.clearList()
    template.clear()
  })

  fullList.load()
  template.render(fullList)
}


document.addEventListener("DOMContentLoaded", initApp)