export const theme = {
  colors: {
    primary: "#002F34",
    accent: "#23E5DB",
    accentMuted: "#CBF7EE",
    background: "#FFFFFF",
    secondaryBackground: "#F2F4F5",
    softBackground: "#E9F8F6",
    border: "#D8DFE0",
    textPrimary: "#002F34",
    textSecondary: "#5C6B70",
    muted: "#7F9799",
    warning: "#FFCE32",
    danger: "#C91432",
    buttonText: "#FFFFFF",
  },
  typography: {
    heroTitle: {
      size: 26,
      weight: "900",
      letterSpacing: 0,
    },
    sectionTitle: {
      size: 21,
      weight: "800",
    },
    cardTitle: {
      size: 16,
      weight: "700",
    },
    price: {
      size: 18,
      weight: "900",
    },
    body: {
      size: 14,
      weight: "400",
    },
    caption: {
      size: 12,
      weight: "400",
    },
  },
  radius: {
    card: 6,
    button: 4,
    input: 4,
    chip: 18,
  },
};

export const layout = {
  padding: 16,
  spacing: 16,
  radius: theme.radius,
};
