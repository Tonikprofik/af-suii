/* jshint esversion: 9 */
/* global THREE, AFRAME */

document.addEventListener('DOMContentLoaded', () => {
  // Setup debug info updater
  function updateDebugInfo(text) {
    let debugEl = document.querySelector('#debug-info');
    debugEl.setAttribute('text', 'value', text);
  }

  // Component to handle grabbing objects
  AFRAME.registerComponent('grab', {
    init: function() {
      this.el.addEventListener('gripdown', e => this.handleGrabStart(e));
      this.el.addEventListener('gripup', e => this.handleGrabEnd(e));
    },
    handleGrabStart: function(event) {
      const hand = event.detail.hand;
      this.grabbedEl = this.el;
      hand.setAttribute('grabbing', this.grabbedEl);
      updateDebugInfo(`Grabbing: ${this.el.id} at position ${this.el.getAttribute('position').toString()}`);
    },
    handleGrabEnd: function(event) {
      const hand = event.detail.hand;
      hand.removeAttribute('grabbing');
      this.grabbedEl = null;
      updateDebugInfo('Released grab');
    }
  });

  // Component to follow hand movements
  AFRAME.registerComponent('follow-hand', {
    schema: { type: 'selector' },
    tick: function () {
      if (!this.data) return;
      const handPosition = this.data.object3D.position;
      this.el.setAttribute('position', handPosition);
      updateDebugInfo(`Following hand: Current Position - ${handPosition.toString()}`);
    }
  });

  // Component to enable object rotation based on hand movement
  AFRAME.registerComponent('rotate-with-hand', {
    schema: { type: 'selector' },
    init: function() {
      this.previousHandRotation = new THREE.Vector3();
    },
    tick: function () {
      if (!this.data) return;
      const currentHandRotation = this.data.object3D.rotation;
      const deltaRotation = this.previousHandRotation.sub(currentHandRotation);
      this.el.object3D.rotation.y += deltaRotation.y;
      this.previousHandRotation.copy(currentHandRotation);
      updateDebugInfo(`Rotating: ${this.el.id} - New Rotation Y: ${this.el.object3D.rotation.y.toFixed(2)}`);
    }
  });

  // Initialize scene and hand controls
  const sceneEl = document.querySelector('a-scene');
  const hands = sceneEl.querySelectorAll('[hand-controls]');
  hands.forEach(hand => {
    hand.setAttribute('grab', '');
    hand.setAttribute('follow-hand', {type: hand.id}); // Assuming each hand has a unique ID
  });
});
