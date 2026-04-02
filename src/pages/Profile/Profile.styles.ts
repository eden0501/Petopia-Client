const styles = {
  container: {
    backgroundColor: "#FBF9FA",
    minHeight: "100vh",
  },

  contentContainer: {
    paddingBottom: 10,
    overflow: "auto",
    height: "calc(100vh - 110px)",
  },

  sectionTitle: {
    padding: 15,
  },

  emptyStateContainer: {
    paddingY: 50,
    gap: 10,
    margin: 10,
    borderRadius: "10px",
    background: "white",
    border: "1px solid #E0E0E0",

    "& .MuiTypography-root": {
      color: "text.secondary",
    },
  },

  emptyStateIcon: {
    fontSize: "4rem",
    color: "text.secondary",
  },
};

export default styles;
