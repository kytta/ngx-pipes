export function isUndefined(value: unknown): value is undefined {
  return value === undefined;
}

export function isNull(value: unknown): value is null {
  return value === null;
}

export function isFunction(value: unknown): value is (...args: unknown[]) => unknown {
  return typeof value === 'function';
}

export function isNumber(value: unknown): value is number {
  return typeof value === 'number';
}

export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean';
}

export function isObject(value: any): boolean {
  return value !== null && typeof value === 'object';
}

export function isNumberFinite(value: unknown): value is number {
  return isNumber(value) && Number.isFinite(value);
}

export function isVowel(letter: string): boolean {
  const vowels = ['a', 'e', 'i', 'o', 'u'];

  return vowels.indexOf(letter) !== -1;
}

export function ucFirst(text: string): string {
  const [part, ...split] = text.split(/\s/g);

  const ucd = part
    .toLowerCase()
    .split(/(?=['|-])/g)
    .map((word) =>
      word.indexOf('-') + word.indexOf("'") > -2
        ? word.slice(0, 2).toUpperCase() + word.slice(2)
        : word.slice(0, 1).toUpperCase() + word.slice(1)
    )
    .join('');

  return [ucd, ...split].join(' ');
}

export function applyPrecision(num: number, precision: number): number {
  if (precision <= 0) {
    return Math.round(num);
  }

  const tho = 10 ** precision;

  return Math.round(num * tho) / tho;
}

export function extractDeepPropertyByMapKey(obj: Record<string, unknown>, map: string): any {
  const keys = map.split('.');
  const head = keys.shift();

  return keys.reduce(
    (prop: Record<string, unknown>, key: string) => {
      return !isUndefined(prop) && !isNull(prop) && !isUndefined(prop[key]) ? prop[key] : undefined;
    },
    obj[head || '']
  );
}

export function extractDeepPropertyByParentMapKey(obj: Record<string, unknown>, map: string): any {
  const keys = map.split('.');
  const tail = keys.pop();
  const props = extractDeepPropertyByMapKey(obj, keys.join('.'));

  return { props, tail };
}

export function getKeysTwoObjects(obj: object, other: object): string[] {
  return [...Object.keys(obj), ...Object.keys(other)].filter((key, index, array) => array.indexOf(key) === index);
}

export function isDeepEqual(obj: any, other: any): any {
  if (!isObject(obj) || !isObject(other)) {
    return obj === other;
  }

  return getKeysTwoObjects(obj, other).every((key: any): boolean => {
    if (!isObject(obj[key]) && !isObject(other[key])) {
      return obj[key] === other[key];
    }
    if (!isObject(obj[key]) || !isObject(other[key])) {
      return false;
    }

    return isDeepEqual(obj[key], other[key]);
  });
}
