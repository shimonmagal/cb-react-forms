import React, {useContext} from "react";
import {Accordion, AccordionContext, Card, useAccordionToggle} from 'react-bootstrap';
import ToolbarItem from "../ToolbarItem/ToolbarItem";
import './Toolbar.css';

function ContextAwareToggle({ caption, eventKey, callback }) {
    const currentEventKey = useContext(AccordionContext);
    
    const decoratedOnClick = useAccordionToggle(
        eventKey,
        () => callback && callback(eventKey),
    );
    
    const isCurrentEventKey = currentEventKey === eventKey;
    
    return (
      <div
        className="ToolboxHeader"
        onClick={decoratedOnClick}
      >
        <h4
          className="text-center mt-3"
          style={{ height: "50px", margin: 0 }}
        >
          {caption}
          <i className={`fa fa-angle-right ${isCurrentEventKey ? "isRotated" : ""}`} />
        </h4>
      </div>
    );
}

const Toolbar = ({ itemsA, itemsACaption, itemsALogo, itemsB, itemsBCaption }) => (
  <React.Fragment>
    <Accordion defaultActiveKey="0">
      <Card>
        <Card.Header>
          <ContextAwareToggle eventKey="0" caption={itemsACaption} />
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            <ul className="list-group" style={{marginBottom: "10px !important"}}>
              {itemsA.map(item => (
                <ToolbarItem data={item} key={item.key} itemsALogo={itemsALogo} />
                  ))}
            </ul>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
    
    <hr />
    
    <Accordion defaultActiveKey="0">
      <Card>
        <Card.Header>
          <ContextAwareToggle eventKey="0">
            <h3
              className="text-center mt-3"
              style={{ height: "50px", margin: 0 }}
            >
              {itemsBCaption}
            </h3>
          </ContextAwareToggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            <ul className="list-group">
              {itemsB.map(item => (
                <ToolbarItem data={item} key={item.key} />
                          ))}
            </ul>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
      
  </React.Fragment>
);

export default Toolbar;
