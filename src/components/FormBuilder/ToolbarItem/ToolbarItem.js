import React from "react";
import classNames from "classnames";
import {DragSource, DropTarget} from "react-dnd";
import { connect } from "react-redux";
import { compose } from "redux";
import isEqual from "lodash/isEqual";
import {findDOMNode} from "react-dom";
import { addItem, removeItem, finalizeItem } from "../../../actions/formBuilderActions";

// type, spec and collect are the paramters to the DragSource HOC
const type = props => "item";

const spec = {
	beginDrag(props)
	{
		const toRet = [];
		props.addItem(props.data, toRet);

		if (toRet.length > 0)
		{
			props.data.id = toRet[0].id;
			
			return toRet[0];
		}
		
			props.data.alreadyThere = true;
			
			return null;
		
	},
	endDrag(props, monitor, component)
	{
		if (!monitor.didDrop())
		{
			if (!props.data.alreadyThere)
			{
				props.removeItem(props.data.id);
			}
		}
		else
		{
			props.finalizeItem(props.data.id);
		}
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
      style={{ cursor: "pointer", opacity, backgroundColor, height: "35px" }}
      className="list-group-item mb-1 toolbar-item"
      onClick={() => props.addItem(props.data)}
    >
      <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: "-5px"}}>
        <div>
          <i className={classNames(data.icon, "mr-3")} />
          {data.name}
        </div>
        {props.itemsALogo ? <img width="65" height="28" src={props.itemsALogo} style={{marginTop: "-5px"}} /> : <div />}
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
      addItem, removeItem, finalizeItem
    },
  ),
DragSource(type, spec, collect)
)(ToolbarItem);
