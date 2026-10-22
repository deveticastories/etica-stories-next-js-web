// Spacing, font sizes, radii and breakpoints measured from the 1440px Figma frame.
const Sizes = {
  designWidth: 1440,

  fontSize: {
    xs: 14,
    sm: 15,
    base: 16,
    md: 18,
    lg: 22,
    xl: 24,
    about: 36,
    heading: 52,
    hero: 58,
    stat: 72,
  },

  lineHeight: {
    sm: 22,
    base: 24,
    md: 26,
    heading: 55,
    about: 55,
    hero: 60,
  },

  radius: {
    sm: 12,
    md: 16,
    lg: 20,
    full: 9999,
  },

  button: {
    height: 44,
    heightLg: 52,
  },

  navbar: {
    width: 1110,
    height: 73,
    top: 37,
  },

  breakpoints: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
  },
} as const;

export default Sizes;
