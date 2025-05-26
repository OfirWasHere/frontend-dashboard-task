import React from "react";
import { useOutlet } from "react-router";

function Root() {
  const outlet = useOutlet();
  return outlet;
}

export default Root;
