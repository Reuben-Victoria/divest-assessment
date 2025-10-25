import React, { Fragment, type ReactNode } from "react";

interface RenderIfProps {
  children: ReactNode;
  condition: boolean;
}

const RenderIf: React.FC<RenderIfProps> = (props) => {
  const { condition, children } = props;

  if (!condition) {
    return null;
  }

  return <Fragment>{children}</Fragment>;
};

export default RenderIf;
