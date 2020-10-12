import React, { Component } from 'react';
import HeaderLabel from './HeaderLabel';
import DatePicker from 'react-date-picker';
import FormadComponent from './FormadComponent';

class DatePick extends FormadComponent {
  render() {
    const  {
      meta,
      item,
      input,
      label,
      required,
      readOnly,
      formInput,
      generator,
      showError,
      defaultValue,
    } = this.props;
  
    const finalReadOnly = readOnly || item.readOnly;
  
    const _props = generator ? {
      value: defaultValue || input.value,
      onChange: val => input.onChange(val),
      disabled: readOnly,
    } : {
      value: new Date()
    }
    
    const renderDate = (minDate = null, maxDate = null) => {
      switch(true) {
        case minDate !== null && maxDate !== null:
          return <DatePicker 
                    {..._props}
                    maxDate={new Date(maxDate)}
                    minDate={new Date(minDate)}
                  />

        case minDate !== null:
          return <DatePicker 
                    {..._props}
                    minDate={new Date(formInput.minDate)}
                  />

        case  maxDate !== null:
          return <DatePicker 
                    {..._props}
                    maxDate={new Date(formInput.maxDate)}
                  />
        
        default:
          return <DatePicker {..._props} />
      }
    }

    return (
      <div>
        <React.Fragment>
          <HeaderLabel 
            label={generator ? label : item.label } 
            required={generator ? required : item.required}
            readOnly={readOnly} 
          />
          <fieldset disabled={finalReadOnly}>
            {generator
              ? renderDate(formInput.minDate, formInput.maxDate)
              : <DatePicker {..._props} />}
            <div>
              {generator ? showError(meta.touched, meta.error, meta.warning) : ''}
            </div>
          </fieldset>
        </React.Fragment>
      </div>
    )
  }
}

DatePick.defaultProps = {
  generator: false,
  disabled: false
}

export default DatePick;