import React, { Component } from 'react';
import './App.css';


const warnings = {
  required: "This field is required.",
  numeric: "This field must be numeric.",
  min: "",
  max: "",
  minlength: "This field must be at least 3 characters.",
  maxlength: "This field must not exceed 3 characters."
}

const rules = {
  required: {
    valid: (value) => {
      return (value !== null && value !== undefined && value !== "")
    },
    warning: () => "This field is required."
  },
  number: {
    valid: (value) => {
      return (!isNaN(value))
    },
    warning: () => "This field must be numeric."
  },
  min: {
    valid: (value, min) => {
      return (value != null && value >= min)
    },
    warning: (min) => `The maximum value of this field can be ${min}.`
  },
  max: {
    valid: (value, max) => {
      return (value != null && value <= max)
    },
    warning: (max) => `The maximum value of this field can be ${max}.`
  },
  minlength: {
    valid: (value, length) => {
      return (value != null && value.toString().length >= length)
    },
    warning: (length) => `This field must be at least ${length} characters.`
  },
  maxlength: {
    valid: (value, length) => {
      return (value != null && value.toString().length <= length)
    },
    warning: (length) => `This field must not exceed ${length} characters.`
  },
  email: {
    valid: (value) => {
      const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return regEx.test(String(value).toLowerCase());
    },
    warning: () => "Enter a valid email address."
  },
  // OWN
  keys: () => (Object.keys(rules).map(item => item.toLowerCase()))
};

const tags = ["INPUT", "SELECT", "TEXTAREA"]

const utilities = {
  isElement: (tag) => (tags.includes(tag)),
  elements: (formRef) => (Array.from(formRef.current.elements).filter(filter => utilities.isElement(filter.tagName))),
  validation: (element) => {

    console.log(element.attributes, "-----------------")

    var typ = document.createAttribute(element.type);
    typ.value = "";
    element.attributes.setNamedItem(typ);

    console.log(element.attributes, "-----------------")
    let validates = Object.values(element.attributes).filter(filter => rules.keys().includes(filter.name.toLowerCase()))



    return validates;
  },
  invalid: (element, warning) => {

    element.classList.add("invalid");

    let span = element.parentNode.getElementsByClassName("warning-invalid")[0];

    if (!span) {
      span = document.createElement('span');
      span.className = "warning-invalid";
    }

    span.innerHTML = warning;

    element.parentNode.appendChild(span);

  },
  valid: (element) => {

    element.classList.remove("invalid");

    let span = element.parentNode.getElementsByClassName("warning-invalid")[0];

    if (span)
      element.parentNode.removeChild(span);

  }
}

export class ValidForm extends Component {
  constructor() {
    super()

    this.state = {
      form: {

      }
    };

    this.formRef = React.createRef();
    this.formElements = [];

  }
  componentDidMount() {

    this.formElements = utilities.elements(this.formRef);

    let form = {};

    this.formElements.forEach(element => {
      form[element.name] = null;
    });

    this.setState({
      form: form
    });

  }
  onChange(e) {

    const element = e.target;

    if (utilities.isElement(element.tagName)) {
      this.setState(prevState => ({
        form: { ...prevState.form, [element.name]: element.value }
      }))
    };

  }
  onSubmit(e) {
    e.preventDefault();

    let valid = true;

    this.formElements.forEach(element => {

      let validation = utilities.validation(element);

      for (let validate of validation) {

        let elementValue = this.state.form[element.name];

        const rule = rules[validate.name];

        if (!rule.valid(elementValue, validate.value)) {

          utilities.invalid(element, rule.warning(validate.value));

          if (valid)
            element.focus();

          valid = false;

          break;
        }

        utilities.valid(element);
      }

    });

    if (this.props.onSubmit)
      this.props.onSubmit(e.target, this.state.form, valid);

    return false;
  }
  render() {
    const { onSubmit, ...props } = this.props;

    return (
      <form {...props} noValidate ref={this.formRef} onChange={(e) => this.onChange(e)} onSubmit={(e) => this.onSubmit(e)}>
        {this.props.children}
      </form>
    )
  }
}


// DEMO
class App extends Component {
  constructor() {
    super()
  }
  onSubmit(form, data, valid) {

    console.log(form, data, valid, " ------ form");
  }
  onResponse(json) {
    console.log(json, " ------ json");
  }
  onCatch(error) {
    console.log(error, " ------ error");
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <ValidForm>
            <button type="submit">Send</button>
          </ValidForm>
          <ValidForm action="https://httpbin.org/post" method="post" onSubmit={(form, data, valid) => this.onSubmit(form, data, valid)}>
            <div className="row">
              <div className="col-md-4 offset-md-4">
                <h5 className="mb-3">Create Account</h5>
                <div className="row">
                  <div className="form-group col-md-6">
                    <label htmlFor="firstname">First name</label>
                    <input type="text" className="form-control" id="firstname" name="firstname" placeholder="Enter first name" required number="true" /*maxLength="10" minLength="5" max="4"*/ />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="lastname">Last name</label>
                    <input type="number" className="form-control" id="lastname" name="lastname" placeholder="Enter last name" required minLength="3" />
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-md-12">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" placeholder="Enter email" autoComplete="username email" />
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-md-12">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" name="password" placeholder="Password" autoComplete="current-password" minLength="6" />
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-md-6">
                    <label htmlFor="gender">Gender</label>
                    <select className="form-control" name="gender" id="gender" defaultValue="">
                      <option value="" disabled> Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                </div>
                <div className="form-group form-check">
                  <input type="checkbox" className="form-check-input" id="termsofservice" name="termsofservice" />
                  <label className="form-check-label" htmlFor="termsofservice">I accept the <a href="#terms">Terms of Service.
                  </a></label>
                </div>
                <button type="submit" className="btn btn-primary">Submit Form Fetch</button>
              </div>
            </div>
          </ValidForm>
        </header>
      </div>
    );
  }
}


export default App;
