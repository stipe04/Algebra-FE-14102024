import { useState } from "react";

export default function GroceryAdd(){
    const [grocery, setGrocery] = useState("");

    function groceryChangeHandler(event){
        setGrocery(event.target.value);
    }

    function groceryAddHandler(){
        // spremiti grocery u globalno stanje
        groceriesStore.addGrocery(grocery);
        setGrocery("");

    }



    return(
        <>
        <label htmlFor="">Grocery</label>
        <input type="text" id="grocery" value={grocery}/>
        <button onClick={groceryAddHandler}>Add</button>
        
        </>
    )
}