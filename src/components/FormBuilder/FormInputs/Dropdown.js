import React, { Component } from 'react';
import HeaderLabel from './HeaderLabel';
import FormadComponent from './FormadComponent';

class Dropdown extends FormadComponent {
  render() {
    const  {
      meta,
      item,
      label,
      input,
      disabled,
      required,
      readOnly,
      className,
      generator,
      showError,
      defaultValue,
    } = this.props;
  
    const finalReadOnly = readOnly || item.readOnly;
  
    const _props = generator ? {
      ...input,
      disabled: readOnly,
      defaultValue,
      onChange: e => {
        console.log(e.target.value)
        input.onChange(e.target.value)
      },
      style: {
        borderColor: meta.touched && required && meta.error ? "red" : ""
      },
    } : {}

    const options = generator ? this.props.options : this.props.item.options; 

    return (
      <React.Fragment>
        <HeaderLabel 
          label={generator ? label : item.label} 
          required={generator ? required : item.required} 
          readOnly={readOnly}
        />
        <select 
          className={className} 
          disabled={finalReadOnly}
          {..._props}
        >
          <option value={null} />
          {options.map(({ id, value }) => (
            <option key={id} value={value}>{value}</option>
          ))}
        </select>
        {generator ? showError(meta.touched, meta.error, meta.warning) : ''}
      </React.Fragment>
    );
  }
}

Dropdown.defaultProps = {
  disabled: false,
  generator: false,
  className: 'form-control'
}

export default Dropdown;