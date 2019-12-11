import { Style } from '@glitz/type';
import * as React from 'react';
import { StyledElementFunctions } from '../styled/types';
import { ElementPreStyle, StyleContext } from './context';

export type PreStyleProps = { [tag in keyof StyledElementFunctions]?: Style };

type StyleProviderProps = PreStyleProps & { include?: PreStyleProps };

export function StyleProvider({ children, include, ...restProps }: React.PropsWithChildren<StyleProviderProps>) {
  const pre: ElementPreStyle = React.useContext(StyleContext) ?? {};

  for (const map of [include, restProps]) {
    if (map) {
      let tag: keyof StyledElementFunctions;
      for (tag in map) {
        pre[tag] = tag in pre ? [...pre[tag], map[tag]!] : [map[tag]!];
      }
    }
  }

  return React.createElement(StyleContext.Provider, { value: pre }, children);
}