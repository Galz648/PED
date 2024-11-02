
// const builtinShortcuts: string[] = [
//     "\\alpha",
//     "\\beta",
//     "\\gamma",
//     "\\delta",
//     "\\epsilon",
//     "\\zeta",
//     "\\eta",
//     "\\theta",
// ]
// function switchTab(tabName) {
//     // Remove active class from all tabs
//     document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
//     document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
//     // Add active class to selected tab
//     // TODO: ensure that the html element exists
//     document.querySelector(`button[onclick="switchTab('${tabName}')"]`)!.classList.add('active');
//     // TODO: ensure that the html element exists
//     document.getElementById(`${tabName}-tab`)!.classList.add('active');
// }

// function addNewShortcut() {
//     const shortcutDiv = document.createElement('div');
//     shortcutDiv.className = 'shortcut-item';
//     shortcutDiv.innerHTML = `
//         <input type="text" class="shortcut-input" placeholder="Shortcut key" />
//         <input type="text" class="shortcut-input" placeholder="Command" />
//         <button class="delete-btn" onclick="this.parentElement.remove()">Delete</button>
//     `;
//     // TODO: ensure that the html element exists
//     document.getElementById('custom-shortcuts')!.appendChild(shortcutDiv);
// }

// // Load built-in shortcuts when MathLive is ready
// window.addEventListener('load', () => {
//     const container = document.getElementById('builtin-shortcuts');
    
//     Object.entries(builtinShortcuts).forEach(([key, value]) => {
//         const shortcutDiv = document.createElement('div');
//         shortcutDiv.className = 'shortcut-item';
//         shortcutDiv.innerHTML = `
//             <span>${key}</span>
//             <span>${value}</span>
//         `;
//         // TODO: ensure that the html element exists
//         container!.appendChild(shortcutDiv);
//     });
// });
