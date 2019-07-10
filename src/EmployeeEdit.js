import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, FormFeedback, Input, Label } from 'reactstrap';
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
      item: this.emptyItem,
      validate: {
        emailState: '',
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateEmail(e) {
    const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const { validate } = this.state
      if (emailRex.test(e.target.value)) {
        validate.emailState = 'has-success'
      } else {
        validate.emailState = 'has-danger'
      }
      this.setState({ validate })
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

    submitForm(e) {
      e.preventDefault();
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
            <Input type="text" name="fname" id="fname" placeholder="First Name" value={item.fname || ''}
                   onChange={this.handleChange} autoComplete="fname"/>
          </FormGroup>
          <FormGroup>
            <Label for="lname">Last Name</Label>
            <Input type="text" name="lname" id="lname" placeholder="Last Name" value={item.lname || ''}
                   onChange={this.handleChange} autoComplete="lname"/>
          </FormGroup>
          <FormGroup>
            <Label for="address">Address</Label>
            <Input type="text" name="address" id="address" placeholder="Address" value={item.address || ''}
                   onChange={this.handleChange} autoComplete="address-level1"/>
          </FormGroup>
          <div className="row">
            <FormGroup className="col-md-4 mb-3">
              <Label for="city">City</Label>
              <Input type="text" name="city" id="city" placeholder="City" value={item.city || ''}
                   onChange={this.handleChange} autoComplete="address-level1"/>
            </FormGroup>
            <FormGroup className="col-md-4 mb-3">
              <Label for="stateOrProvince">State</Label>
              <Input type="select" name="stateOrProvince" id="stateOrProvince" placeholder="State" value={item.stateOrProvince || ''}
                     onChange={this.handleChange} autoComplete="address-level1">
                <option>AL</option><option>AK</option><option>AZ</option><option>AR</option><option>CA</option>
                <option>CO</option><option>CT</option><option>DE</option><option>FL</option><option>GA</option>
                <option>HI</option><option>ID</option><option>IL</option><option>IN</option><option>IA</option>
                <option>KS</option><option>KY</option><option>LA</option><option>ME</option><option>MD</option>
                <option>MA</option><option>MI</option><option>MN</option><option>MS</option><option>MO</option>
                <option>MT</option><option>NE</option><option>NV</option><option>NH</option><option>NJ</option>
                <option>NM</option><option>NY</option><option>NC</option><option>ND</option><option>OH</option>
                <option>OK</option><option>OR</option><option>PA</option><option>RI</option><option>SC</option>
                <option>SD</option><option>TN</option><option>TX</option><option>UT</option><option>VT</option>
                <option>VA</option><option>WA</option><option>WV</option><option>WI</option><option>WY</option>
              </Input>
            </FormGroup>
            <FormGroup className="col-md-3 mb-3">
              <Label for="country">Postal Code</Label>
              <Input type="text" name="postalCode" id="postalCode" placeholder="Postal Code" value={item.postalCode || ''}
                     onChange={this.handleChange} autoComplete="address-level1"/>
            </FormGroup>
          </div>
          <FormGroup>
            <Label for="homePhone">Home Phone</Label>
            <Input type="text" name="homePhone" id="homePhone" placeholder="Home Phone" value={item.homePhone || ''}
                   onChange={this.handleChange} autoComplete="homePhone"/>
          </FormGroup>
          <FormGroup>
            <Label for="cellPhone">Cell Phone</Label>
            <Input type="text" name="cellPhone" id="cellPhone" placeholder="Cell Phone" value={item.cellPhone || ''}
                   onChange={this.handleChange} autoComplete="cellPhone"/>
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input type="text" name="email" id="email" placeholder="Email" value={item.email || ''}
                   onChange={this.handleChange} autoComplete="email" valid={ this.state.validate.emailState === 'has-success' }
                   invalid={ this.state.validate.emailState === 'has-danger' }
                   onChange={ (e) => {
                               this.validateEmail(e)
                               this.handleChange(e)
                             } }/>
              <FormFeedback>
                Invalid email address. Please input a correct email address.
              </FormFeedback>
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