# CB React Forms [![npm version](https://badge.fury.io/js/cb-react-forms.svg)](https://badge.fury.io/js/cb-react-forms) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## React Form Builder

![Form Builder GIF](pictures/cb-react-forms.gif)

### Form Builder [DEMO](https://cb-react-forms.netlify.com/) [(github)](https://github.com/sachinmjadhav/react-forms-demo)

A complete react form builder that interfaces with json data to load and save generated forms.

![](pictures/Screenshot-formBuilder.png)

# Basic Usage

```jsx
import React from "react";
import ReactDOM from "react-dom";
import { FormBuilder } from "cb-react-forms";

const Example = props => (
  <FormBuilder 
    onSubmit={}
    items={}
  />;
);

ReactDOM.render(<Example />, document.getElementById("root"));
```

# Props

```jsx
const items = [
  {
    key: "Header",
    name: "Header Text",
    icon: "fa fa-header"
  },
  {
    key: "Paragraph",
    name: "Paragraph",
    icon: "fa fa-paragraph"
  },
  {
    key: "Dropdown",
    name: "Dropdown",
    icon: "fa fa-caret-square-o-down"
  }
];

const onSubmitFunc = () => {
  // Submit Function
};

<FormBuilder 
  items={items} 
  onSubmit={onSubmitFunc} 
/>

```

### Form Builder Params:
Name | Type | Required | Description
--- | --- | --- | --- |
onSubmit | function | Required | Invoked on Export Form, gets formData as the argument.
items | array | Optional | List of toolbar items, list of avaiable items can be found below.
## Editing Items:
![](pictures/Screenshot-editor.png)

# React Form Generator

Now that the form is built and saved, let's generate it from the saved json.

```jsx
import React from "react";
import ReactDOM from "react-dom";
import { FormGenerator } from 'cb-react-forms';

const Example = props => (
  <FormGenerator 
    formData={}
    onSubmit={}
  />
);

ReactDOM.render(<Example />, document.getElementById("root"));
```
### Form Generator Params
Name | Type | Required | Description
--- | --- | --- | --- |
formData | array | Required | List of questions data retrieved from FormBuilder.
onSubmit | function | Required | Invoked on form submit, gets answers data as the argument.
readOnly | boolean | Optional | Show a read only version which has fields disabled and removed "Required" labels.
responseData | object | Optional | Answer data, only loads if loading a pre-existing form with values.

## Demo Form:
![](pictures/Screenshot-finalForm.png)

### List of Toolbar items:

```javascript
const items = [
  {
    key: "Header",
    name: "Header Text",
    icon: "fa fa-header"
  },
  {
    key: "Label",
    name: "Label",
    icon: "fa fa-font"
  },
  {
    key: "Paragraph",
    name: "Paragraph",
    icon: "fa fa-paragraph"
  },
  {
    key: "LineBreak",
    name: "Line Break",
    icon: "fa fa-arrows-h"
  },
  {
    key: "Dropdown",
    name: "Dropdown",
    icon: "fa fa-caret-square-o-down"
  },
  {
    key: "Tags",
    name: "Tags",
    icon: "fa fa-tags"
  },
  {
    key: "Checkboxes",
    name: "Checkboxes",
    icon: "fa fa-check-square-o"
  },
  {
    key: "RadioButtons",
    name: "Multiple Choice",
    icon: "fa fa-dot-circle-o"
  },
  {
    key: "TextInput",
    name: "Text Input",
    icon: "fa fa-font"
  },
  {
    key: "NumberInput",
    name: "Number Input",
    icon: "fa fa-plus"
  },
  {
    key: "TextArea",
    name: "Multi-line Input",
    icon: "fa fa-text-height"
  },
  {
    key: "Rating",
    name: "Rating",
    icon: "fa fa-star"
  },
  {
    key: "HyperLink",
    name: "Web site",
    icon: "fa fa-link"
  },
  {
    key: "Range",
    name: "Range",
    icon: "fa fa-sliders"
  },
  {
    key: "Email",
    name: "Email",
    icon: "fa fa-at"
  },
  {
    key: "Date",
    name: "Date",
    icon: "fa fa-calendar"
  },
  {
    key: "Signature",
    name: "Signature",
    icon: "fa fa-edit"
  }
];

// NOTE: You can edit the name and the icon (FontAwesome classes) fields but **do not** change the key.
```

## Read Only Form:
![](pictures/Screenshot-readOnly.png)

# Dependencies
In order to make the Form Builder secure and pretty, there are a few dependencies other than React.
- redux-form
- draft-js
- react-draft-wysiwyg
- react-dnd
- react-star-ratings
- react-select

# Develop
```bash
$ npm install
$ npm start
```
Navigate to localhost:8080/ in your browser and you should be able to see the Form Builder in action.