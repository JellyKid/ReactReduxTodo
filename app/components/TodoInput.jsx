import React from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import { addTodo } from '../redux/actions';

class TodoInput extends React.Component {
  constructor(props) {
    super(props);
    this.submitTodo = this.submitTodo.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);

    this.state = {
      input: ""
    };
  }
  handleTextChange(e){
    this.setState({input: e.target.value});
  }
  submitTodo(e){
    e.preventDefault();
    this.props.dispatch(addTodo(this.state.input));
    this.setState({input: ""});
  }
  render(){
    return (
      <form onSubmit={this.submitTodo}>
        <FormGroup controlId="todoInput">
          <ControlLabel>What do you want todo?</ControlLabel>
          <FormControl type="text" value={this.state.input} onChange={this.handleTextChange} placeholder="enter your todos here" />
        </FormGroup>
      </form>
    );
  }
}


export default connect()(TodoInput);
