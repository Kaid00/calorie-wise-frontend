export function formatEnumKey(key: string): string {
  return key
    .replace(/([A-Z])/g, " $1") // Add space before uppercase letters
    .replace(/^./, (str) => str.toUpperCase()); // Capitalize the first letter
}
