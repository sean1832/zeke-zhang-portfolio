/**
 * Formats the input string based on the specified format type.
 *
 * @param {string} inputString - The string to be formatted.
 * @param {'ALL_CAPS' | 'ALL_LOWER' | 'CAP_FIRST'} formatType - The type of formatting to apply.
 *  - 'ALL_CAPS': converts the string to uppercase.
 *  - 'ALL_LOWER': converts the string to lowercase.
 *  - 'CAP_FIRST': capitalizes the first letter of each word in the string.
 * @returns {string} The formatted string.
 */
export function formatText(inputString, formatType) {
  switch (formatType) {
    case "ALL_CAPS":
      return inputString.toUpperCase();
    case "ALL_LOWER":
      return inputString.toLowerCase();
    case "CAP_FIRST":
      return inputString
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    default:
      return inputString;
  }
}
