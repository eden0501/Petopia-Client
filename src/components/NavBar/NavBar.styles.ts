const styles = {
  bottomNavigation: {
    left: 0,
    right: 0,
    bottom: 0,
    position: "fixed",
    justifyContent: "space-around",
    boxShadow: "0px -2px 10px rgba(0, 0, 0, 0.1)",
  },

  fab: (display: boolean) => ({
    bottom: 30,
    left: "50%",
    transform: "translateX(-50%)",
    display: display ? "flex" : "none",
  }),
};

export default styles;
