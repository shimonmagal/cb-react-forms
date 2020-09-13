import React from 'react';
import PropTypes from 'prop-types';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import { compose } from "redux";
import { connect } from 'react-redux';
import FormEditor from './FormEditor';
import Toolbar from './Toolbar';
import Preview from './Preview';
import defaultItems from "./Toolbar/defaultItems";

const Builder = ({
  editorVisible,
  onSubmit,
  onSubmitAs,
  items,
  previewItems2
}) => {

  return (
    <React.Fragment>
      {
        editorVisible &&
        <FormEditor />
      }
      <div className="container">
        <div className="row mt-3">
          <div className="col-md-8">
            <Preview
              previewItems2={previewItems2}
              onSubmit={onSubmit}
              onSubmitAs={onSubmitAs}
            />
          </div>
          <div className="col-md-4">
            <Toolbar 
              items={items} 
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

Builder.propTypes = {
	onSubmit: PropTypes.func.isRequired,
  onSubmitAs: PropTypes.func.isRequired,
	items: PropTypes.array,
  previewItems2: PropTypes.array
};

Builder.defaultProps = {
	items: defaultItems()
}

export default compose(
  connect(
    state => ({ 
      editorVisible : state.formBuilder.editorVisible 
    }), 
    null
  ),
  DragDropContext(HTML5Backend)
)(Builder);