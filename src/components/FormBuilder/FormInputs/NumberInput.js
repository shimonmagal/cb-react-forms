import React, { Component } from "react";
import HeaderLabel from "./HeaderLabel";
import FormadComponent from './FormadComponent';

class NumberInput extends FormadComponent {
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

    const props = generator ? {
      ...input,
      disabled: readOnly,
      defaultValue: defaultValue,
      onChange: e => input.onChange(e.target.value),
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
          type="number"
          className={className} 
        />
        {generator ? showError(meta.touched, meta.error, meta.warning) : ''}
      </div>
    );
  }
}

NumberInput.defaultProps = {
  generator: false,
  readOnly: false,
  className: "form-control",
}

export default NumberInput;
