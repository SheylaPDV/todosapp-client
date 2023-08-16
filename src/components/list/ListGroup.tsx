import React, { ReactNode } from "react";

interface ListGroupProps {
  children: ReactNode;
}

export default function ListGroup({ children }: ListGroupProps) {
  return <ol className='list-group list-group-numbered'>{children}</ol>;
}
