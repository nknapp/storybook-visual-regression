// src/components/Task.stories.js

import React from "react";
import { action } from "@storybook/addon-actions";

import { MyList } from "./MyList";

export default {
  component: MyList,
  title: "MyList",
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

const emptyList = [];
export const Empty = () => <MyList elements={emptyList} />;

const singleElementList = [
  {
    name: "Test",
  },
];
export const SingleElement = () => <MyList elements={singleElementList} />;

const multiElementList = [
  {
    name: "First Element",
  },
  {
    name: "Second Element",
  },
];
export const MultiElement = () => <MyList elements={multiElementList} />;
