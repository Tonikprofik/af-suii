document.addEventListener('DOMContentLoaded', () => {
  const leftHand = document.querySelector('#leftHand');
  const rightHand = document.querySelector('#rightHand');
  const debugInfo = document.querySelector('#debug-info');

  function updateDebugInfo(text) {
    debugInfo.setAttribute('text', 'value', text);
  }

  // Adding event listeners for hand gestures to both hands
  [leftHand, rightHand].forEach(hand => {
    ['gripdown', 'gripup', 'pointdown', 'pointup', 'thumbup', 'thumbdown', 'pointingstart', 'pointingend', 'pistolstart', 'pistolend'].forEach(event => {
      hand.addEventListener(event, () => updateDebugInfo(`${event} detected`));
    });
  });

  // Example of a component that uses these events
  AFRAME.registerComponent('interaction', {
    init: function() {
      this.el.addEventListener('gripdown', () => this.handleInteraction('Grip Down'));
      this.el.addEventListener('pointup', () => this.handleInteraction('Point Up'));
    },
    handleInteraction: function(action) {
      updateDebugInfo(`${action} on ${this.el.id}`);
      // Additional interaction logic here
    }
  });

  // Apply interaction component to interactive objects
  document.querySelectorAll('.interactive').forEach(obj => {
    obj.setAttribute('interaction', '');
  });
});
