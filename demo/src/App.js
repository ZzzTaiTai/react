import React from 'react';
// import logo from './logo.svg';
import './App.css';
let curAry = [];
const GameArray = [];
let winnerLocation= [];
function initAry(){
  for(let i = 0;i<10;i++){
    if(i%3 === 0 && curAry.length !== 0) {
      GameArray.push(curAry);
      curAry = []
    };
    curAry.push(i+1);
  }
}
initAry();
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      winnerLocation = lines[i];
      return squares[a];
    }
  }
  return null;
}

function Square(props){
  if(winnerLocation.includes(props.index-1)){
    return (
      <button className="square red" 
        onClick={() => props.onClick()}
        >
          {props.value}
      </button>
    )
  }else{
    return (
      <button className="square" 
        onClick={() => props.onClick()}
        >
          {props.value}
      </button>
    )
  }
  
}

class Board extends React.Component {
  constructor(props){
    super(props);
  }
  renderSquare(i,index){
      return (
        <Square 
          index = {i}
          value={this.props.squares[i-1]} 
          key={index}
          onClick={() => this.props.onClick(i)}
        />
      )
  
    
  }
  render(){
    return(
      <div>
        {GameArray.map((item,index) => {
        return (
          <div className="board-row" key={index}>
            {
              item.map((list)=>{
                return (this.renderSquare(list,list.toString()+index.toString()))
              })
            }
          </div>
        )
    })}
      </div>
    )
  }
   
}
class Game extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      history:[{
        squares:Array(9).fill(null)
      }],
      stepNumber:0,
      xIsNext:true
    }
  }
  handleClick(i){
    const history = this.state.history.slice(0,this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if(calculateWinner(squares) || squares[i]){
      return 
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history:history.concat([{squares:squares}]),
      xIsNext:!this.state.xIsNext,
      stepNumber:history.length
    })
  }
  jumpTo(step){
    winnerLocation = [];
    this.setState({
      stepNumber:step,
      xIsNext:(step%2) === 0 
    })
  }
  render(){
    let status;
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const moves = history.map((step,move)=>{
      const desc = move ? 
      "Go to move #" + move :
      "Go to game start";
      
      if(move+1 === history.length){
        return(
          <li key={move} >
            <button style={{fontWeight:700,fontSize:16+'px'}} onClick={()=>{this.jumpTo(move)}}>{desc}</button>
          </li>
        )
      }else{
        return(
          <li key={move}>
            <button onClick={()=>{this.jumpTo(move)}}>{desc}</button>
          </li>
        )
      }
    })
    if(winner){
      status = "Winner:"+ winner;
    }else{
      status = "Next player:" + (this.state.xIsNext ? 'X' : 'O');
    } 
    return(
      <div>
        <div>
          <Board 
            squares={current.squares}  
            onClick={(i)=> this.handleClick(i-1)} 
          />
        </div>
        <div className="gameiNfo">
          <div className="status">{status}</div>
          <div className="status">{moves}</div>
        </div>
      </div>
      )
  }
}

// const scaleNames = {
//   c: 'Celsius',
//   f: 'Fahrenheit'
// }

// function toCelsius(fahrenheit) {
//   return (fahrenheit - 32) * 5 / 9;
// }

// function toFahrenheit(celsius) {
//   return (celsius * 9 / 5) + 32;
// }

// function tryConvert(temp,convert){
//   const input = parseFloat(temp);
//   if(Number.isNaN(input)){
//     return ''
//   }
//   const output = convert(input);
//   const rounded = output.toFixed(3);
//   return rounded
// }

// function BoilingVerdict(props){
//   if(props.celsius >=100){
//     return <p>The water would boil.</p>
//   }else{
//     return <p>The water would not boil.</p>
//   }
// }

// class TemperatureInput extends React.Component {
//   constructor(props){
//     super(props);
//     this.handleChange = this.handleChange.bind(this);
//   }
//   handleChange(e){
//     this.props.onTemperatureChange(e.target.value)
//   }
//   render(){
//     const temperature = this.props.temperature;
//     const scale = this.props.scale;
//     return (
//       <fieldset>
//         <legend>Enter temperature in {scaleNames[scale]}:</legend>
//         <input value={temperature} onChange={this.handleChange} />
//       </fieldset>
//     )
//   }
// }

// class Calculator extends React.Component {
//   constructor(props){
//     super(props);
//     this.hanldetoCelsiusChange = this.hanldetoCelsiusChange.bind(this);
//     this.hanldetoFahrenheitChange = this.hanldetoFahrenheitChange.bind(this);
//     this.state = {temperature:'',scale:'c'}
//   }
//   hanldetoCelsiusChange(temperature){
//     this.setState({scale:'c',temperature})
//   }
//   hanldetoFahrenheitChange(temperature){
//     this.setState({scale:'f',temperature})
//   }
//   render(){
//     const scale = this.state.scale;
//     const temperature = this.state.temperature;
//     const celsius = scale === 'f' ? tryConvert(temperature,toCelsius) : temperature;
//     const fahrenheit = scale === 'c' ? tryConvert(temperature,toFahrenheit) : temperature;
//     return (
//       <div>
//         <TemperatureInput scale='c' temperature={celsius} onTemperatureChange={this.hanldetoCelsiusChange} />
//         <TemperatureInput scale='f' temperature={fahrenheit} onTemperatureChange={this.hanldetoFahrenheitChange}/>
//         <BoilingVerdict celsius={parseFloat(celsius)} />
//       </div>
//     )
//   }
// }


class App extends React.Component {
  render(){
    return(
      <Game />
    )
  }
}

export default App;
