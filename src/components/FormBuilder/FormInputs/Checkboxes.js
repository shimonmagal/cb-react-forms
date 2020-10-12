import React, { Component } from 'react';
import HeaderLabel from './HeaderLabel';
import map from 'lodash/map';
import FormadComponent from './FormadComponent';

class Checkboxes extends FormadComponent {

  handleChange = (checked, input, id) => {
    let newValue = [...input.value];
    checked 
      ? newValue = [...newValue, id] 
      : newValue = newValue.filter(i => i !== id); 
    return input.onChange(newValue)
  }

  render() {
    const {
      type,
      meta,
      item,
      label,
      input,
      disabled,
      required,
      readOnly,
      generator,
      showError,
      className,
      defaultValue,
    } = this.props;
  
    const finalReadOnly = readOnly || item.readOnly;
  
    const _props = generator ? {
      type,
      disabled: readOnly,
    } : {
      disabled
    }
    
    const isChecked = (id) => {
      return generator 
        ? defaultValue.some(i => i === id) 
          || (Array.isArray(input.value) 
          && input.value.some(i => i === id))
        : null
    }

    const change = (checked, id) => {
      return generator 
        ? this.handleChange(checked, input, id) 
        : () => {}
    }

    const options = generator ? this.props.options : this.props.item.options; 

    return (
      <React.Fragment>
        <HeaderLabel 
          label={generator ? label : item.label} 
          required={generator ? required : item.required}
          readOnly={readOnly} 
        />
        <div className="form-group">
          {map(options, ({ id, value }) => (
            <div key={id} className="d-block">
              <input 
                {..._props}
                type="checkbox"
                id={value}
                name={value}
                value={value}
                readOnly={generator ? false : true}
                disabled={finalReadOnly}
                className={className}
                checked={isChecked(id)}
                onChange={e => change(e.target.checked, id)}
              />
              <label className="form-label ml-2" htmlFor={value}>
                {value}
              </label>
            </div>
          ))}
        </div>
        {generator ? showError(meta.touched, meta.error, meta.warning) : ''}
      </React.Fragment>
    );
  }
}

Checkboxes.defaultProps = {
  disabled: false,
  generator: false,
  className: 'mr-2'
}

export default Checkboxes;