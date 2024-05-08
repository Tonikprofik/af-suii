document.addEventListener('DOMContentLoaded', () => {
  const hands = document.querySelectorAll('[hand-tracking-controls]');
  let activeObject = null;

  hands.forEach(hand => {
    hand.addEventListener('raycaster-intersected', evt => {
      activeObject = evt.detail.intersectedEl;  // store the currently intersected element
    });

    hand.addEventListener('raycaster-intersected-cleared', evt => {
      activeObject = null;  // clear the active object when it's no longer intersected
    });

    hand.addEventListener('pinchstarted', evt => {
      if (activeObject && activeObject.id === 'rotatable-marble') {
        hand.setAttribute('grabbing', true);  // Start grabbing or interacting
      }
    });

    hand.addEventListener('pinchended', evt => {
      hand.setAttribute('grabbing', false);  // End grabbing or interacting
    });

    hand.addEventListener('tick', () => {
      if (hand.getAttribute('grabbing') && activeObject) {
        let handRotation = hand.object3D.rotation.y;
        let table = document.getElementById('rotatable-table');
        let tableRotation = table.getAttribute('rotation');
        
        // Simple rotation logic: Rotate table as hand rotates
        tableRotation.y = handRotation * (180 / Math.PI);  // Convert radians to degrees
        table.setAttribute('rotation', tableRotation);
      }
    });
  });
});
