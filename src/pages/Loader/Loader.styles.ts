const styles = {
  container: {
    gap: 20,
    padding: 30,
    height: "100%",
    textAlign: "center",
    justifyContent: "center",
    backgroundColor: "primary.main",
  },

  skeleton: {
    bgcolor: "transparent",
    "& > *": {
      visibility: "visible !important",
    },
  },

  pawPrint: {
    fontSize: "7rem",
    color: "white",
  },

  title: {
    fontSize: "3rem",
    color: "white",
    fontWeight: "bold",
  },

  loadingText: {
    color: "white",
    opacity: 0.8,
    fontSize: "1rem",
  },

  factBox: {
    borderRadius: 3,
    color: "white",
    padding: "20px 10px",
    backdropFilter: "blur(8px)",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },

  factLabel: {
    opacity: 0.8,
    marginBottom: 5,
  },
};

export default styles;
