# react-valid-form
React form validation component.

[![npm package][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Dependencies Status][david-image]][david-url]
[![Package Size][bundlephobia-image]][bundlephobia-url]

## Getting started

#### Install with NPM:

```
$ npm install react-valid-form-component
```

#### Usage

**Live Demo [CodeSandbox](https://codesandbox.io/s/react-valid-form-9fkx7 "CodeSandbox")**

With this component, you can validate form fields according to the rules you specify. Simply define your form in the ```<ValidForm></ValidForm>``` tags to validate.

Component supports standard form elements;
```html
<input />
<select></select>
<textarea></textarea>
```

##### Example

When the form is validated, it is automatically posted. You can manually Submit or Fetch using ```nosubmit``` prop.
You can follow the details about the form with ```onSubmit={(form, data, valid)}``` event.

> Auto Submit Example [CodeSandbox](https://codesandbox.io/s/auto-submit-example-9zdpi "CodeSandbox")

```jsx
// App.js
import React from 'react';
import ValidForm from 'react-valid-form-component'

function App() {
    return (
        <ValidForm action="https://httpbin.org/post" method="post">
            <div>
                <label for="validation">Text Example: </label>
                <input
                    type="text"
                    name="validation"
                    id="validation"
                    /* validation rules */
                    required
                    minLength="3"
                    maxLength="50"
                />
            </div>
            <div>
                <label for="validation">Email Example: </label>
                <input
                    type="email" /* validation with type */
                    name="validation"
                    id="validation"
                />
            </div>
            <button type="submit">Send Form</button>
        </ValidForm>
    )
}
export default App;
```

##### Manual Fetch Example

Once the form is validated, you can send the data manually.

> Fetch Example [CodeSandbox](https://codesandbox.io/s/fetch-example-4kqoy "CodeSandbox")

```jsx
// App.js
import React from 'react';
import ValidForm from 'react-valid-form-component'

function App() {
    const onSubmit = (form, data, valid) => {
        const requestOptions = {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        };

        fetch("https://httpbin.org/post", requestOptions)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error(`Response Error, Status Code : ${response.status}`);
                }
            })
            .then(json => {
                console.log(json);
            })
            .catch(function (error) {
                console.error(error);
            });
    }
    return (
        <ValidForm nosubmit onSubmit={(form, data, valid) => onSubmit(form, data, valid)}>
            <div>
                <label for="validation">Text Example: </label>
                <input
                    type="text"
                    name="validation"
                    id="validation"
                    /* validation rules */
                    required
                    minLength="3"
                    maxLength="50"
                />
            </div>
            <div>
                <label for="validation">Email Example: </label>
                <input
                    type="email" /* validation with type */
                    name="validation"
                    id="validation"
                />
            </div>
            <button type="submit">Send Form</button>
        </ValidForm>
    )
}
export default App;
```
##### Props

```nosubmit``` Disable auto submit.

```novalid``` "onSubmit" event is also triggered when the form is not valid.

```data``` Default form elements value.

##### Events
```onSubmit={(form, data, valid)}``` When the form is submitted, it is triggered.

- ```form``` : Html form elemet.

- ```data``` : Form fields data.

- ```valid``` : Form is valid? (true/false)

##### Default Validation Rules

You can add rules and change warning texts. You can use rules by defining them as ```type=""``` or ```prop```. Follow the document for details.

- ```required="true"``` : Required field. 

- ```number="true"``` : Only number field. Can be used as **Type**.

- ```alphanumeric="true"``` : Only alphanumeric character.

- ```letters="true"``` : Only letters.

- ```min="integer"``` : Min value limitations.

- ```max="integer"``` :  Max value limitations.

- ```minlength="integer"``` : Min value length limitations.

- ```maxlength="integer"``` : Max value length limitations.

- ```email="true"``` : Only email field. Can be used as **Type**.

- ```url="true"``` : Only url field. Can be used as **Type**.

- ```confirm="Confirmation Field ID"``` : Verifies that the two fields have the same value. Such as the "Password Repeat" field.

- ```regexp="Regular Expression"```

##### Add Validation Rule

Import ```Rules``` and ```Warnings``` objects for add rule.

```jsx
import ValidForm, { Rules, Warnings } from 'react-valid-form';

// rule
Rules.customRule = (value) => {
  return (value === "Custom Rule")
};

// warning alert
Warnings.customRule = (params) => `This field is custom rule ${params}.`

// using
<input type="text" name="validation" id="validation" customRule />
```
------------
#### Author

**Barış Ateş**
 - http://barisates.com
 - [github/barisates](https://github.com/barisates "github/barisates")

[npm-image]:https://img.shields.io/npm/v/react-valid-form-component.svg
[npm-url]:https://www.npmjs.com/package/react-valid-form-component
[travis-image]:https://travis-ci.org/barisates/react-valid-form.svg?branch=master
[travis-url]:https://travis-ci.org/barisates/react-valid-form
[david-image]:https://david-dm.org/barisates/react-valid-form.svg
[david-url]:https://david-dm.org/barisates/react-valid-form
[bundlephobia-image]:https://badgen.net/bundlephobia/minzip/react-valid-form-component
[bundlephobia-url]:https://bundlephobia.com/result?p=react-valid-form-component
