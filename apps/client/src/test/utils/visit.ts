export function visit(url: string) {
  history.pushState(null, '', url);

  triggerPopStateEvent();
}

function triggerPopStateEvent() {
  const popStateEvent = new PopStateEvent('popstate', {
    bubbles: true,
    cancelable: true,
    state: null,
  });

  window.dispatchEvent(popStateEvent);
}
