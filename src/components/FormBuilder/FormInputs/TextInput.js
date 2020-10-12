import React, { Component } from "react";
import HeaderLabel from "./HeaderLabel";
import FormadComponent from './FormadComponent';

class TextInput extends FormadComponent {
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
      defaultValue
    } = this.props;

    const _props = generator ? {
      ...input,
      disabled: readOnly,
      value: input.value,
      onChange: e => input.onChange(e.target.value),
      style: {
        borderColor: meta.touched && required && meta.error ? "red" : ""
      },
    } : {}
    
    const finalLabel = generator ? label : item.label;
    
    let placeholder = "";
    if (finalLabel == "TextInput")
    {
      placeholder = "Enter answer here";
    }
    else if (!readOnly)
    {
      placeholder = "Enter " + finalLabel + " here";
    }
    
    return (
      <div>
        <HeaderLabel
          label={finalLabel}
          required={generator ? required : item.required}
          readOnly={readOnly}
        />
        <input 
          {..._props}
          type={type}
          className={className}
          disabled={readOnly}
          placeholder={placeholder}
        />
        {generator ? showError(meta.touched, meta.error, meta.warning) : ''}
      </div>
    );
  }
}

TextInput.defaultProps = {
  generator: false,
  className: "form-control"
}

export default TextInput;
