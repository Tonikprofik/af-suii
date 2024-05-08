import 'aframe';

document.addEventListener('DOMContentLoaded', () => {
  const scene = document.querySelector('a-scene');
  if (!scene) return;

  const leftHand = document.getElementById('leftHand');
  const rightHand = document.getElementById('rightHand');
  const box = document.querySelector('a-box');  // Assuming you want to move a box

  // Example: Move the box when the grip button is pressed
  rightHand.addEventListener('gripdown', function () {
      const position = box.getAttribute('position');
      position.x += 0.1;  // Move the box slightly on the x-axis
      box.setAttribute('position', position);
  });

  rightHand.addEventListener('gripup', function () {
      // You could add code here to release the box or stop moving it
  });

  // Add more event listeners as needed for other buttons or actions
});


