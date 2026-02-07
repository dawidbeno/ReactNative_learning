export const theme = {
  colors: {
    primary: "#8B4513",      // Saddle brown - bookish
    primaryLight: "#A0522D", // Sienna
    primaryDark: "#654321",  // Dark brown
    secondary: "#DEB887",    // Burlywood
    accent: "#CD853F",       // Peru
    background: "#FFF8DC",   // Cornsilk
    cardBackground: "#FFFFFF",
    text: "#2C1810",         // Dark brown text
    textLight: "#6B4423",
    textMuted: "#9A7B4F",
    border: "#E8D5B7",
    success: "#4caf50",
    error: "#f44336",
    warning: "#ff9800",
    white: "#FFFFFF",
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 40,
  },

  typography: {
    h1: {
      fontSize: 32,
      fontWeight: "700" as const,
    },
    h2: {
      fontSize: 24,
      fontWeight: "600" as const,
    },
    h3: {
      fontSize: 20,
      fontWeight: "600" as const,
    },
    body: {
      fontSize: 16,
      fontWeight: "400" as const,
    },
    bodyLarge: {
      fontSize: 18,
      fontWeight: "400" as const,
    },
    caption: {
      fontSize: 14,
      fontWeight: "400" as const,
    },
    small: {
      fontSize: 12,
      fontWeight: "400" as const,
    },
  },

  shadows: {
    small: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    medium: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 4,
    },
  },

  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    round: 999,
  },
};
