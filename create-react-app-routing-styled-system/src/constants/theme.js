const theme = {
  colors: {
    primaryTextColor: "black",
    primaryBgColor: "white",
    primaryAccentColor: "red",
  },
  breakpoints: {
    tell: "480px",
    tablet: "768px",
    desktop: "1200px",
  },
  spacing: (value) => `${4 * value}px`,
  space: [0, 2, 4, 8, 15, 32, 60, 94, 128, 256],
  fontSizes: {
    xxxxs: "",
    xxxs: "",
    xxs: "",
    xs: "",
    s: "",
    m: "",
    l: "",
    xl: "",
    xxl: "",
    xxxl: "",
    xxxxl: "",
    xxxxxl: "",
  },
  fontWeight: {
    normal: 500,
    bolt: 700,
    superBolt: 900,
  },
  radii: {
    none: "0",
    normal: "4px",
    round: "50%",
  },
  fontFamily: {
    roboto: "'Roboto', sans-serif",
  },
};

export default theme;
