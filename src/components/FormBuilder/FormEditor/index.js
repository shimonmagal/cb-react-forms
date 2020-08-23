import React, { Component } from "react";
import { connect } from "react-redux";
import uuid from "uuid/v4";
import { Editor } from "react-draft-wysiwyg";
import { convertFromRaw, EditorState, convertToRaw } from "draft-js";
import { map, filter } from "lodash";
import {
  hideEditor,
  submitEditorState
} from "../../../actions/formBuilderActions";
import DatePicker from 'react-date-picker';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

// toolbar options for the WYSIWYG Editor
const toolbar = {
  options: [
    "inline",
    "list",
    "textAlign",
    "fontSize",
    "link",
    "history"
  ],
  inline: {
    inDropdown: false,
    options: [
      "bold",
      "italic",
      "underline",
      "superscript",
      "subscript"
    ]
  }
};

class FormEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: {
        ...props.editorState,
        label: EditorState.createWithContent(
          convertFromRaw(props.editorState.label)
        )
      }
    };
  }

  toggleField = field => {
    this.setState(prevState => ({
      editorState: {
        ...this.state.editorState,
        [field]: !prevState.editorState[field]
      }
    }));
  };

  addOption = (element) => {
    let option;
    switch(element) {
      case 'Tags': {
        option = {
          id: uuid(),
          label: "",
          value: ""
        };
        break;
      }
      case 'Checkboxes': {
        option = {
          id: uuid(),
          value: "",
          checked: false
        }
        break;
      }
      case 'RadioButtons': {
        option = {
          id: uuid(),
          label: "",
          value: "",
          checked: false
        }
        break;
      }
      default: {
        option = {
          id: uuid(),
          value: ""
        }
        break;
      }
    }

    const { options } = this.state.editorState;
    const updatedOptions = [...options, option];
    this.setState({
      editorState: {
        ...this.state.editorState,
        options: updatedOptions
      }
    });
  };

  removeOption = optionId => {
    const { options } = this.state.editorState;
    let updatedOptions = [...options];
    if (options.length > 1) {
      updatedOptions = filter(
        options,
        option => option.id !== optionId
      );
    }

    this.setState({
      editorState: {
        ...this.state.editorState,
        options: updatedOptions
      }
    });
  };

  handleChange = (value, optionId, field) => {
    const { options } = this.state.editorState;

    const updatedOptions = map(options, option => {
      if (option.id === optionId) {
        option[field] = value;
        return option;
      }
      return option;
    });

    this.setState({
      editorState: {
        ...this.state.editorState,
        options: updatedOptions
      }
    });
  };

  handleOptions = (name, value) => {
    this.setState({
      editorState: {
        ...this.state.editorState,
        [name]: value
      }
    });
  };

  // convert draftjs editorState to JS object before saving it in redux store
  handleSubmit = label => {
    const content = label.getCurrentContent();
    this.props.submitEditorState({
      ...this.state.editorState,
      label: convertToRaw(content)
    });
  };

  render() {
    const { hideEditor } = this.props;
    const {
      editorState,
      editorState: {
        element,
        options,
        required,
        readOnly,
        rtl,
        numberOfStars,
        label,
        min,
        max,
        step,
        maxDate,
        minDate,
        height,
        width,
        value
      }
    } = this.state;

    return (
      <div className="form_editor">
        <div
          className="jumbotron bg-default mx-auto mt-3"
          style={{ border: "1px solid #aaa", maxWidth: "800px" }}
        >
          <span
            className="float-right"
            style={{ cursor: "pointer" }}
            onClick={() => hideEditor()}
          >
            <i className="fa fa-times" />
          </span>
          <h2 className="mb-4">{element} Editor</h2>

          {/* ------------- LABEL ------------- */}
          <h5>Label:</h5>
          <Editor
            toolbar={toolbar}
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            editorState={label}
            onEditorStateChange={editorState =>
              this.handleOptions("label", editorState)
            }
          />

          <div className="mt-5">
            {/* ------------- REQUIRED ------------- */}
            {editorState.hasOwnProperty("required") && (
              <div className="form-check">
                <input
                  type="checkbox"
                  id="required"
                  checked={required}
                  onChange={() => this.toggleField("required")}
                />
                <label htmlFor="required" className="form-label ml-2">
                  Required
                </label>
              </div>
            )}
          </div>

          <div className="mt-5">
            {/* ------------- READ ONLY ------------- */}
            {editorState.hasOwnProperty("required") && (
              <div className="form-check">
                <input
                  type="checkbox"
                  id="readOnly"
                  checked={readOnly}
                  onChange={() => this.toggleField("readOnly")}
                />
                <label htmlFor="readOnly" className="form-label ml-2">
                  Read only
                </label>
              </div>
            )}
          </div>
          
            <div className="mt-5">
            {/* ------------- Right to left ------------- */}
            {editorState.hasOwnProperty("required") && (
              <div className="form-check">
                <input
                  type="checkbox"
                  id="rtl"
                  checked={rtl}
                  onChange={() => this.toggleField("rtl")}
                />
                <label htmlFor="rtl" className="form-label ml-2">
                  Right-to-left
                </label>
              </div>
            )}
          </div>

          {/* ------------- DROPDOWN OPTIONS ------------- */}
          {element === "Dropdown" && (
            <div className="mt-5">
              <h5>Options:</h5>
              {map(options, ({ id, value }) => (
                <div key={id} className="input-group mb-2">
                  <input
                    className="form-control"
                    placeholder="Option"
                    value={value}
                    onChange={e =>
                      this.handleChange(e.target.value, id, "value")
                    }
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-danger"
                      disabled={options.length === 1}
                      style={{
                        cursor: `${
                          options.length === 1
                            ? "not-allowed"
                            : "pointer"
                        }`
                      }}
                      onClick={() => {
                        this.removeOption(id);
                      }}
                    >
                      <i className="fa fa-times" />
                    </button>
                  </div>
                </div>
              ))}
              <button
                className="btn btn-primary"
                onClick={this.addOption}
              >
                Add Option
              </button>
            </div>
          )}

          {/* ------------- TAGS OPTIONS ------------- */}
          {element === "Tags" && (
            <div className="mt-5">
              <h5>Options:</h5>
              {map(options, ({ id, value, label }) => (
                <div key={id} className="input-group mb-2">
                  <input
                    className="form-control"
                    value={label}
                    placeholder="Label"
                    onChange={e =>
                      this.handleChange(e.target.value, id, "label")
                    }
                  />
                  <input
                    className="form-control"
                    value={value}
                    placeholder="Value"
                    onChange={e =>
                      this.handleChange(e.target.value, id, "value")
                    }
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-danger"
                      disabled={options.length === 1}
                      style={{
                        cursor: `${
                          options.length === 1
                            ? "not-allowed"
                            : "pointer"
                        }`
                      }}
                      onClick={() => {
                        this.removeOption(id);
                      }}
                    >
                      <i className="fa fa-times" />
                    </button>
                  </div>
                </div>
              ))}
              <button
                className="btn btn-primary"
                onClick={() => this.addOption("Tags")}
              >
                Add Option
              </button>
            </div>
          )}

          {/* ------------- CHECKBOXES OPTIONS ------------- */}
          {element === "Checkboxes" && (
            <div className="mt-5">
              <h5>Options:</h5>
              {map(options, ({ id, value }) => (
                <div key={id} className="input-group mb-2">
                  <input
                    className="form-control"
                    placeholder="Option"
                    value={value}
                    name={editorState.id}
                    onChange={e =>
                      this.handleChange(e.target.value, id, "value")
                    }
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-danger"
                      disabled={options.length === 1}
                      style={{
                        cursor: `${
                          options.length === 1
                            ? "not-allowed"
                            : "pointer"
                        }`
                      }}
                      onClick={() => {
                        this.removeOption(id);
                      }}
                    >
                      <i className="fa fa-times" />
                    </button>
                  </div>
                </div>
              ))}
              <button
                className="btn btn-primary"
                onClick={() => this.addOption("Checkboxes")}
              >
                Add Option
              </button>
            </div>
          )}

          {/* ------------- RADIO BUTTON OPTIONS ------------- */}
          {element === "RadioButtons" && (
            <div className="mt-5">
              <h5>Options:</h5>
              {map(options, ({ id, value, label }) => (
                <div key={id} className="input-group mb-2">
                  <input
                    className="form-control"
                    value={label}
                    placeholder="Label"
                    onChange={e =>
                      this.handleChange(e.target.value, id, "label")
                    }
                  />
                  <input
                    className="form-control"
                    value={value}
                    placeholder="Value"
                    onChange={e =>
                      this.handleChange(e.target.value, id, "value")
                    }
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-danger"
                      disabled={options.length === 1}
                      style={{
                        cursor: `${
                          options.length === 1
                            ? "not-allowed"
                            : "pointer"
                        }`
                      }}
                      onClick={() => {
                        this.removeOption(id);
                      }}
                    >
                      <i className="fa fa-times" />
                    </button>
                  </div>
                </div>
              ))}
              <button
                className="btn btn-primary"
                onClick={() => this.addOption("RadioButtons")}
              >
                Add Option
              </button>
            </div>
          )}

          {/* ------------- RATING OPTIONS ------------- */}
          {element === "Rating" && (
            <div className="mt-5">
              <h5>Number of Stars:</h5>
              <input
                className="form-control"
                type="number"
                value={numberOfStars || ""} // default to empty string to avoid error
                onChange={({ target: { value } }) =>
                  this.handleOptions(
                    "numberOfStars",
                    parseFloat(value)
                  )
                }
                min={0}
              />
            </div>
          )}

          {/* ------------- RANGE OPTIONS ------------- */}
          {element === "Range" && (
            <div className="mt-5">
              <h5>Range Options:</h5>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">Min</span>
                </div>
                <input
                  className="form-control"
                  type="number"
                  name="min"
                  value={min} // default to empty string to avoid error
                  onChange={({ target: { name, value } }) =>
                    this.handleOptions(name, parseFloat(value))
                  }
                  min={0}
                />
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">Max</span>
                </div>
                <input
                  className="form-control"
                  type="number"
                  name="max"
                  value={max}
                  onChange={({ target: { name, value } }) =>
                    this.handleOptions(name, parseFloat(value))
                  }
                  min={0}
                />
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">Step</span>
                </div>
                <input
                  className="form-control"
                  type="number"
                  name="step"
                  value={step}
                  onChange={({ target: { name, value } }) =>
                    this.handleOptions(name, parseFloat(value))
                  }
                  min={1}
                />
              </div>
            </div>
          )}
          
          {/* ------------- DATE PICKER ------------- */}
          {element === "Date" && (
            <div className="mt-5" style={{ display: 'flex'}}>
              <div className="mr-5">
                <h5>Min Date:</h5>
                <DatePicker 
                  value={minDate || new Date()}
                  onChange={value => this.handleOptions('minDate', value)}
                />
              </div>
              <div>
                <h5>Max Date:</h5>
                <DatePicker 
                  value={maxDate || new Date()}
                  onChange={value => this.handleOptions('maxDate', value)}
                />
              </div>
            </div>
          )}
          
          {/* ------------- SIGNATURE ------------- */}
          {element === "Signature" && (
            <div className="mt-5" style={{ display: 'flex'}}>
              <div>
                <h5>Height:</h5>
                <input
                  className="form-control" 
                  type="number" 
                  value={height} 
                  onChange={e => this.handleOptions('height', e.target.value)} 
                />
              </div>
              <div className="ml-5">
                <h5>Width:</h5>
                <input 
                  className="form-control"
                  type="number" 
                  value={width} 
                  onChange={e => this.handleOptions('width', e.target.value)} 
                />
              </div>
            </div>
          )}

          {/* ------------- SUBMIT AND CANCEL BUTTONS ------------- */}
          <button className="btn btn-muted mt-5" onClick={hideEditor}>
            Cancel
          </button>
          <button
            className="btn btn-secondary mt-5"
            onClick={() => this.handleSubmit(label)}
          >
            Done
          </button>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    editorState: state.formBuilder.editorState
  }),
  {
    hideEditor,
    submitEditorState
  }
)(FormEditor);
