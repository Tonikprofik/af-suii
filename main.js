document.addEventListener('DOMContentLoaded', () => {
  const hands = document.querySelectorAll('[hand-tracking-controls]');
  let activeObject = null;

  hands.forEach(hand => {
    hand.addEventListener('raycaster-intersected', evt => {
      activeObject = evt.detail.intersectedEl;  // Store the currently intersected element
    });

    hand.addEventListener('raycaster-intersected-cleared', evt => {
      activeObject = null;  // Clear the active object when it's no longer intersected
    });

    hand.addEventListener('pinchstarted', evt => {
      if (activeObject && activeObject.id === 'rotatable-marble') {
        hand.setAttribute('grabbing', true);  // Start grabbing or interacting
      }
    });

    hand.addEventListener('pinchended', evt => {
      hand.setAttribute('grabbing', false);  // End grabbing
