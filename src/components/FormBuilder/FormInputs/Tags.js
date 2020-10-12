import React, { Component } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import HeaderLabel from "./HeaderLabel";

class Tags extends Component {

  handleChange = (action, input, removedValue, val) => {
    let newValue = [...input.value];
    switch(action) {
      case 'select-option':
        newValue = [...val];
        break;
      case 'remove-value':
        newValue.splice(newValue.indexOf(removedValue), 1);
        break;
      case 'clear':
        newValue = [];
        break;
    }
    return input.onChange(newValue);
  }

  render() {
    const  {
      meta,
      item,
      input,
      isMulti,
      label,
      readOnly,
      required,
      generator,
      showError,
      defaultValue,
    } = this.props;

    const animatedComponents = makeAnimated();
    
    const options = generator ? this.props.options : this.props.item.options;

    const _props = generator ? {
      value: defaultValue || input.value,
      isDisabled: readOnly,
      onChange: (val, { action, removedValue }) => 
        this.handleChange(action, input, removedValue, val)
    } : {}


    return (
      <React.Fragment>
        <HeaderLabel 
          label={generator ? label : item.label} 
          required={generator ? required : item.required} 
          readOnly={readOnly}
        />
        <Select 
          {..._props}
          isMulti={isMulti}
          options={options}
          components={animatedComponents}
        />
        {generator ? showError(meta.touched, meta.error, meta.warning) : ''}
      </React.Fragment>
    );
  }
}

Tags.defaultProps = {
  generator: false,
  isMulti: true
}

export default Tags;
