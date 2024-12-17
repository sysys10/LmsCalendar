export const loginFormStyle = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    width: "100%",
    height: "100vh",
    zIndex: "10",
    position: "fixed",
    backdropFilter: "blur(4px)",
    top: "0",
    left: "0",
    zIndex: 30,
  },
  content: {
    zIndex: 31,
    width: "400px",
    minHeight: "400px",
    padding: "0",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "1px solid rgb(var(--border))",
    borderRadius: "12px",
    backgroundColor: "rgb(var(--card))",
  },
};

export const eventFormStyle = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    width: "100%",
    height: "100vh",
    zIndex: "10",
    position: "fixed",
    top: "0",
    left: "0",
    zIndex: 30,
  },
  content: {
    zIndex: 31,
    width: "500px",
    minHeight: "600px",
    padding: "0",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "1px solid rgb(var(--border))",
    borderRadius: "12px",
    backgroundColor: "rgb(var(--card))",
  },
};
