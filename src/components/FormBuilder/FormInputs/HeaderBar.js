import React, {Component} from "react";

class HeaderBar extends Component {
  renderTag()
  {
      // is uuid
      if (/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(item.id))
      {
          return item.element;
      }
      
      return item.id;
  }

  render() {
    const {item, removeItem, id, showEditor, isHovering} = this.props;
    const opacity = isHovering ? 1 : 0;

    return (
      <div style={{opacity}}>
        <span className="badge badge-secondary">
          {this.renderTag(item)}
        </span>
        <span
          onClick={() => removeItem(id)}
          className="float-right onHover"
        >
          <i className="fa fa-trash-o" />
        </span>
        {item.element !== "LineBreak" && (
          <span
            onClick={() => showEditor(item)}
            className="float-right onHover"
          >
            <i className="fa fa-edit mr-3" />
          </span>
        )}
      </div>
    );
  }
}

export default HeaderBar;
