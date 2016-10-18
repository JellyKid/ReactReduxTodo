import React from 'react';
import { ListGroupItem } from 'react-bootstrap';
import { connect } from 'react-redux';

class TodoItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    let content = this.props.complete ? <s>{this.props.content}</s> : this.props.content;
    return (
      <ListGroupItem href="#" className={this.props.visible} onClick={this.props.toggleAction}>
        {content}
      </ListGroupItem>
    );
  }
}

export default TodoItem;
