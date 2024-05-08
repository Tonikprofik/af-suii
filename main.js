document.addEventListener('DOMContentLoaded', () => {
  const hand = document.querySelector('[hand-tracking-controls]');
  const marble = document.getElementById('rotatable-marble');
  const table = document.getElementById('rotatable-table');

  let isPinching = false;
  let lastHandRotation = null;

  hand.addEventListener('pinchstarted', evt => {
    isPinching = true;
    lastHandRotation = hand.object3D.rotation.y;
  });

  hand.addEventListener('pinchended', evt => {
    isPinching = false;
  });

  hand.addEventListener('tick', () => {
    if (isPinching) {
      let currentRotation = hand.object3D.rotation.y;
      let rotationDelta = currentRotation - lastHandRotation;
      let tableRotation = table.getAttribute('rotation');

      // Rotate the table based on the change in the hand's rotation
      tableRotation.y += rotationDelta * (180 / Math.PI); // Convert radians to degrees
      table.setAttribute('rotation', tableRotation);

      lastHandRotation = currentRotation;
    }
  });
});
