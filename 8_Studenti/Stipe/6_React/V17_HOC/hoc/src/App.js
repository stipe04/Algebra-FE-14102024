import logo from './logo.svg';
import './App.css';

function MyButton(props){
  return <button{...props}></button>
}

function withColor(Element){
  return function({boja, ...otherProps}){
    return <Element {...otherProps} style={{backgroundColor: boja}}/>;
  }
}

const ColorElement = withColor(MyButton)

function App() {
  return (
    <div className="App">
      <h1 style={styles.h1stil}>Hello</h1>
      <h2 style={{color: "yellow", backgroundColor: "green"}}>Hello again</h2>
      <ColorElement boja="red">Bok ja sam crven</ColorElement>
      <ColorElement boja="green">Bok ja sam Zelen</ColorElement>
      
    </div>
  );
}

export default App;

const styles = {
  h1stil: {
    color: "blue",
    backgroundColor: "lightGray",
  },
}
