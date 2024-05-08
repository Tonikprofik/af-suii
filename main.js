document.addEventListener('DOMContentLoaded', () => {
  const scene = document.querySelector('a-scene');
  if (!scene) return;

  const leftHand = document.getElementById('leftHand');
  const rightHand = document.getElementById('rightHand');
  let activeObject = null;

  scene.addEventListener('gripdown', function (evt) {
    // Determine if the target is an interactable object
    if (evt.detail.hand === rightHand && evt.target.hasAttribute('data-interactable')) {
      activeObject = evt.target;
    }
  });

  rightHand.addEventListener('axismove', function (evt) {
    if (activeObject) {
      const position = activeObject.getAttribute('position');
      // Modify position based on axis movement
      position.x += evt.detail.axis[2] * 0.05; // X axis
      position.y += evt.detail.axis[3] * 0.05; // Y axis
      activeObject.setAttribute('position', position);
    }
  });

  scene.addEventListener('gripup', function (evt) {
    // Release the object
    if (evt.detail.hand === rightHand && activeObject) {
      activeObject = null;
    }
  });
});
