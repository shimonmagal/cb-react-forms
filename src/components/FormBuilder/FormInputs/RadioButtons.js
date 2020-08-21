import React, { Component } from "react";
import HeaderLabel from "./HeaderLabel";
import map from 'lodash/map';
import FormadComponent from './FormadComponent';

class RadioButtons extends FormadComponent {
  render() {
    const  {
      id,
      meta,
      type,
      item,
      label,
      input,
      required,
      readOnly,
      generator,
      showError,
      defaultValue,
    } = this.props;

    const options = generator ? this.props.options : this.props.item.options;

    const _props = generator ? {
      ...input,
      disabled: readOnly,
    } : {}

    const isChecked = (id) => {
      return generator 
      ? defaultValue === id || input.value === id 
      : null
    }

    const change = (id) => {
      return generator
      ? () => input.onChange(id)
      : () => {}
    }
    
    return (
      <React.Fragment>
        <HeaderLabel 
          label={generator ? label : item.label} 
          required={generator ? required : item.required}
          readOnly={readOnly}
        />
        <div className="form-group">
          {map(options, option => (
            <div className="d-block" key={option.id}>
              <input
                {..._props}
                id={option.id}
                name={generator ? id : item.id}
                type={type}
                value={option.id}
                checked={isChecked(option.id)}
                onChange={change(option.id)}
              />
              <label className="form-label ml-2" htmlFor={option.id}>
                {option.label}
              </label>
            </div>
          ))}
        </div>
        {generator ? showError(meta.touched, meta.error, meta.warning) : ''}
      </React.Fragment>
    );
  }
}

RadioButtons.defaultProps = {
  generator: false,
  disabled: false,
  type: "radio"
}

export default RadioButtons;