import { usePopper } from "react-popper";

import { createPortal } from "react-dom";
import React, { useState } from "react";
import styled from "styled-components";

const StPopperContainer = styled.div`
  border: 1px solid black;
  width: 300px;
  height: 200px;
`;

const StArrow = styled.div`
  width: 10px;
  height: 10px;
  vertical-align: center;
  text-align: center;
  
  ${(props) => props.where}: -6px;
  :before {
    position: absolute;
    left: 0px;
    top: 0px;
    display: block;
    content: '';
    width: 10px;
    height: 10px;
    border: 1px solid black;
    border-right: none;
    border-bottom: none;
    background-color:white;
    transform: rotate(${(props) => props.rotate});    
    transform-origin: center center;
  }
`;

export function Popover({ referenceElement }) {
    const [popperElement, setPopperElement] = useState(null);
  const [arrowElement, setArrowElement] = React.useState(null);
  let popper;
  const { state, styles, attributes } = (popper = usePopper(
    referenceElement,
    popperElement,
    {
      modifiers: [
        { name: "arrow", options: { element: arrowElement } },
        { name: "offset", options: { offset: [0, 10] } },
      ],
      placement: "bottom-start",
    }
  ));

  function createArrow(popoverPlacement) {
    if (popoverPlacement == null) {
      return null;
    }
    if (popoverPlacement.match(/bottom/)) {
      return <StArrow ref={setArrowElement} style={styles.arrow} where={"top"} rotate={"45deg"} />;
    }
    if (popoverPlacement.match(/top/)) {
      return <StArrow ref={setArrowElement} style={styles.arrow} where={"bottom"} rotate={"225deg"} />;
    }
  }

  function createPopover() {
    return (
      <StPopperContainer
        ref={setPopperElement}
        style={styles.popper}
        {...attributes.popper}
      >
        abc
        {createArrow( state?.placement)}
      </StPopperContainer>
    );
  }

  return createPortal(createPopover(), document.body);
}
