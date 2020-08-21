import React, { Component } from "react";
import HeaderLabel from "./HeaderLabel";
import './FormadComponent'

class NumberInput extends FormadComponent {
  constructor(props)
  {
    super(props)

    this.first = true;
  }

  componentDidUpdate()
  {
    if (this.props.defaultValue && this.first)
    {
      this.props.input.onChange(this.props.defaultValue || 0);
      this.first = false;
    }
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
          type={type}
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
