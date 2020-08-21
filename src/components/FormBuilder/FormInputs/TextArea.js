import React, { Component } from "react";
import HeaderLabel from "./HeaderLabel";
import FormadComponent from './FormadComponent';

class TextArea extends FormadComponent {
  render() {
    const  {
      meta,
      item,
      input,
      label,
      readOnly,
      required,
      className,
      generator,
      showError,
      defaultValue,
    } = this.props;

    const _props = generator ? {
      ...input,
      disabled: readOnly,
      value: defaultValue || input.value,
      onChange: e => input.onChange(e.target.value),
      style: {
        borderColor: meta.touched && required && meta.error ? "red" : ""
      }
    } : {}

    return (
      <React.Fragment>
        <HeaderLabel 
          label={generator ? label : item.label} 
          required={generator ? required : item.required} 
        />
        <textarea 
          {..._props}
          className={className} 
        />
        {generator ? showError(meta.touched, meta.error, meta.warning) : ''}
      </React.Fragment>
    );
  }
}

TextArea.defaultProps = {
  generator: false,
  className: "form-control"
}

export default TextArea;
