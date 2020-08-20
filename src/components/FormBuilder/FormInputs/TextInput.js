import React, { Component } from "react";
import HeaderLabel from "./HeaderLabel";

class TextInput extends Component {
  componentWillMount()
  {
    this.props.input.onChange(this.props.defaultValue || "");
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

    const _props = generator ? {
      ...input,
      disabled: readOnly,
      value: input.value,
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
          {..._props}
          type={type}
          className={className} 
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
