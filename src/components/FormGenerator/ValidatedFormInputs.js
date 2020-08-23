import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { compose } from "redux";
import map from "lodash/map";
import convertDraftjsToHtml from "../FormBuilder/FormInputs/convertDraftjsToHtml";
import { 
  isRequired, 
  validateUrl, 
  isNumber,
  validateRatingsAndRange
} from "./formValidations";
import { 
  Tags,
  Range,	
  Email, 
  Label, 
  Header,
  Rating,
  TextArea, 
  Dropdown, 
  DatePick,
  Paragraph, 
  Signature, 
  Hyperlink,
  TextInput, 
  Checkboxes, 
  HeaderLabel,
  NumberInput,
  RadioButtons, 
} from "../FormBuilder/FormInputs";

class ValidatedFormInputs extends Component {
  
  showError = (touched, error, warning) =>
    touched &&
    ((error && <span className="text-danger m-3">{error}</span>) ||
      (warning && <span className="text-warning">{warning}</span>));

  formInputLabel = (label, required) => (
    <React.Fragment>
      {required ? (
        !this.props.readOnly &&
        <span
          className="badge badge-danger float-right"
        >
          Required
        </span>
      ) : null}
      <h6 dangerouslySetInnerHTML={{ __html: label }} />
    </React.Fragment>
  );

