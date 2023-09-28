export const flattenColors = (
  colors: Record<string, string | Record<string, string>>,
): Record<string, string> => {
  const colorMap: Record<string, string> = {};
  for (const [colorKey, colorValue] of Object.entries(colors)) {
    if (typeof colorValue === 'string') {
      colorMap[colorKey] = colorValue;
    } else if (typeof colorValue === 'object') {
      for (const [shade, shadeValue] of Object.entries(colorValue)) {
        const flatKey = `${colorKey}-${shade}`;
        colorMap[flatKey] = shadeValue;
      }
    }
  }
  return colorMap;
};
