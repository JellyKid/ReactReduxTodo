import React from 'react';
import TodoList from './TodoList';
import TodoInput from './TodoInput';
import TodoControls from './TodoControls';
import { PageHeader, Grid, Row, Col, Label } from 'react-bootstrap';
import { connect } from 'react-redux';


class TodoContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    return (
      <Grid>
        <Col md={8} mdOffset={2} sm={12}>
          <PageHeader>Todos <Label>{this.props.count}</Label></PageHeader>
          <TodoInput />
          <TodoList />
          <TodoControls />
        </Col>
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  return {
    count: state.activeTally + state.completeTally
  };
}

export default connect(mapStateToProps)(TodoContainer);
