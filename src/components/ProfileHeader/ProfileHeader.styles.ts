const styles = {
  container: {
    margin: 10,
    borderRadius: "10px",
    background: "white",
    border: "1px solid #E0E0E0",
  },

  avatar: {
    width: "auto",
    height: "90px",
    aspectRatio: "1/1",
  },

  subheaderStack: {
    gap: 5,
    alignItems: "flex-start",
  },

  chip: {
    "& path": {
      stroke: "warning.main",
    },
  },

  cardActions: {
    padding: 20,
    justifyContent: "space-around",
  },

  statValue: {
    fontSize: "1.2rem",
  },
};

export default styles;
