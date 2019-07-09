import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

class EmployeeEdit extends Component {

  emptyItem = {
    fname: '',
    lname: '',
    address: '',
    city: '',
    stateOrProvince: '',
    postalCode: '',
    homePhone: '',
    cellPhone: '',
    email: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyItem
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    if (this.props.match.params.id !== 'new') {
      const employee = await (await fetch(`/api/employee/${this.props.match.params.id}`)).json();
      this.setState({item: employee});
    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = {...this.state.item};
    item[name] = value;
    this.setState({item});
  }

  async handleSubmit(event) {
    event.preventDefault();
    const {item} = this.state;
    
    await fetch('/api/employee/'+(item.id), {
    method: (item.id) ? 'PUT' : 'POST',
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(item),
    });
    this.props.history.push('/employees');
    }

  render() {
    const {item} = this.state;
    const title = <h2>{item.id ? 'Edit Employee' : 'Add Employee'}</h2>;

    return <div>
      <AppNavbar/>
      <Container>
        {title}
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="fname">First Name</Label>
            <Input type="text" name="fname" id="fname" value={item.fname || ''}
                   onChange={this.handleChange} autoComplete="fname"/>
          </FormGroup>
          <FormGroup>
            <Label for="lname">Last Name</Label>
            <Input type="text" name="lname" id="lname" value={item.lname || ''}
                   onChange={this.handleChange} autoComplete="lname"/>
          </FormGroup>
          <FormGroup>
            <Label for="address">Address</Label>
            <Input type="text" name="address" id="address" value={item.address || ''}
                   onChange={this.handleChange} autoComplete="address-level1"/>
          </FormGroup>
          <FormGroup>
            <Label for="city">City</Label>
            <Input type="text" name="city" id="city" value={item.city || ''}
                   onChange={this.handleChange} autoComplete="address-level1"/>
          </FormGroup>
          <div className="row">
            <FormGroup className="col-md-4 mb-3">
              <Label for="stateOrProvince">State/Province</Label>
              <Input type="text" name="stateOrProvince" id="stateOrProvince" value={item.stateOrProvince || ''}
                     onChange={this.handleChange} autoComplete="address-level1"/>
            </FormGroup>
            <FormGroup className="col-md-3 mb-3">
              <Label for="country">Postal Code</Label>
              <Input type="text" name="postalCode" id="postalCode" value={item.postalCode || ''}
                     onChange={this.handleChange} autoComplete="address-level1"/>
            </FormGroup>
          </div>
          <FormGroup>
            <Label for="homePhone">Home Phone</Label>
            <Input type="text" name="homePhone" id="homePhone" value={item.homePhone || ''}
                   onChange={this.handleChange} autoComplete="homePhone"/>
          </FormGroup>
          <FormGroup>
            <Label for="cellPhone">Cell Phone</Label>
            <Input type="text" name="cellPhone" id="cellPhone" value={item.cellPhone || ''}
                   onChange={this.handleChange} autoComplete="cellPhone"/>
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input type="text" name="email" id="email" value={item.email || ''}
                   onChange={this.handleChange} autoComplete="email"/>
          </FormGroup>
          <FormGroup>
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="secondary" tag={Link} to="/employees">Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  }
}

export default withRouter(EmployeeEdit);