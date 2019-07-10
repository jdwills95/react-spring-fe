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
        fnameState: '',
        lnameState: '',
        addressState: '',
        cityState: '',
        zipState: '',
        homeState: '',
        cellState: '',
        emailState: '',
        submitState: ''
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateFname(e) {
    const fnameRex = /^[A-Za-z]{2,35}$/;
    const { validate } = this.state
      if (fnameRex.test(e.target.value)) {
        validate.fnameState = 'has-success'
      } else {
        validate.fnameState = 'has-danger'
      }
      this.setState({ validate })
    }

  validateLname(e) {
    const lnameRex = /^[A-Za-z]{2,35}$/;
    const { validate } = this.state
      if (lnameRex.test(e.target.value)) {
        validate.lnameState = 'has-success'
      } else {
        validate.lnameState = 'has-danger'
      }
      this.setState({ validate })
    }

  validateAddress(e) {
    const addressRex = /^\d{1,3}.?\d{0,3}\s[a-zA-Z]{2,30}\s[a-zA-Z]{2,15}$/;
    const { validate } = this.state
      if (addressRex.test(e.target.value)) {
        validate.addressState = 'has-success'
      } else {
        validate.addressState = 'has-danger'
      }
      this.setState({ validate })
    }

  validateCity(e) {
    const cityRex = /^[A-Za-z]{5,50}$/;
    const { validate } = this.state
      if (cityRex.test(e.target.value)) {
        validate.cityState = 'has-success'
      } else {
        validate.cityState = 'has-danger'
      }
      this.setState({ validate })
    }

  validateZip(e) {
    const zipRex = /^\d{5}(?:[-\s]\d{4})?$/;
    const { validate } = this.state
      if (zipRex.test(e.target.value)) {
        validate.zipState = 'has-success'
      } else {
        validate.zipState = 'has-danger'
      }
      this.setState({ validate })
    }

  validateHome(e) {
    const homeRex = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
    const { validate } = this.state
      if (homeRex.test(e.target.value)) {
        validate.homeState = 'has-success'
      } else {
        validate.homeState = 'has-danger'
      }
      this.setState({ validate })
    }

  validateCell(e) {
    const cellRex = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
    const { validate } = this.state
      if (cellRex.test(e.target.value)) {
        validate.cellState = 'has-success'
      } else {
        validate.cellState = 'has-danger'
      }
      this.setState({ validate })
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
      this.state.validate.submitState = true;
    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = {...this.state.item};
    item[name] = value;
    this.setState({item});
    this.canBeSubmitted();
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
    
    canBeSubmitted() {
      if (this.state.validate.fnameState != 'has-danger'   && this.state.item.fname != '' &&
          this.state.validate.lnameState != 'has-danger'   && this.state.item.lname != '' &&
          this.state.validate.addressState != 'has-danger' && this.state.item.address != '' && 
          this.state.validate.cityState != 'has-danger'    && this.state.item.city != '' &&
          this.state.validate.zipState != 'has-danger'     && this.state.item.postalCode != '' && 
          this.state.validate.homeState != 'has-danger'    && this.state.item.homePhone != '' &&
          this.state.validate.cellState != 'has-danger'    && this.state.item.cellPhone != '' && 
          this.state.validate.emailState != 'has-danger'   && this.state.item.email != ''
      ) {
        this.state.validate.submitState = true;
      }else{
        this.state.validate.submitState = false;
      }
    };

  render() {
    const {item} = this.state;
    const title = <h2>{item.id ? 'Edit Employee' : 'Add Employee'}</h2>;
    this.canBeSubmitted();

    return <div>
      <AppNavbar/>
      <Container>
        {title}
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="fname">First Name</Label>
            <Input type="text" name="fname" id="fname" placeholder="First Name" value={item.fname || ''}
                   autoComplete="fname"valid={ this.state.validate.fnameState === 'has-success' }
                   invalid={ this.state.validate.fnameState === 'has-danger' }
                   onChange={ (e) => {
                               this.validateFname(e)
                               this.handleChange(e)
                             } }/>
              <FormFeedback>
                Invalid First Name. Please enter a correct First Name.
              </FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="lname">Last Name</Label>
            <Input type="text" name="lname" id="lname" placeholder="Last Name" value={item.lname || ''}
                   autoComplete="lname"valid={ this.state.validate.lnameState === 'has-success' }
                   invalid={ this.state.validate.lnameState === 'has-danger' }
                   onChange={ (e) => {
                               this.validateLname(e)
                               this.handleChange(e)
                             } }/>
              <FormFeedback>
                Invalid Lat Name. Please enter a correct Last Name.
              </FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="address">Address</Label>
            <Input type="text" name="address" id="address" placeholder="Address" value={item.address || ''}
                   autoComplete="address-level1"valid={ this.state.validate.addressState === 'has-success' }
                   invalid={ this.state.validate.addressState === 'has-danger' }
                   onChange={ (e) => {
                               this.validateAddress(e)
                               this.handleChange(e)
                             } }/>
              <FormFeedback>
                Invalid Address. Please enter a correct Address.
              </FormFeedback>
          </FormGroup>
          <div className="row">
            <FormGroup className="col-md-4 mb-3">
              <Label for="city">City</Label>
              <Input type="text" name="city" id="city" placeholder="City" value={item.city || ''}
                   autoComplete="address-level1"valid={ this.state.validate.cityState === 'has-success' }
                   invalid={ this.state.validate.cityState === 'has-danger' }
                   onChange={ (e) => {
                               this.validateCity(e)
                               this.handleChange(e)
                             } }/>
              <FormFeedback>
                Invalid City name. Please enter a correct City name.
              </FormFeedback>
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
                     autoComplete="address-level1"valid={ this.state.validate.zipState === 'has-success' }
                     invalid={ this.state.validate.zipState === 'has-danger' }
                     onChange={ (e) => {
                                 this.validateZip(e)
                                 this.handleChange(e)
                               } }/>
                <FormFeedback>
                  Invalid Postal Code. Please enter a correct Postal Code.
                </FormFeedback>
            </FormGroup>
          </div>
          <FormGroup>
            <Label for="homePhone">Home Phone</Label>
            <Input type="text" name="homePhone" id="homePhone" placeholder="Home Phone" value={item.homePhone || ''}
                   autoComplete="homePhone"valid={ this.state.validate.homeState === 'has-success' }
                   invalid={ this.state.validate.homeState === 'has-danger' }
                   onChange={ (e) => {
                               this.validateHome(e)
                               this.handleChange(e)
                             } }/>
              <FormFeedback>
                Invalid Home Phone number. Please enter a correct Home Phone number.
              </FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="cellPhone">Cell Phone</Label>
            <Input type="text" name="cellPhone" id="cellPhone" placeholder="Cell Phone" value={item.cellPhone || ''}
                   autoComplete="cellPhone" valid={ this.state.validate.cellState === 'has-success' }
                   invalid={ this.state.validate.cellState === 'has-danger' }
                   onChange={ (e) => {
                               this.validateCell(e)
                               this.handleChange(e)
                             } }/>
              <FormFeedback>
                Invalid CellPhone number. Please enter a correct CellPhone number.
              </FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input type="text" name="email" id="email" placeholder="Email" value={item.email || ''}
                   autoComplete="email" valid={ this.state.validate.emailState === 'has-success' }
                   invalid={ this.state.validate.emailState === 'has-danger' }
                   onChange={ (e) => {
                               this.validateEmail(e)
                               this.handleChange(e)
                             } }/>
              <FormFeedback>
                Invalid email address. Please enter a correct email address.
              </FormFeedback>
          </FormGroup>
          <FormGroup>
            <Button color="primary" type="submit" disabled={!this.state.validate.submitState}>Save</Button>{' '}
            <Button color="secondary" tag={Link} to="/employees">Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  }
}

export default withRouter(EmployeeEdit);