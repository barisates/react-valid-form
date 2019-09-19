import React, { Component } from 'react';
import './App.css';


const warnings = {
  required: "This field is required.",
  numeric: "",
  min: "",
  max: "",
  minlength: "This field must be at least 3 characters.",
  maxlength: ""
}

const rules = {
  required: {
    valid: (value) => {
      return (value !== null && value !== undefined && value !== "")
    },
    warning: warnings.required
  },
  numeric: {
    valid: (value) => {
      return (!isNaN(value))
    },
    warning: warnings.numeric
  },
  min: {
    valid: (value, min) => {
      return (value != null && value >= min)
    },
    warning: warnings.min
  },
  max: {
    valid: (value, max) => {
      return (value != null && value <= max)
    },
    warning: warnings.max
  },
  minlength: {
    valid: (value, length) => {
      return (value != null && value.toString().length >= length)
    },
    warning: warnings.minlength
  },
  maxlength: {
    valid: (value, length) => {
      return (value != null && value.toString().length <= length)
    },
    warning: warnings.maxLength
  },
  // OWN
  keys: () => (Object.keys(rules).map(item => item.toLowerCase()))
};

const tags = ["INPUT", "SELECT", "TEXTAREA"]

const utilities = {
  isElement: (tag) => (tags.includes(tag)),
  elements: (formRef) => (Array.from(formRef.current.elements).filter(filter => utilities.isElement(filter.tagName))),
  validation: (element) => (Object.values(element.attributes).filter(filter => rules.keys().includes(filter.name.toLowerCase()))),
  invalid: (element, warning) => {

    element.classList.add("invalid");

    let rvf = element.parentNode.getElementsByTagName("rvf")[0];

    if (!rvf) {
      rvf = document.createElement('rvf');
    }

    rvf.innerHTML = warning;

    element.parentNode.appendChild(rvf);


  },
  valid: (element) => {

    element.classList.remove("invalid");

    let rvf = element.parentNode.getElementsByTagName("rvf")[0];

    if (rvf)
      element.parentNode.removeChild(rvf);

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

    let focus = true;

    this.formElements.forEach(element => {

      let validation = utilities.validation(element);

      for (let validate of validation) {

        let elementValue = this.state.form[element.name];

        const rule = rules[validate.name];

        if (!rule.valid(elementValue, validate.value)) {
          utilities.invalid(element, rule.warning);
          if (focus) {
            element.focus();
            focus = false;
          }

          break;
        }

        utilities.valid(element);
      }



    });




    let valid = false,
      data = "hasan";



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
          <ValidForm action="https://httpbin.org/post" method="post" onSubmit={(form, data, valid) => this.onSubmit(form, data, valid)}>
            <div className="row">
              <div className="col-md-4 offset-md-4">
                <h5 className="mb-3">Create Account</h5>
                <div className="row">
                  <div className="form-group col-md-6">
                    <label htmlFor="firstname">First name</label>
                    <input type="text" className="form-control" id="firstname" name="firstname" placeholder="Enter first name" required /*maxLength="10" minLength="5" max="4"*/ />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="lastname">Last name</label>
                    <input type="text" className="form-control" id="lastname" name="lastname" placeholder="Enter last name" required minLength="3" />
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
                    <input type="password" className="form-control" id="password" name="password" placeholder="Password" autoComplete="current-password" />
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
                  <label className="form-check-label" htmlFor="termsofservice">I accept the <a href="#terms">Terms of Service.</a></label>
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
