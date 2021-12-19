export default function useDocumentListener({ todoInput }) {
  const documentListener = (e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      return todoInput?.current.blur();
    }

    if (e.originalTarget.tagName === "INPUT") return;

    if (e.key === "i") {
      e.preventDefault();
      return todoInput?.current.focus();
    }
  };

  return () => {
    document.body.addEventListener("keydown", documentListener);

    return function cleanup() {
      window.removeEventListener("keydown", documentListener);
    };
  };
}
