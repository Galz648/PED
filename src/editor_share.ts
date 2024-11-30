// Get reference to the button element
const deployButton = document.getElementById('share-button');

if (!deployButton) {
    throw new Error('Deploy button not found');
}

// // Add click event listener
// deployButton.addEventListener('click', async () => {
//     try {
//         // Call Vercel deployment function
//         const response = await fetch('/api/hello', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         });

//         if (!response.ok) {
//             throw new Error(`Deployment failed: ${response.statusText}`);
//         }

//         const result = await response.json();
//         console.log('Deployment successful:', result);

//         // Optionally show success message to user
//         alert('Deployment successful!');

//     } catch (error) {
//         console.error('Deployment error:', error);
//         alert('Deployment failed. Check console for details.');
//     }
// });

// Add click event listener
deployButton.addEventListener('click', async () => {
    try {
        // Call Vercel API endpoint
        const response = await fetch('/api/hello', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`API call failed: ${response.statusText}`);
        }

        const result = await response.json();
        console.log('Vercel region:', result);

        // Show success message to user
        alert('Request completed successfully!');

    } catch (error) {
        console.error('API error:', error);
        alert('Request failed. Check console for details.');
    }
});
