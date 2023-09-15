/* istanbul ignore next */
const SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
const MOZ_HACK_REGEXP = /^moz([A-Z])/;
const ieVersion = Number(document.DOCUMENT_NODE);

/* istanbul ignore next */
const trim = function (str: string) {
  return (str || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '');
};
/* istanbul ignore next */
const camelCase = function (name: any) {
  return name
    .replace(
      SPECIAL_CHARS_REGEXP,
      function (_: any, separator: any, letter: any, offset: any) {
        return offset ? letter.toUpperCase() : letter;
      }
    )
    .replace(MOZ_HACK_REGEXP, 'Moz$1');
};

/* istanbul ignore next */
export const on = (function () {
  return function (element: any, event: any, handler: any) {
    if (element && event && handler) {
      element.addEventListener(event, handler, false);
    }
  };
})();

/* istanbul ignore next */
export const off = (function () {
  return function (element: any, event: any, handler: any) {
    if (element && event) {
      element.removeEventListener(event, handler, false);
    }
  };
})();
/* istanbul ignore next */
export function hasClass(el: any, cls: any) {
  if (!el || !cls) return false;
  if (cls.indexOf(' ') !== -1)
    throw new Error('className should not contain space.');
  if (el.classList) {
    return el.classList.contains(cls);
  } else {
    return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
  }
}

/* istanbul ignore next */
export function addClass(el: any, cls: any) {
  if (!el) return;
  let curClass = el.className;
  const classes = (cls || '').split(' ');

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.add(clsName);
    } else if (!hasClass(el, clsName)) {
      curClass += ' ' + clsName;
    }
  }
  if (!el.classList) {
    el.className = curClass;
  }
}

/* istanbul ignore next */
export function removeClass(el: any, cls: any) {
  if (!el || !cls) return;
  const classes = cls.split(' ');
  let curClass = ' ' + el.className + ' ';

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.remove(clsName);
    } else if (hasClass(el, clsName)) {
      curClass = curClass.replace(' ' + clsName + ' ', ' ');
    }
  }
  if (!el.classList) {
    el.className = trim(curClass);
  }
}

/* istanbul ignore next */
export const getStyle =
  ieVersion < 9
    ? function (element: any, styleName: any) {
        if (!element || !styleName) return null;
        styleName = camelCase(styleName);
        if (styleName === 'float') {
          styleName = 'styleFloat';
        }
        try {
          switch (styleName) {
            case 'opacity':
              try {
                return element.filters.item('alpha').opacity / 100;
              } catch (e) {
                return 1.0;
              }
            default:
              return element.style[styleName] || element.currentStyle
                ? element.currentStyle[styleName]
                : null;
          }
        } catch (e) {
          return element.style[styleName];
        }
      }
    : function (element: any, styleName: any) {
        if (!element || !styleName) return null;
        styleName = camelCase(styleName);
        if (styleName === 'float') {
          styleName = 'cssFloat';
        }
        try {
          const defaultView = document.defaultView as any;
          const computed = defaultView.getComputedStyle(element, '');
          return element.style[styleName] || computed
            ? computed[styleName]
            : null;
        } catch (e) {
          return element.style[styleName];
        }
      };

/* istanbul ignore next */
export function setStyle(element: any, styleName: any, value: any) {
  if (!element || !styleName) return;

  if (typeof styleName === 'object') {
    for (const prop in styleName) {
      // eslint-disable-next-line no-prototype-builtins
      if (styleName.hasOwnProperty(prop)) {
        setStyle(element, prop, styleName[prop]);
      }
    }
  } else {
    styleName = camelCase(styleName);
    if (styleName === 'opacity' && ieVersion < 9) {
      element.style.filter = isNaN(value)
        ? ''
        : 'alpha(opacity=' + value * 100 + ')';
    } else {
      element.style[styleName] = value;
    }
  }
}

export const isScroll = (el: any, vertical: any) => {
  const determinedDirection = vertical !== null || vertical !== undefined;
  const overflow = determinedDirection
    ? vertical
      ? getStyle(el, 'overflow-y')
      : getStyle(el, 'overflow-x')
    : getStyle(el, 'overflow');

  return overflow.match(/(scroll|auto)/);
};

export const getScrollContainer = (el: any, vertical: any) => {
  let parent = el;
  while (parent) {
    if ([window, document, document.documentElement].includes(parent)) {
      return window;
    }
    if (isScroll(parent, vertical)) {
      return parent;
    }
    parent = parent.parentNode;
  }

  return parent;
};

export const isInContainer = (el: any, container: any) => {
  if (!el || !container) return false;

  const elRect = el.getBoundingClientRect();
  let containerRect;

  if (
    [window, document, document.documentElement, null, undefined].includes(
      container
    )
  ) {
    containerRect = {
      top: 0,
      right: window.innerWidth,
      bottom: window.innerHeight,
      left: 0
    };
  } else {
    containerRect = container.getBoundingClientRect();
  }

  return (
    elRect.top < containerRect.bottom &&
    elRect.bottom > containerRect.top &&
    elRect.right > containerRect.left &&
    elRect.left < containerRect.right
  );
};
