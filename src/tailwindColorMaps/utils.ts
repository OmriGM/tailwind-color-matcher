export const validateHexColor = (hex: string): boolean => {
  const regex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  return regex.test(hex);
};
