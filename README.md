# react-valid-form
React form validation component.

[![npm package][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Dependencies Status][david-image]][david-url]
[![Package Size][bundlephobia-image]][bundlephobia-url]

## Getting started

#### Install with NPM:

```
$ npm install react-valid-form
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

When the form is validated, it is submit automatically.

>Use ```nosubmit``` prop for manual submit/fetch.

```jsx
// App.js
import React from 'react';
import ValidForm from 'react-valid-form'

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

##### Fetch Example

Once the form is validated, you can send the data manually.

```jsx
// App.js
import React from 'react';
import ValidForm from 'react-valid-form'

function App() {
const onSubmit = (form, data, valid) => {

}
  return (
<ValidForm action="https://httpbin.org/post" method="post" nosubmit onSubmit={(form, data, valid) => onSubmit(form, data, valid)}>
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


------------
#### Author

**Barış Ateş**
 - http://barisates.com
 - [github/barisates](https://github.com/barisates "github/barisates")

[npm-image]:https://img.shields.io/npm/v/react-translator-component.svg
[npm-url]:https://www.npmjs.com/package/react-translator-component
[travis-image]:https://travis-ci.org/barisates/react-translator-component.svg?branch=master
[travis-url]:https://travis-ci.org/barisates/react-translator-component
[david-image]:https://david-dm.org/barisates/react-translator-component.svg
[david-url]:https://david-dm.org/barisates/react-translator-component
[bundlephobia-image]:https://badgen.net/bundlephobia/minzip/react-translator-component
[bundlephobia-url]:https://bundlephobia.com/result?p=react-translator-component