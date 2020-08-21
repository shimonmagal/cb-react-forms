import React, { Component } from "react";
import StarRatings from "react-star-ratings";
import HeaderLabel from "./HeaderLabel";
import FormadComponent from './FormadComponent';

class Rating extends FormadComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: 0
    };
  }

  render() {
    const  {
      meta,
      item,
      name,
      input,
      label,
      readOnly,
      required,
      generator,
      showError,
      defaultValue,
      numberOfStars,
    } = this.props;

    const _props = generator ? {
      numberOfStars: numberOfStars,
      isSelectable: !readOnly,
      rating: defaultValue || input.value || 0,
      changeRating: val => input.onChange(val)
    } : {
      numberOfStars: item.numberOfStars,
      rating: this.state.value,
      changeRating: value => this.setState({ value })
    }

    return (
      <div>
        <React.Fragment>
          <HeaderLabel 
            label={generator ? label : item.label} 
            required={generator ? required : item.required} 
            readOnly={readOnly}
          />
          <StarRatings
            {..._props}
            name={name}
            starHoverColor="chocolate"
            starRatedColor="orange"
          />
          <div>
            {generator ? showError(meta.touched, meta.error, meta.warning) : ''}
          </div>
        </React.Fragment>
      </div>
    );
  }
}

Rating.deaultProps = {
  generator: false,
  name: "rating"
}

export default Rating;
