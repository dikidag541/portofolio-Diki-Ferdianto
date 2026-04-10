import React from 'react';
import { useMagnetic } from '../hooks/useMagnetic';

interface MagneticProps {
  children: React.ReactElement<any>;
}

const Magnetic = ({ children }: MagneticProps) => {
  const { ref } = useMagnetic();

  return React.cloneElement(children, { 
    ref: (node: any) => {
      // @ts-ignore
      ref.current = node;
      const { ref: childRef } = children as any;
      if (typeof childRef === 'function') {
        childRef(node);
      } else if (childRef) {
        childRef.current = node;
      }
    }
  });
};

export default Magnetic;
