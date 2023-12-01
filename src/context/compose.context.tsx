import React, { ReactNode, FC } from 'react';

export interface IComposeContext {
  components?: FC<{ children?: ReactNode }>[];
  children?: ReactNode | undefined;
}
export default function ComposeContext(props: IComposeContext) {
  const { components = [], children } = props;
  return (
    <>
      {components.reduceRight((accumulatedResult, Comp) => {
        return <Comp>{accumulatedResult}</Comp>;
      }, children)}
    </>
  );
}
