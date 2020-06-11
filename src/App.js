import React, {useState} from 'react';
import './App.css';
import styled from 'styled-components'
import {Popover} from "./Popover";

const StAppContainer= styled.div`
    position: absolute;
    left: 50px;
    right: 50px;
    top: 50px;
    bottom: 50px;
`;

const StRectangle = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    width: 100px;
    height: 100px;
    background-color: ${props => props.color};
`

function App() {
    const [referenceElement, setReferenceElement] = useState();
    const [color, setColor] = useState('blue')

    function onClick() {
        setColor(oldColor => oldColor === 'blue' ? 'red' : 'blue')
    }
    return (
        <StAppContainer>
            <StRectangle ref={setReferenceElement} onClick={onClick} color={color}/>
            <Popover referenceElement={referenceElement} />
        </StAppContainer>
    );
}

export default App;
