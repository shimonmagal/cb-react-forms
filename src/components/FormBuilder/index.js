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
  itemsA,
  itemsACaption,
  itemsALogo,
  itemsB,
  itemsBCaption,
  previewItems2
}) => (
  <React.Fragment>
    {
        editorVisible &&
        <FormEditor />
      }
    <div className="container">
      <div className="row mt-3">
        <div className="col-md-9">
          <Preview
            previewItems2={previewItems2}
            onSubmit={onSubmit}
            onSubmitAs={onSubmitAs}
          />
        </div>
        <div className="col-md-3">
          <div style={{position: "sticky", top: "0px"}}>
            <Toolbar
              itemsA={itemsA}
              itemsACaption={itemsACaption}
              itemsALogo={itemsALogo}
              itemsB={itemsB}
              itemsBCaption={itemsBCaption}
            />
          </div>
        </div>
      </div>
    </div>
  </React.Fragment>
  )

Builder.propTypes = {
	onSubmit: PropTypes.func.isRequired,
  onSubmitAs: PropTypes.func.isRequired,
  itemsA: PropTypes.array,
  itemsACaption: PropTypes.string,
  itemsALogo: PropTypes.string,
  itemsB: PropTypes.array,
  itemsBCaption: PropTypes.string,
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