/**
 * Clean Class Propname as function
 * @param {string} name string
 * @return {string}
 */
export function useReadablePropName(name: string): string {
  if (name.charAt(0) !== "_") return name;

  return name.substring(1);
}
