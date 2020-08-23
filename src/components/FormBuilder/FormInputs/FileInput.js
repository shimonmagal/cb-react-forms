import React, { Component } from "react";
import HeaderLabel from "./HeaderLabel";
import FormadComponent from './FormadComponent';

class FileInput extends FormadComponent {
  constructor(props)
  {
    super(props)
  }

  render() {
    const  {
      type,
      meta,
      label,
      item,
      input,
      readOnly,
      required,
      generator,
      className,
      showError,
      defaultValue,
    } = this.props;

console.log(input.onChange);
console.log(input);

    const props = generator ? {
      ...input,
      disabled: readOnly,
      defaultValue: defaultValue,
      onChange: e => {return 0},
      style: {
        borderColor: meta.touched && required && meta.error ? "red" : ""
      },
    } : {}
    
    return (
      <div>
        <HeaderLabel
          label={generator ? label : item.label}
          required={generator ? required : item.required}
          readOnly={readOnly}
        />
        <input 
          {...props}
          type={type}
          className={className} 
        />
        {generator ? showError(meta.touched, meta.error, meta.warning) : ''}
      </div>
    );
  }
}

FileInput.defaultProps = {
  generator: false,
  readOnly: false,
  className: "form-control",
}

export default FileInput;
