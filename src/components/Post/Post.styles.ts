const styles = {
  cardHeader: {
    ".MuiCardHeader-title": {
      fontSize: "1rem",
      fontWeight: "600",
    },
  },

  actionButtons: {
    gap: 0.5,
  },

  editButton: {
    color: "text.secondary",
    "&:hover": {
      color: "primary.main",
      backgroundColor: "primary.light",
    },
  },

  deleteButton: {
    color: "text.secondary",
    "&:hover": {
      color: "error.main",
      backgroundColor: "error.light",
    },
  },

  cardContent: {
    paddingTop: 0,
  },

  title: {
    marginTop: 5,
    marginBottom: 20,
  },

  contentStack: {
    gap: 10,
  },

  hashtags: {
    color: "primary.main",
  },

  cardMedia: {
    borderRadius: 2,
  },

  cardActions: {
    padding: 20,
    justifyContent: "space-around",
  },

  likeButton: (liked: boolean) => ({
    color: liked ? "red" : "text.secondary",
  }),

  commentButton: (openComments: boolean) => ({
    color: openComments ? "primary.main" : "text.secondary",
  }),

  deleteMenuItem: {
    color: "error.main",

    "& .MuiSvgIcon-root": {
      color: "error.main",
    },

    "&:hover": {
      backgroundColor: "rgba(185, 28, 28, 0.08)",
    },
  },

  dialogActions: {
    gap: 2,
    padding: 0,
    paddingTop: 20,
  },

  buttonText: {
    fontWeight: "600",
  },
};

export default styles;
