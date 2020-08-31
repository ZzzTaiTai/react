
import React from 'react';
import '../css/todolist.scss'


class SearchInput extends React.Component {
  constructor(props){
    super(props);

  }
  handleChange(e){
    if(e.keyCode !== 13)return
    this.props.onTodoTextEnter(e.target.value);
    e.target.value = "";
  }
  render(){
    return(
      <input type="text" className="todoInput" placeholder='Add Todo...' onKeyDown={(e)=>{this.handleChange(e)}}/>
    )
  }
} 



class TodoList extends React.Component {
  constructor(props){
    super(props)
  }
  render(){
    const lists = this.props.list;
    const doingLen = lists.filter( item => !item.isDone).length;
    const doneLen = lists.filter( item => item.isDone).length;
    return (
      <div>
          <div className="doing">
            <div className="head">
              <h2 className="title">正在进行</h2>
              <i className="total">{doingLen}</i>
            </div>
            <ul>
              {
                lists.map((item,index) => {
                    if(!item.isDone){
                      return(
                        <li onClick={() => { this.props.changeTodo(index) }} key={item.value + index.toString()}>
                          <input type="checkbox" />
                          <p>{item.value}</p>
                          <i className="icon"></i>
                        </li>
                      )
                    }else{
                      return
                    }
                })
              }
            </ul>
          </div>
          <div className="done">
            <div className="head">
              <h2 className="title">已经完成</h2>
              <i className="total">{doneLen}</i>
            </div>
            <ul>
              {
                lists.map((item,index) => {
                    if(item.isDone){
                      return(
                        <li className="done" onClick={() => { this.props.changeTodo(index) }} key={item.value + index.toString()}>
                          <input type="checkbox" checked />
                          <p>{item.value}</p>
                          <i className="icon"></i>
                        </li>
                      )
                    }else{
                      return
                    }
                })
              }
            </ul>
          </div>
      </div>
    )
  }
}

// class DoneTodo extends React.Component {
//   constructor(props){
//     super(props)
//   }

//   render(){
//     return (

//     )
//   }
// }




class Todo extends React.Component {
  constructor(props){
    super(props);
    this.state={
      todoAry:[],
    }
  }

  handleAddTodo(value){
    const newAry = this.state.todoAry.slice(0);
    newAry.unshift({value:value,isDone:false})
    this.setState({
      todoAry:newAry
    })
  }
  changeTodo(index){
    console.log(this.state.todoAry)
    let newAry = this.state.todoAry.slice(0);
    newAry[index].isDone = !newAry[index].isDone;
    this.setState({
      todoAry:newAry
    })
  }
  render(){
    return (
      <div className="todo">
        <header>
          <section className="sectionBox"> 
            <h2 className="title">Todo</h2>
            <SearchInput onTodoTextEnter={(e) => this.handleAddTodo(e)} />
          </section>
        </header>
        <section className="list" >
          <TodoList list={this.state.todoAry} changeTodo={(index) => {this.changeTodo(index)}}/>
        </section>
      </div>
      
    )
  }
}

export default Todo