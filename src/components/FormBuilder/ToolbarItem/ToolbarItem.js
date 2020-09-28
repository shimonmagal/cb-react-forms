import React from "react";
import classNames from "classnames";
import { DragSource } from "react-dnd";
import { connect } from "react-redux";
import { compose } from "redux";
import { addItem } from "../../../actions/formBuilderActions";
import isEqual from "lodash/isEqual";
import {findDOMNode} from "react-dom";

// type, spec and collect are the paramters to the DragSource HOC
const type = props => "items";

const spec = {
  beginDrag(props) {
    return {
      item: props.data.key
    };
  },
  endDrag(props, monitor, component) {
    if (!monitor.didDrop()) return; // return if not dropped in the Preview component
    props.addItem(props.data);
	
    const dragIndex = monitor.getItem().index;
	const hoverIndex = props.index;

	console.log("--" + dragIndex + " " + hoverIndex);
	
	// Don't replace items with themselves
	if (isEqual(dragIndex, hoverIndex)) {
		return;
    }
	
	// Determine rectangle on screen
	const hoverBoundingRect = findDOMNode(
	  component
    ).getBoundingClientRect();

  // Get vertical middle
  const hoverMiddleY =
	  (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

  // Determine mouse position
  const clientOffset = monitor.getClientOffset();

  // Get pixels to the top
  const hoverClientY = clientOffset.y - hoverBoundingRect.top;
	
	  console.log("--2-- " + hoverMiddleY + " " + hoverClientY);
	
	  // Only perform the move when the mouse has crossed half of the items height
  // When dragging downwards, only move when the cursor is below 50%
  // When dragging upwards, only move when the cursor is above 50%
  // Dragging downwards
  if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
	  return;
  }

  // Dragging upwards
  if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
	  return;
  }

  console.log("debug");
  console.log(dragIndex);
  console.log(hoverIndex);
  console.log(monitor.getItem());
  console.log(props);
  console.log(component);
  console.log("done debug----");

  // Time to actually perform the action
  props.dragItem(dragIndex, hoverIndex);

  // Note: we're mutating the monitor item here!
  // Generally it's better to avoid mutations,
  // but it's good here for the sake of performance
  // to avoid expensive index searches.
  monitor.getItem().index = hoverIndex;
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
        {props.itemsALogo ? <img width="65" height="28" src={props.itemsALogo}/> : <div/>}
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
  DragSource(type, spec, collect)
)(ToolbarItem);
