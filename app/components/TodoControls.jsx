import React from 'react';
import { connect } from 'react-redux';
import { ButtonToolbar, ButtonGroup, Button, Modal, Badge, Col, Row, Label, DropdownButton, MenuItem } from 'react-bootstrap';
import { setVisible, clearComplete, sortTodos } from '../redux/actions';

class TodoControls extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showWarning: false
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.showWarning = this.showWarning.bind(this);
    this.hideWarning = this.hideWarning.bind(this);
    this.handleSort = this.handleSort.bind(this);
  }
  handleSelect(e) {
    this.props.dispatch(setVisible(e.target.innerHTML));
  }
  handleClear(){
    this.hideWarning();
    this.props.dispatch(clearComplete());
  }
  showWarning(){
    this.setState({showWarning: true});
  }
  hideWarning(){
    this.setState({showWarning: false});
  }
  handleSort(method){
    this.props.dispatch(sortTodos(method));
  }
  render(){
    let filter = this.props.visible;
    let sortIcon = (<i className="fa fa-sort" aria-hidden="true"></i>);

    return (
      <div>

        <ButtonToolbar justified>
          <Row>
            <Col sm={3}>
              <ButtonGroup className="space-column" vertical>
                <div><Badge>{this.props.activeTally}</Badge> <Label>Active</Label></div>
                <div><Badge>{this.props.completeTally}</Badge> <Label>Complete</Label></div>
              </ButtonGroup>
            </Col>
            <Col sm={6}>
              <ButtonGroup className="space-column">
                <Button active={filter === 'All'} onClick={this.handleSelect}>All</Button>
                <Button active={filter === 'Active'} onClick={this.handleSelect}>Active</Button>
                <Button active={filter === 'Completed'} onClick={this.handleSelect}>Completed</Button>
                <DropdownButton title="Sort">
                  <MenuItem eventKey="1" onClick={() => this.handleSort('content')}>A-Z</MenuItem>
                  <MenuItem eventKey="2" onClick={() => this.handleSort('id')}>Date</MenuItem>
                  <MenuItem eventKey="3" onClick={() => this.handleSort('complete')}>State</MenuItem>
                </DropdownButton>
              </ButtonGroup>
            </Col>
            <Col sm={3}>
              <ButtonGroup className="space-column">
                <Button onClick={this.showWarning} bsStyle="danger" disabled={this.props.completeTally === 0}>Clear Completed</Button>
              </ButtonGroup>
            </Col>
          </Row>
        </ButtonToolbar>

        <Modal bsSize="small" show={this.state.showWarning} onHide={this.hideWarning}>
          <Modal.Header closeButton>Warning!</Modal.Header>
          <Modal.Body>
            <h5>Are you sure you want to clear completed todos?</h5>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClear}>Yes</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    visible: state.visible,
    completeTally: state.completeTally,
    activeTally: state.activeTally
  };
}

export default connect(mapStateToProps)(TodoControls);
