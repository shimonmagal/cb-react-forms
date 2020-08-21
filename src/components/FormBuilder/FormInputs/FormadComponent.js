import React, { Component } from "react";

class FormadComponent extends Component {
  constructor(props)
  {
    super(props)

    this.first = true;
  }

  componentDidUpdate()
  {
    if (this.props.defaultValue && this.first)
    {
      this.props.input.onChange(this.props.defaultValue);
      this.first = false;
    }
  }
}

export default FormadComponent;
