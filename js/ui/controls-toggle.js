// js/ui/controls-toggle.js
// Toggle controls panel visibility

const controlsButton = document.getElementById('controlsButton');
const controlsPanel = document.getElementById('controlsPanel');

let controlsPanelOpen = false;

controlsButton.addEventListener('click', function() {
    controlsPanelOpen = !controlsPanelOpen;
    
    if (controlsPanelOpen) {
        controlsPanel.classList.add('expanded');
    } else {
        controlsPanel.classList.remove('expanded');
    }
});

// Close panel when clicking outside
document.addEventListener('click', function(e) {
    if (controlsPanelOpen && 
        !controlsPanel.contains(e.target) && 
        !controlsButton.contains(e.target)) {
        controlsPanelOpen = false;
        controlsPanel.classList.remove('expanded');
    }
});