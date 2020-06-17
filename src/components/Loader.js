import React from "react";

const Loader = (props) => {
  const isLoading = props.isLoading;
  if (isLoading) {
    return <div id="loader"></div>;
  } else {
    return null;
  }
};

export default Loader;
