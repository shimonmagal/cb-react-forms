import React, {useContext} from "react";
import {Accordion, AccordionContext, Card, useAccordionToggle} from 'react-bootstrap';
import ToolbarItem from "../ToolbarItem/ToolbarItem";

function ContextAwareToggle({ children, eventKey, callback }) {
    const currentEventKey = useContext(AccordionContext);
    
    const decoratedOnClick = useAccordionToggle(
        eventKey,
        () => callback && callback(eventKey),
    );
    
    const isCurrentEventKey = currentEventKey === eventKey;
    
    return (
      <button
        type="button"
        style={{ backgroundColor: isCurrentEventKey ? 'pink' : 'lavender' }}
        onClick={decoratedOnClick}
      >
        {children}
      </button>
    );
}

const Toolbar = ({ itemsA, itemsACaption, itemsALogo, itemsB, itemsBCaption }) => (
  <React.Fragment>
    <Accordion defaultActiveKey="0">
      <Card>
        <Card.Header>
          <ContextAwareToggle eventKey="0">
            <h3
              className="text-center mt-3"
              style={{ height: "50px", margin: 0 }}
            >
              {itemsACaption}
            </h3>
          </ContextAwareToggle>
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
