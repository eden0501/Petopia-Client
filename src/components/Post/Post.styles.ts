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
};

export default styles;
