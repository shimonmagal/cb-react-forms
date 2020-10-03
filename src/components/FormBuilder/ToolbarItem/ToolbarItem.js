import React from "react";
import classNames from "classnames";
import {DragSource, DropTarget} from "react-dnd";
import { connect } from "react-redux";
import { compose } from "redux";
import { addItem, removeItem, finializeItem } from "../../../actions/formBuilderActions";
import isEqual from "lodash/isEqual";
import {findDOMNode} from "react-dom";
import {flow} from "lodash";

// type, spec and collect are the paramters to the DragSource HOC
const type = props => "item";

const spec = {
	beginDrag(props)
	{
		const toRet = [];
		props.addItem(props.data, toRet);

		props.data.id = toRet[0].id;
		
		return toRet[0];
	},
	endDrag(props, monitor, component)
	{
		if (!monitor.didDrop()) props.removeItem(props.data.id); // return if not dropped in the Preview component
		
		props.finializeItem(props.data.id);
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
      addItem, removeItem, finializeItem
    },
  ),
DragSource(type, spec, collect)
)(ToolbarItem);