  render() {
    const {
      formData,
      onSubmit,
      readOnly,
      pristine,
      responseData,
      handleSubmit
    } = this.props;

    const urlValidator = formInput =>
      formInput.required ? [isRequired, validateUrl] : [validateUrl];

    return (
      <form onSubmit={handleSubmit(values => onSubmit(JSON.stringify(values)))}>
        {map(formData, formInput => {
          const { id, element, value, options, required } = formInput;

          let label;
          let labelText;
          if (element !== "LineBreak") {
            // richText label
            label = convertDraftjsToHtml(formInput.label);

            // text label
            labelText =
              formInput.label.blocks &&
              formInput.label.blocks[0].text;
          }

          return (
          <fieldset disabled={formInput.readOnly}>
            <div key={formInput.id} className="mb-4" dir={formInput.rtl ? "rtl": "ltr"}>
              {/* -------------- HEADER -------------- */}
              {element === "Header" && (
                <Header item={{ label: formInput.label }} />
              )}

              {/* -------------- PARAGRAPH -------------- */}
              {element === "Paragraph" && (
                <Paragraph item={{ label: formInput.label }} />
              )}

              {/* -------------- LABEL -------------- */}
              {element === "Label" && (
                <Label item={{ label: formInput.label }} />
              )}

              {/* -------------- LINEBREAK -------------- */}
              {element === "LineBreak" && <hr />}

              {/* -------------- INPUT TAG -------------- */}
              {element === "TextInput" && (
                <div className="form-group">
                  <Field
                    name={id}
                    component={TextInput}
                    validate={required ? [isRequired] : null}
                    props={{
                      id,
                      required,
                      readOnly,
                      generator: true,
                      label: formInput.label,
                      showError: this.showError,
                      defaultValue: responseData && responseData[id],
                    }}
                  />
                </div>
              )}
              
              {/* -------------- EMAIL TAG -------------- */}
              {element === "Email" && (
                <div className="form-group">
                  <Field
                    name={id}
                    component={Email}
                    validate={required ? [isRequired] : null}
                    props={{
                      id,
                      required,
                      readOnly,
                      type: "email",
                      generator: true,
                      required: required,
                      label: formInput.label,
                      showError: this.showError,
                      defaultValue: responseData && responseData[id],
                    }}
                  />
                </div>
              )}

              {/* -------------- TEXTAREA -------------- */}
              {element === "TextArea" && (
                <div className="form-group">
                  <Field
                    name={id}
                    component={TextArea}
                    validate={required ? [isRequired] : null}
                    props={{
                      id,
                      readOnly,
                      generator: true,
                      required: required,
                      label: formInput.label,
                      showError: this.showError,
                      defaultValue: responseData && responseData[id],
                    }}
                  />
                </div>
              )}

              {/* -------------- NUMBER INPUT TAG -------------- */}
              {element === "NumberInput" && (
                <div className="form-group">
                  <Field
                    name={id}
                    component={NumberInput}
                    validate={
                      required ? [isRequired, isNumber] : [isNumber]
                    }
                    props={{
                      id,
                      readOnly,
                      type: "number",
                      generator:true,
                      required: required,
                      readOnly: readOnly,
                      label: formInput.label,
                      showError: this.showError,
                      defaultValue: responseData && responseData[id],
                    }}
                  />
                </div>
              )}

              {/* -------------- DROPDOWN -------------- */}
              {element === "Dropdown" && (
                <React.Fragment>
                  <Field
                    name={id}
                    component={Dropdown}
                    validate={required ? [isRequired] : null}
                    props={{
                      id,
                      options,
                      readOnly,
                      generator: true,
                      required: required,
                      label: formInput.label,
                      showError: this.showError,
                      defaultValue: responseData && responseData[id],
                    }}
                  />
                </React.Fragment>
              )}

              {/* -------------- CHECKBOXES -------------- */}
              {element === "Checkboxes" && (
                <React.Fragment>
                  <Field
                    name={id}
                    component={Checkboxes}
                    validate={required ? [isRequired] : null}
                    props={{
                      options,
                      readOnly,
                      generator: true,
                      type: 'checkbox',
                      required: required,
                      label: formInput.label,
                      showError: this.showError,
                      defaultValue:
                        (responseData && responseData[id]) || []
                    }}
                  />
                </React.Fragment>
              )}

              {/* -------------- TAGS -------------- */}
              {element === "Tags" && (
                <React.Fragment>
                  <Field
                    name={id}
                    component={Tags}
                    validate={required ? [isRequired] : null}
                    props={{
                      id,
                      options,
                      readOnly,
                      generator: true,
                      label: formInput.label,
                      showError: this.showError,
                      defaultValue: responseData && responseData[id],
                    }}
                  />
                </React.Fragment>
              )}

              {/* -------------- RADIO BUTTONS -------------- */}
              {element === "RadioButtons" && (
                <React.Fragment>
                  <Field
                    name={id}
                    component={RadioButtons}
                    validate={required ? [isRequired] : null}
                    props={{
                      id,
                      options,
                      readOnly,
                      generator: true,
                      required: required,
                      label: formInput.label,
                      showError: this.showError,
                      defaultValue: responseData && responseData[id],
                    }}
                  />
                </React.Fragment>
              )}

              {/* -------------- STAR RATING -------------- */}
              {element === "Rating" && (
                <React.Fragment>
                  <Field
                    name={id}
                    component={Rating}
                    validate={required ? [validateRatingsAndRange] : null}
                    props={{
                      id,
                      readOnly,
                      generator: true,
                      required: required,
                      label: formInput.label,
                      showError: this.showError,
                      numberOfStars: formInput.numberOfStars,
                      defaultValue: responseData && responseData[id],
                    }}
                  />
                </React.Fragment>
              )}

              {/* -------------- HYPERLINK -------------- */}
              {element === "HyperLink" && (
                <React.Fragment>
                  <Field
                    name={id}
                    component={Hyperlink}
                    validate={urlValidator(formInput)}
                    props={{
                      id,
                      value,
                      readOnly,
                      type:"text",
                      generator:true,
                      required: required,
                      label: formInput.label,
                      showError: this.showError,
                      defaultValue: responseData && responseData[id],
                    }}
                  />
                </React.Fragment>
              )}

              {/* -------------- RANGE -------------- */}
              {element === "Range" && (
                <React.Fragment>
                  <Field
                    name={id}
                    component={Range}
                    validate={required ? [validateRatingsAndRange] : null}
                    props={{
                      id,
                      readOnly,
                      formInput,
                      generator: true,
                      required: required,
                      label: formInput.label,
                      showError: this.showError,
                      defaultValue: responseData && responseData[id],
                    }}
                  />
                </React.Fragment>
              )}

              {/* -------------- DATE PICKER -------------- */}
              {element === "Date" && (
                <React.Fragment>
                  <Field
                    name={id}
                    component={DatePick}
                    validate={required ? [isRequired] : null}
                    props={{
                      id,
                      readOnly,
                      formInput,
                      generator: true,
                      required: required,
                      label: formInput.label,
                      showError: this.showError,
                      defaultValue: responseData && responseData[id],
                    }}
                  />
                </React.Fragment>
              )}

              {/* -------------- SIGNATURE -------------- */}
              {element === "Signature" && (
                <React.Fragment>
                  <Field
                    name={id}
                    component={Signature}
                    validate={required ? [isRequired] : null}
                    props={{
                      id,
                      readOnly,
                      formInput,
                      generator: true,
                      showError: this.showError,
                      defaultValue: responseData && responseData[id],
                    }}
                  />
                </React.Fragment>
              )}
            </div>
          </fieldset>
          );
        })}
        {!readOnly && (
          <div style={{ height: "50px" }} className="mt-5">
            <button
              className="btn btn-primary float-right mr-3"
              style={{
                cursor: `${pristine ? "not-allowed" : "pointer"}`
              }}
              type="submit"
              disabled={pristine}
            >
              Submit
            </button>
          </div>
        )}
      </form>
    );
  }
}

export default compose(
  reduxForm({
    form: "form"
  })
)(ValidatedFormInputs);