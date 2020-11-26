/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import './css/bootstrap.min.css';
import './css/demo.css';

/* Component Imports */
import Select from 'react-select';
import ValidForm from '../src';


export default {
  title: 'Demo',
};

export const Demo = () => {
  const onSubmit = (form, data, valid) => {
    console.log(form, ' | FORM');
    console.log(data, ' | DATA');
    console.log(valid, ' | VALID');
  };
  return (
    <div className="App">
      <header className="App-header">
        <ValidForm action="https://httpbin.org/post" method="post" nosubmit novalid onSubmit={(form, data, valid) => onSubmit(form, data, valid)}>
          <div className="row">
            <div className="col-md-10 offset-md-1">
              <h5 className="mb-3">Validation Examples</h5>
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
        </ValidForm>
      </header>
    </div>
  );
};
