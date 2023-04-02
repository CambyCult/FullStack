export function Protected({ children }) {
    const jwt = localStorage.getItem("jwt");
  
    if (!jwt) {
      return (window.location.href = "/");
    }
    return children;
  }