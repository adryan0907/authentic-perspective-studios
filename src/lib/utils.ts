/** Join class names, skipping falsy values. */
export function cx(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** Zero-padded editorial index, e.g. 3 -> "03". */
export function pad(n: number): string {
  return String(n).padStart(2, "0");
}
