import { Style } from '@glitz/type';
import {
  PropsWithoutRef,
  RefAttributes,
  PropsWithChildren,
  ComponentType,
  forwardRef,
  useContext,
  createElement,
  Ref,
} from 'react';
import { StyleContext } from '../components/context';
import { isElementLikeType, StyledElementLike } from './apply-class-name';
import { SECRET_COMPOSE } from './constants';
import { StyledDecorator } from './decorator';
import { isElementType, StyledElement } from './predefined';
import { StyledComponent, StyledComponentWithRef, StyledElementProps } from './types';
import useGlitz from './use-glitz';
import { useAbsorb, useForward } from './compose';

export type WithRefProp<TProps, TInstance> = PropsWithoutRef<TProps> & RefAttributes<TInstance>;

// Conditionally omit `StyledProps` enables support for union props
export type ExternalProps<TProps> = PropsWithChildren<
  TProps & {
    css?: StyledDecorator | Style[] | Style;
  }
>;

export default function create<TProps>(
  type:
    | StyledElement
    | StyledElementLike<ComponentType<TProps & StyledElementProps>>
    | StyledComponent<TProps>
    | StyledComponentWithRef<TProps, any>
    | ComponentType<TProps>,
  statics: Style[],
): StyledComponent<TProps>;

export default function create<TProps, TInstance>(
  type:
    | StyledElement
    | StyledElementLike<ComponentType<WithRefProp<TProps, TInstance>>>
    | StyledComponentWithRef<TProps, TInstance>
    | ComponentType<WithRefProp<TProps, TInstance>>,
  statics: Style[],
): StyledComponentWithRef<TProps, TInstance> {
  return isStyledComponent<TProps, TInstance>(type) ? type[SECRET_COMPOSE](statics) : factory(type, statics);
}

export function factory<TProps, TInstance>(
  type:
    | StyledElement
    | StyledElementLike<ComponentType<WithRefProp<TProps, TInstance>>>
    | ComponentType<WithRefProp<TProps, TInstance>>,
  statics: Style[],
): StyledComponentWithRef<TProps, TInstance> {
  const Component = isElementType(type)
    ? forwardRef(({ css: dynamic, ...restProps }: ExternalProps<TProps>, ref: Ref<TInstance>) =>
        useAbsorb(dynamics => {
          const { universal, [type.value]: pre } = useContext(StyleContext) ?? {};
          const className = combineClassNames(
            (restProps as any).className,
            useGlitz(universal, pre, statics, dynamic, dynamics),
          );

          return createElement<any>(type.value, {
            ...restProps,
            className,
            ref,
          });
        }),
      )
    : isElementLikeType<TProps, TInstance>(type)
    ? forwardRef(({ css: dynamic, ...restProps }: ExternalProps<TProps>, ref: Ref<TInstance>) =>
        useAbsorb(dynamics => {
          const className = combineClassNames((restProps as any).className, useGlitz(statics, dynamic, dynamics));

          return createElement<any>(type.value, {
            ...restProps,
            className,
            ref,
          });
        }),
      )
    : forwardRef(({ css: dynamic, ...restProps }: ExternalProps<TProps>, ref: Ref<TInstance>) =>
        useForward(
          statics,
          dynamic,
          createElement<any>(type, { ...restProps, ref }),
        ),
      );

  const Styled: StyledComponentWithRef<TProps, TInstance> = Object.assign(Component, {
    [SECRET_COMPOSE](additionals?: Style[]) {
      const NewStyled = factory(type, additionals ? statics.concat(additionals) : statics);

      if (Component.defaultProps) {
        NewStyled.defaultProps = {};

        for (const name in Component.defaultProps) {
          (NewStyled.defaultProps as any)[name] = (Component.defaultProps as any)[name];
        }
      }

      if (process.env.NODE_ENV !== 'production') {
        NewStyled.displayName = Component.displayName;
      }

      return NewStyled;
    },
  });

  if (process.env.NODE_ENV !== 'production') {
    const inner = isElementType(type) || isElementLikeType<TProps, TInstance>(type) ? type.value : type;
    Styled.displayName = `Styled(${typeof inner === 'string' ? inner : inner.displayName || inner.name || 'Unknown'})`;
  }

  return Styled;
}

function combineClassNames(a: string | undefined, b: string | undefined) {
  return a && b ? `${a} ${b}` : a ? a : b;
}

export function isStyledComponent<TProps, TInstance>(
  type: any,
): type is StyledComponent<TProps> | StyledComponentWithRef<TProps, TInstance> {
  return SECRET_COMPOSE in type;
}
