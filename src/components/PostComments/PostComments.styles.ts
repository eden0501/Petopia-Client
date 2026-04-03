const styles = {
  paper: {
    maxHeight: "60vh",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: "hidden",
  },

  header: {
    padding: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  commentsStack: {
    padding: 15,
    overflowY: "auto",
  },

  emptyStateContainer: {
    padding: 40,
  },

  emptyStateIconBox: {
    padding: 15,
    borderRadius: "50%",
    display: "flex",
    backgroundColor: "#F3F3F5",
  },

  emptyStateIcon: {
    fontSize: "3rem",
    color: "text.secondary",
  },

  emptyStateTitle: {
    color: "text.secondary",
  },

  emptyStateSubtitle: {
    color: "text.secondary",
  },

  commentAvatar: {
    width: 40,
    height: 40,
  },

  commentBubble: {
    bgcolor: "#f0f2f5",
    borderRadius: 4,
    padding: 10,
  },

  commentAuthor: {
    fontWeight: 600,
  },

  commentContent: {
    fontSize: "0.8rem",
    marginTop: 0.5,
    color: "text.secondary",
  },

  inputContainer: {
    padding: 15,
  },
};

export default styles;
