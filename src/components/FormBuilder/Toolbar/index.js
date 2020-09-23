import React from "react";
import ToolbarItem from "../ToolbarItem/ToolbarItem";

const Toolbar = ({ itemsA, itemsACaption, itemsB, itemsBCaption }) => (
  <React.Fragment>
    <h3
      className="text-center mt-3"
      style={{ height: "50px", margin: 0 }}
    >
      {itemsACaption}
    </h3>
    <ul className="list-group">
      {itemsA.map(item => (
        <ToolbarItem data={item} key={item.key} />
      ))}
    </ul>

    <br/>
    <hr/>
    <br/>

   <h3
      className="text-center mt-3"
      style={{ height: "50px", margin: 0 }}
    >
      {itemsBCaption}
    </h3>
    <ul className="list-group">
      {itemsB.map(item => (
        <ToolbarItem data={item} key={item.key} />
      ))}
    </ul>
  </React.Fragment>
);

export default Toolbar;
