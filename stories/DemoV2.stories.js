/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import './css/bootstrap.min.css';
import './css/demo.css';

/* Component Imports */
import Select from 'react-select';
import ValidFormV2 from '../src/index-v2';


export default {
  title: 'DemoV2',
};

export const DemoV2 = () => {
  const onSubmit = (form, data, valid) => {
    console.log(form, ' | FORM');
    console.log(data, ' | DATA');
    console.log(valid, ' | VALID');
  };
  
  return (
    <div className="App">
      <header className="App-header">
        <ValidFormV2 action="https://httpbin.org/post" method="post" nosubmit novalid onSubmit={(form, data, valid) => onSubmit(form, data, valid)}>
          <div className="row">
            <div className="col-md-10 offset-md-1">
              <h5 className="mb-3">Validation Examples</h5>
              <div className="row pt-3">
                <div className="form-group col-md-6">
                  <label htmlFor="string">
                    Text Max-Min Length
                    <small>[minLength="3", maxLength="50"]</small>
                  </label>
                  <input required type="text" className="form-control" id="string" name="string" placeholder="Enter text" minLength="3" maxLength="50" />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="onlyNumber">
                    Number Max-Min Value
                    <small>[number="true", min="3", max="50"]</small>
                  </label>
                  <input type="text" className="form-control" id="onlyNumber" name="onlyNumber" placeholder="Enter only number" number="true" min="3" max="50" />
                </div>
              </div>
              <div className="row pt-3">
                <div className="form-group col-md-6">
                  <label htmlFor="email">
                    Email address
                    <small>[type="email"]</small>
                  </label>
                  <input type="email" className="form-control" id="email" name="email" placeholder="Enter email" autoComplete="username email" />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="url">
                    Url
                    <small>[type="url"]</small>
                  </label>
                  <input type="url" className="form-control" id="url" name="url" placeholder="Enter url" />
                </div>
              </div>
              <div className="row pt-3">
                <div className="form-group col-md-6">
                  <label htmlFor="password">
                    Password
                    <small>[confirm="passwordConfirm"]</small>
                  </label>
                  <input type="password" className="form-control" id="password" name="password" placeholder="Password" autoComplete="current-password" confirm="passwordConfirm" />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="password">
                    Password Confirm
                    <small>[required]</small>
                  </label>
                  <input type="password" className="form-control" id="passwordConfirm" name="passwordConfirm" placeholder="Password Confirm" autoComplete="current-password" required />
                </div>
              </div>
              <div className="row pt-3">
                <div className="form-group col-md-6">
                  <label htmlFor="regexp">
                    Regexp
                    <small>[regexp="\d"]</small>
                  </label>
                  <input type="text" className="form-control" id="regexp" name="regexp" placeholder="Enter only number" regexp="\d" />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="letters">
                    Only Letters
                    <small>[required, letters="true"]</small>
                  </label>
                  <input type="text" className="form-control" id="letters" name="letters" placeholder="Enter only letters" required letters="true" />
                </div>
              </div>
              <div className="row pt-3">
                <div className="form-group col-md-6">
                  <label htmlFor="select">
                    Select Required
                    <small>[required]</small>
                  </label>
                  <select className="form-control" name="select" id="select" defaultValue="" required>
                    <option value=""> Select</option>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                  </select>
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="textarea">
                    Textarea Required
                    <small>[required, maxLength="255"]</small>
                  </label>
                  <textarea id="textarea" name="textarea" className="form-control" rows="1" placeholder="Enter text" required maxLength="255" />
                </div>
              </div>
              <div className="row pt-3">
                <div className="form-group form-check col-md-6">
                  <label htmlFor="country">
                    Checkbox Required
                    <small>[required]</small>
                    <div className="custom-control custom-checkbox">
                      <label className="custom-control-label" htmlFor="checkbox">
                        I accept the
                        <a href="#terms">Terms of Service.</a>
                      </label>
                      <input type="checkbox" className="custom-control-input" id="checkbox" name="checkbox" required />
                    </div>
                  </label>
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="gender">
                    Radio Required
                    <small>[required]</small>
                    <div className="ml-1">
                      <div className="custom-control custom-radio custom-control-inline">
                        <label className="custom-control-label" htmlFor="radio1">
                          Radio 1
                          <input type="radio" id="radio1" name="radio" className="custom-control-input" />
                        </label>
                      </div>
                      <div className="custom-control custom-radio custom-control-inline">
                        <label className="custom-control-label" htmlFor="radio2">
                          Radio 2
                        </label>
                        <input type="radio" id="radio2" name="radio" className="custom-control-input" required />
                      </div>
                    </div>
                  </label>
                </div>
              </div>
              <div className="row pt-3">
                <div className="form-group form-check col-md-6">
                  <label htmlFor="select">
                    React Select
                    <small>[required]</small>
                  </label>
                  <Select
                    name="reactSelect"
                    inputId="no-validation"
                    className="react-select-valid"
                    onChange={(selected, element) => console.log(selected, element)}
                    options={[
                      { label: 'Option 1', value: '1' },
                      { label: 'Option 2', value: '2' },
                      { label: 'Option 3', value: '3' },
                    ]}
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-primary">Submit Form</button>
            </div>
          </div>
        </ValidFormV2>
      </header>
    </div>
  );
};
