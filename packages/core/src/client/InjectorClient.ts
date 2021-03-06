// tslint:disable no-conditional-assignment

import Injector from '../core/Injector';
import { injectSheetRule, isCSSStyleSheet } from '../utils/dom';
import { formatClassRule, formatFontFaceRule, formatKeyframesRule } from '../utils/format';

const CLASS_RULE_REGEX = /\.([a-z0-9]+)([:\[][^{]+)?\{([^}]+)\}/g;
const KEYFRAMES_REGEX = /@keyframes ([a-z0-9]+)\{((?:[a-z0-9%]+\{[^}]+\})+)\}/g;
const FONT_FACE_REGEX = /@font-face \{(.+?;font-family:([^}]+))\}/g;

export default class InjectorClient extends Injector {
  constructor(styleElement: HTMLStyleElement, incrementClassHash: () => string, incrementKeyframesHash: () => string) {
    const plainIndex: { [block: string]: string } = {};
    const selectorIndex: { [selector: string]: { [block: string]: string } } = {};
    const keyframesIndex: { [blockList: string]: string } = {};
    const fontFaceIndex: { [block: string]: string } = {};

    // Hydrate
    const css = styleElement.textContent;
    if (css) {
      let rule: RegExpExecArray | null;
      while ((rule = CLASS_RULE_REGEX.exec(css))) {
        incrementClassHash();
        const index = rule[2] ? (selectorIndex[rule[2]] = selectorIndex[rule[2]] || {}) : plainIndex;
        index[rule[3]] = rule[1];
      }
      while ((rule = KEYFRAMES_REGEX.exec(css))) {
        incrementKeyframesHash();
        keyframesIndex[rule[2]] = rule[1];
      }
      while ((rule = FONT_FACE_REGEX.exec(css))) {
        fontFaceIndex[rule[1]] = rule[2];
      }
    }

    const sheet = styleElement.sheet;

    if (!isCSSStyleSheet(sheet)) {
      throw new Error('HTMLStyleElement was not inserted properly into DOM');
    }

    const injectNewClassRule = (className: string, block: string, selector?: string) => {
      const rule = formatClassRule(className, block, selector);
      injectSheetRule(sheet, rule);
    };

    const injectNewKeyframesRule = (name: string, blockList: string) => {
      const rule = formatKeyframesRule(name, blockList);
      injectSheetRule(sheet, rule);
    };

    const injectNewFontFaceRule = (block: string) => {
      const rule = formatFontFaceRule(block);
      injectSheetRule(sheet, rule);
    };

    super(
      plainIndex,
      selectorIndex,
      keyframesIndex,
      fontFaceIndex,
      incrementClassHash,
      incrementKeyframesHash,
      injectNewClassRule,
      injectNewKeyframesRule,
      injectNewFontFaceRule,
    );
  }
}
