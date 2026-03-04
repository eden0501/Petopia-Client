const styles = {
  cardHeader: {
    ".MuiCardHeader-title": {
      fontSize: "1rem",
      fontWeight: "600",
    },
  },

  cardContent: {
    paddingTop: 0,
  },

  title: {
    marginTop: 5,
    fontWeight: "600",
    marginBottom: 20,
  },

  contentStack: {
    gap: 10,
  },

  description: {
    color: "text.secondary",
  },

  cardMedia: {
    borderRadius: 2,
  },

  hashtags: {
    color: "primary.main",
    fontSize: "0.9rem",
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
};

export default styles;
