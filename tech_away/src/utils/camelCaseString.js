function toCamelCase(input) {
  return input
    .split(/[^a-zA-Z0-9]+/)
    .map((word, index) => {
      const lower = word.toLowerCase();
      if (index === 0) return lower;
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join('');
}


export default toCamelCase;
