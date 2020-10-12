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
      id,
    } = this.props;
  
    const finalReadOnly = readOnly || item.readOnly;
  
    const props = generator ? {
      ...input,
      disabled: readOnly,
      defaultValue,
      onChange: e => input.onChange(e.target.value),
      style: {
        borderColor: meta.touched && required && meta.error ? "red" : ""
      },
    } : {}
  
    let placeholder = "";
  
    if ((item || id) && !finalReadOnly)
    {
      const realId = (item ? item.id : null) || id;
  
      if (/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(realId))
      {
        placeholder = "Enter numeric value here";
      }
      else
      {
        placeholder = `Enter ${realId} here`;
      }
    }
    
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
          placeholder={placeholder}
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
