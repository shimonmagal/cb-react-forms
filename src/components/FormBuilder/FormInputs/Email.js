import React, { Component } from "react";
import HeaderLabel from "./HeaderLabel";
import './FormadComponent'

class Email extends FormadComponent {
  render() {
    
    const { 
      type,
      item,
      meta,
      input,
      label,
      readOnly,
      required,
      generator,
      showError,
      defaultValue,
    } = this.props;

    const props = generator ? {
      type,
      ...input,
      disabled: readOnly,
      className: "form-control",
      value: defaultValue || input.value,
      onChange: e => input.onChange(e.target.value),
      style: {
        borderColor: meta.touched && required && meta.error ? "red" : ""
      },
    } : {
      type,
      className: "form-control",
    }

    return (
      <React.Fragment>
        <HeaderLabel
          label={generator ? label : item.label}
          required={generator ? required : item.required}
          readOnly={readOnly}
        />
        <input {...props} />
        {generator ? showError(meta.touched, meta.error, meta.warning) : ''}
      </React.Fragment>
    );
  }
}

Email.defaultProps = {
  generator: false
};

export default Email;
