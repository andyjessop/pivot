export function service() {
  return {
    setTitle,
  };

  function setTitle(title: string) {
    document.title = title;
  }
}
