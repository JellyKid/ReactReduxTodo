import React from 'react';
import { ListGroup } from 'react-bootstrap';
import TodoItem from './TodoItem';
import { connect } from 'react-redux';

import { toggleTodo } from '../redux/actions';

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.toggleAction = this.toggleAction.bind(this);
  }
  toggleAction(id){
    this.props.dispatch(toggleTodo(id));
  }
  render(){
    let todolist = this.props.todos.map((todo, i) => {
      let filter = this.props.visible;
      //calculate if item should be visible or not
      let visible = filter === 'All' ? 'show' : filter === 'Completed' && todo.complete ? 'show' : filter === 'Active' && !todo.complete ? 'show' : 'hidden';

      return <TodoItem content={todo.content} visible={visible} complete={todo.complete} toggleAction={() => this.toggleAction(i)} key={i} number={i}/>;
    });
    return (
      <ListGroup>
        {todolist}
      </ListGroup>
    );
  }
}

function mapStateToProps(state) {
  return {
    todos: state.todos,
    visible: state.visible
  };
}

export default connect(mapStateToProps)(TodoList);
