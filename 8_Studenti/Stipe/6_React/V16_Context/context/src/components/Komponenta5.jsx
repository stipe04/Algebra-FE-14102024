import React from "react";
import { Consumer } from "../context/context";
import Context from "../context/context";

export default class Komponeta5 extends React.Component{
    static contextType = Context;
    render(){
        const {text} = this.context;
        return(
            <>
              <h2>Komponeta5</h2>
              <Consumer>
                {ctx => <p>{ctx.text}</p>}
              </Consumer>
              <p>{text}</p>
            </>
        );
    }
}