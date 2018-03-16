export const lengthSafeProperties: { [property: string]: 0 } = {
  background: 0,
  backgroundPosition: 0,
  backgroundPositionX: 0,
  backgroundPositionY: 0,
  backgroundSize: 0,
  blockSize: 0,
  border: 0,
  borderBlockEnd: 0,
  borderBlockEndWidth: 0,
  borderBlockStart: 0,
  borderBlockStartWidth: 0,
  borderBottom: 0,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  borderBottomWidth: 0,
  borderInlineEnd: 0,
  borderInlineEndWidth: 0,
  borderInlineStart: 0,
  borderInlineStartWidth: 0,
  borderLeft: 0,
  borderLeftWidth: 0,
  borderRadius: 0,
  borderRight: 0,
  borderRightWidth: 0,
  borderSpacing: 0,
  borderTop: 0,
  borderTopLeftRadius: 0,
  borderTopRightRadius: 0,
  borderTopWidth: 0,
  borderWidth: 0,
  bottom: 0,
  boxShadow: 0,
  columnGap: 0,
  columnRule: 0,
  columnRuleWidth: 0,
  columnWidth: 0,
  flexBasis: 0,
  fontSize: 0,
  gridAutoColumns: 0,
  gridAutoRows: 0,
  gridColumnGap: 0,
  gridGap: 0,
  gridRowGap: 0,
  gridTemplateColumns: 0,
  gridTemplateRows: 0,
  height: 0,
  inlineSize: 0,
  left: 0,
  letterSpacing: 0,
  lineHeightStep: 0,
  margin: 0,
  marginBlockEnd: 0,
  marginBlockStart: 0,
  marginBottom: 0,
  marginInlineEnd: 0,
  marginInlineStart: 0,
  marginLeft: 0,
  marginRight: 0,
  marginTop: 0,
  mask: 0,
  maskPosition: 0,
  maskSize: 0,
  maxBlockSize: 0,
  maxHeight: 0,
  maxInlineSize: 0,
  maxWidth: 0,
  minBlockSize: 0,
  minHeight: 0,
  minInlineSize: 0,
  minWidth: 0,
  offset: 0,
  offsetBlockEnd: 0,
  offsetBlockStart: 0,
  offsetDistance: 0,
  offsetInlineEnd: 0,
  offsetInlineStart: 0,
  offsetPosition: 0,
  outline: 0,
  outlineOffset: 0,
  outlineWidth: 0,
  padding: 0,
  paddingBlockEnd: 0,
  paddingBlockStart: 0,
  paddingBottom: 0,
  paddingInlineEnd: 0,
  paddingInlineStart: 0,
  paddingLeft: 0,
  paddingRight: 0,
  paddingTop: 0,
  perspective: 0,
  perspectiveOrigin: 0,
  right: 0,
  scrollSnapCoordinate: 0,
  scrollSnapDestination: 0,
  shapeMargin: 0,
  textIndent: 0,
  textShadow: 0,
  top: 0,
  transformOrigin: 0,
  verticalAlign: 0,
  width: 0,
  wordSpacing: 0,
};

export type TimeProperties = 'animationDelay' | 'animationDuration' | 'transitionDelay' | 'transitionDuration';

export const timeSafeProperties: { [property: string]: 0 } = {
  animationDelay: 0,
  animationDuration: 0,
  transitionDelay: 0,
  transitionDuration: 0,
};

// Hyphenate properties
const uppercaseRegex = /[A-Z]/g;
for (const properties of [lengthSafeProperties, timeSafeProperties]) {
  for (const property in properties) {
    properties[property.replace(uppercaseRegex, '-$&').toLowerCase()] = 0;
  }
}