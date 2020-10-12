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
    
    let placeholder = "";
  
    console.log(this.props);
    console.log(JSON.stringify(this.props));
  
    if (item)
    {
      if (/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(item.id))
      {
        placeholder = "Enter answer here";
      }
      else if (!readOnly)
      {
        placeholder = `Enter ${item.id} here`;
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
          {..._props}
          type={type}
          className={className}
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
