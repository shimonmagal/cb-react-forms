import React from "react";
import map from "lodash/map";
import switchItems from "../FormInputs/switchItems";

const FinalFormPreview = ({ hideFinalPreview, data }) => (
  <div className="final-preview">
    <div
      className="jumbotron bg-default mt-3 mx-auto"
      style={{
				minHeight: "100%",
        maxWidth: "700px",
        border: "1px solid #ccc"
      }}
    >
      <div style={{ height: "50px" }}>
        <span
          className="float-right"
          style={{ cursor: "pointer" }}
          onClick={hideFinalPreview}
        >
          <i className="fa fa-times" />
        </span>
      </div>
      {map(data, item => (
        <div key={item.id} className="mb-4">
            <fieldset disabled={item.readOnly}>
                {switchItems(item)}
            </fieldset>
        </div>
      ))}
      <div style={{ height: "50px" }} className="mt-5">
        <hr />
        <button
          className="btn btn-outline-secondary float-right"
          onClick={hideFinalPreview}
        >
          Close
        </button>
      </div>
    </div>
  </div>
);

export default FinalFormPreview;
