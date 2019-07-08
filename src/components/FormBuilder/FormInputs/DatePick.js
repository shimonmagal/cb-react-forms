import React, { Component } from 'react';
import HeaderLabel from './HeaderLabel';
import DatePicker from 'react-date-picker';

class DatePick extends Component {
  render() {
		const  {
			meta,
			item,
			input,
			readOnly,
			formInput,
			generator,
			showError,
			defaultValue,
		} = this.props;

    return (
      <div>
				{
					!generator &&
					<React.Fragment>
						<HeaderLabel label={item.label} required={item.required} />
						<DatePicker 
							value={new Date()}
						/>
					</React.Fragment>
				}
				{
					generator &&
					<React.Fragment>
						{
							formInput.maxDate &&
							formInput.minDate
							? <DatePicker 
									value={defaultValue || input.value}
									onChange={val => input.onChange(val)}
									disabled={readOnly}
									maxDate={new Date(formInput.maxDate)}
									minDate={new Date(formInput.minDate)}
								/>
							: formInput.minDate 
								? <DatePicker 
										value={defaultValue || input.value}
										onChange={val => input.onChange(val)}
										disabled={readOnly}
										minDate={new Date(formInput.minDate)}
									/>
								: formInput.maxDate
									? <DatePicker 
											value={defaultValue || input.value}
											onChange={val => input.onChange(val)}
											disabled={readOnly}
											maxDate={new Date(formInput.maxDate)}
										/>
									: <DatePicker 
											value={defaultValue || input.value}
											onChange={val => input.onChange(val)}
											disabled={readOnly}
										/>	
						}
						<div>
							{showError(meta.touched, meta.error, meta.warning)}
						</div>
					</React.Fragment>
				}
      </div>
    )
  }
}

DatePick.defaultProps = {
	generator: false
}

export default DatePick;