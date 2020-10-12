import React, { Component } from 'react';
import HeaderLabel from './HeaderLabel';

class Hyperlink extends Component {
  render() {
		const  {
			type,
			meta,
			item,
			input,
			label,
			readOnly,
      required,
			generator,
      className,
			showError,
      placeholder,
			defaultValue,
		} = this.props;
	
	  const finalReadOnly = readOnly || item.readOnly;
	
	  const _props = generator ? {
			...input,
			style: {borderColor: meta.touched && required && meta.error ? "red" : ""},
			value: defaultValue || input.value,
			disabled: readOnly,
			onChange: e => input.onChange(e.target.value)
		} : {}

    return (
			<React.Fragment>
				<HeaderLabel 
					label={generator ? label : item.label } 
					required={generator ? required : item.required}
					readOnly={readOnly} 
				/>
				<input 
          {..._props}
					type={type}
          className={className}
					placeholder={placeholder}
                    disabled={finalReadOnly}
				/>
				{generator ? showError(meta.touched, meta.error, meta.warning) : ''}
			</React.Fragment>
    );
  }
}

Hyperlink.defaultProps = {
  generator: false,
  className: "form-control",
  placeholder: "https://www.example.com"
}

export default Hyperlink;