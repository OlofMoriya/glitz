import { createStyled } from './styled/custom';
import { assignPredefined } from './styled/predefined';

export { default as useStyle } from './styled/use-glitz';
export { default as useTheme } from './styled/use-theme';
export * from './styled/apply-class-name';
export * from './styled/types';

export const styled = assignPredefined(createStyled);
