/**
 * This function coerces a string into a string literal type.
 * Using tagged union types in TypeScript 2.0, this enables
 * powerful typechecking of our reducers.
 *
 * Since every action label passes through this function it
 * is a good place to ensure all of our action labels
 * are unique.
 */

const typeCache: { [label: string]: boolean } = {};
export function type<T>(label: T | ''): T {
  if (typeCache[label as string]) {
    throw new Error(`Action type "${label}" is not unique"`);
  }

  typeCache[label as string] = true;

  return label as T;
}

/**
 * Method to check Microsoft Internet Explorer version
 * Will return `false` for version < 11
 */
export function isSupportedIe(): boolean { // Detect IE 10 or below...
  if (!(window as any).ScriptEngineMajorVersion) { return true; }
  return (window as any).ScriptEngineMajorVersion && (window as any).ScriptEngineMajorVersion() > 10;
}

/**
 * Method to check Apple Safari browser version.
 * will return `false` for browsers other than safari.
*/
export function iOSVersion(): boolean | number {
  const match = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
  let version;

  if (match !== undefined && match !== null) {
    version = [
      parseInt(match[1], 10),
      parseInt(match[2], 10),
      parseInt(match[3] || '0', 10)
    ];
    return parseFloat(version.join('.'));
  }
  return false;
}

/**
 * @description use to auto generate the field
 */
export function generateNewGuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    // tslint:disable-next-line: no-bitwise
    const r = Math.random() * 16 | 0,
      // tslint:disable-next-line: no-bitwise
      v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
