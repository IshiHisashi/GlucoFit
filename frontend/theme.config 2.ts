import { config as defaultConfig } from "@gluestack-ui/config";
import { createConfig } from "@gluestack-ui/themed";

const extendedConfig = createConfig({
  ...defaultConfig,
  tokens: {
    ...defaultConfig.tokens,
    fonts: {
      ...defaultConfig.tokens.fonts,
      heading: "NunitoSans-Bold",
      body: "NunitoSans-Regular",
      bold: "NunitoSans-Bold",
      semibold: "NunitoSans-SemiBold",
      regular: "NunitoSans-Regular",
    },
    fontWeights: {
      ...defaultConfig.tokens.fontWeights,
      // light: 300,
      // normal: 700,
      // medium: 500,
      // semibold: 600,
      // bold: "700",
    },
    colors: {
      ...defaultConfig.tokens.colors,
      primaryIndigo5: "#FAF8FF",
      primaryIndigo10: "#ECE5FF",
      primaryIndigo20: "#CCB7FF",
      primaryIndigo30: "#AB8AFF",
      primaryIndigo40: "#8A5CFF",
      primaryIndigo50: "#692EFF",
      primaryIndigo60: "#4800FF",
      primaryIndigo70: "#3D00D6",
      primaryIndigo80: "#3100AD",
      primaryIndigo90: "#260085",
      primaryIndigo100: "#1A005C",
      secondaryR10: "#FFEDE9",
      secondaryR20: "#FFDAD3",
      secondaryR30: "#FFC8BC",
      secondaryR40: "#FFB5A6",
      secondaryR50: "#FF907A",
      secondaryR60: "#FF6B4D",
      secondaryR70: "#FF4621",
      secondaryR80: "#CC381A",
      secondaryR90: "#992A14",
      secondaryR100: "#661C0D",
      secondaryY5: "#FFFAEA",
      secondaryY10: "#FFF6D8",
      secondaryY20: "#FFF1C6",
      secondaryY30: "#FFEDB5",
      secondaryY40: "#FFE9A3",
      secondaryY50: "#FEE07F",
      secondaryY60: "#FED85C",
      secondaryY70: "#FECF38",
      secondaryY80: "#E5BA2D",
      secondaryY90: "#CDA422",
      secondaryY100: "#B48F17",
      neutralWhite: "#FFFFFF",
      neutralDark5: "#F2F1F5",
      neutralDark10: "#E0E0E0",
      neutralDark15: "#C2C2C2",
      // neutralDark20: "#ADADAD",
      // neutralDark25: "#999999",
      // neutralDark30: "#7B7B7B",
      // neutralDark35: "#5E5E5E",
      // neutralDark70: "#404040",
      // neutralDark80: "#313131",
      // neutralDark85: "#232323",
      neutralDark90: "#141414",
      // neutralDark110: "#050505",
      neutralBlack: "#000000",
      error10: "#FFCBCB",
      error20: "#FFABAB",
      error30: "#FF8484",
      error40: "#FF6767",
      error50: "#FF4242",
      error60: "#FF0000",
      error70: "#EE0000",
      success10: "#D9FFD7",
      success20: "#B9FFB4",
      success30: "#96FF8F",
      success40: "#6BFA62",
      success50: "#4CE042",
      success60: "#5CB556",
    },
  },
  components: {
    ...defaultConfig.components,
    // You can customize default component styles here
    // Text: {
    //   theme: {
    //     ...defaultConfig.components.Text.theme,
    //     defaultProps: {
    //       ...defaultConfig.components.Text.theme.defaultProps,
    //       fontWeight: "$normal",
    //     },
    //   },
    // },
  },
});

export default extendedConfig;
