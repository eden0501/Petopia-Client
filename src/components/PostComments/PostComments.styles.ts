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

  headerTitle: {
    fontWeight: 600,
    fontSize: "1.2rem",
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
    fontWeight: 600,
    color: "text.secondary",
  },

  emptyStateSubtitle: {
    fontSize: "0.9rem",
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
    fontSize: "0.9rem",
  },

  commentContent: {
    fontSize: "0.8rem",
    marginTop: 0.5,
  },

  inputContainer: {
    padding: 15,
  },

  inputAvatar: {
    width: 40,
    height: 40,
  },
};

export default styles;
