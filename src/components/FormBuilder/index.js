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
  items,
  editorState
}) => {
  return (
    <React.Fragment>
      {
        editorVisible &&
        <FormEditor editorState={editorState} />
      }
      <div className="container">
        <div className="row mt-3">
          <div className="col-md-8">
            <Preview 
              onSubmit={onSubmit} 
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
	items: PropTypes.array
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