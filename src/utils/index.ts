export const loadCSS = (url: string) => {
  const css = document.createElement('link');
  css.rel = 'stylesheet';
  css.href = url;
  document.head.appendChild(css);
}

export function numberToFull(value:number) {
  const charList = Array.from(String(value)).map(char => {
    const code = char.charCodeAt(0);
    if (code >= 48 && code <= 57) {
      return String.fromCharCode(code + 65248);
    }
    return char;
  });
  return charList.join('');
}

export interface StyleObject {
  [key: string]: string | number | StyleObject; // 定义样式对象的属性类型
}

export const inheritProp = (obj: StyleObject, parentObj: StyleObject = {}): StyleObject => {
  const inheritPropList: string[] = ['fontFamily', 'fontSize', 'fontStyle', 'fontWeight', 'lineHeight', 'letterSpacing', 'wordSpacing'];

  inheritPropList.forEach((inherit: string) => {
    if (!Object.prototype.hasOwnProperty.call(obj, inherit) && Object.prototype.hasOwnProperty.call(parentObj, inherit)) {
      obj[inherit] = parentObj[inherit];
    }
  });

  Object.keys(obj).forEach((key: string) => {
    if (typeof obj[key] === 'object' && !Array.isArray(obj[key]) && obj[key] !== null) {
      inheritProp(obj[key] as StyleObject, obj); // 类型断言为 StyleObject
    }
  });

  return obj;
};