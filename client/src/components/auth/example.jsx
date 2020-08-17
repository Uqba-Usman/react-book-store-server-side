import React from "react";

const Example = ({ error }) => {
  console.log(error);
  return <div>{error.details["email"]}</div>;
};

export default Example;
