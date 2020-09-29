import React from "react";
import classNames from "classnames";
import { DragSource, DropTarget } from "react-dnd";
import { connect } from "react-redux";
import { compose } from "redux";
import isEqual from "lodash/isEqual";
import {findDOMNode} from "react-dom";
import { addItem } from "../../../actions/formBuilderActions";

// type, spec and collect are the paramters to the DragSource HOC
const type = props => "items";

const spec2 = {
	hover(props, monitor, component)
	{
		console.log(props);
		console.log(monitor);
		console.log(monitor.getItem());
		console.log(component);
	}
}

const spec = {
  beginDrag(props) {
    return {
      item: props.data.key
    };
  }
};

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging()
});

const ToolbarItem = props => {
  const { isDragging, connectDragSource, data } = props;

  const opacity = isDragging ? 0.5 : 1;
  const backgroundColor = isDragging ? "lightgray" : "white";

  return connectDragSource(
    <li
      style={{ cursor: "pointer", opacity, backgroundColor }}
      className="list-group-item mb-1 toolbar-item"
      onClick={() => props.addItem(props.data)}
    >
      <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
        <div>
          <i className={classNames(data.icon, "mr-3")} />
          {data.name}
        </div>
        {props.itemsALogo ? <img width="65" height="28" src={props.itemsALogo} /> : <div />}
      </div>
    </li>
  );
};

export default compose(
  connect(
    state => ({
      previewItems: state.formBuilder
    }),
    {
      addItem
    }
  ),
  DragSource(type, spec, collect),
	DropTarget(type, spec2, connect => ({
		connectDropTarget: connect.dropTarget()}))
)(ToolbarItem);
