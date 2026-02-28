import {action, computed, makeObservable, observable} from "mobx"

class GroceryStore {

    groceries = [];

    constructor (){
        makeObservable(this, {
            groceries: observable,
            getGroceries: computed,
            addGrocery: action,
            deleteGrocery: action
        });
    }

    get getGroceries (){
        return this.groceries;
    }

    addGrocery(grocery){
        this.groceries.push(grocery);

    }

    deleteGrocery(grocery){
        this.groceries.remove(grocery);

    }
    
    

}

export default groceriesStore = new GrocerieStore()