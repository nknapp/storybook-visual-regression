import React, {useState} from "react";
import styled from "styled-components";

const StListWrapper = styled.div`
  border: 2px solid red;
  background-color: yellow;
`;

export function MyList({ elements, title }) {
  const [count, setCount] = useState(0)

  if (elements.length === 0) {
    return <StListWrapper><b>The list is empty</b></StListWrapper>;
  }
  return (
    <StListWrapper onClick={() => setCount(count + 1)}>
      {count}
      <ul className={'mylist'}>
        {elements.map((element) => (
          <li key={element.name}>{element.name}</li>
        ))}
      </ul>
    </StListWrapper>
  );
}
