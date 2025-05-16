// This file patches the global fetch function to always include credentials:'include'

// Function to patch the fetch API
export function patchFetch() {
  // Only run in browser environment
  if (typeof window !== 'undefined') {
    console.log('Patching fetch to always include credentials:include');
    
    // Store the original fetch function
    const originalFetch = window.fetch;
    
    // Override the global fetch function
    window.fetch = function(...args) {
      // Check if we have a request object as first parameter
      if (args[0] instanceof Request) {
        const request = args[0];
        // Create a new request with credentials included
        if (!request.credentials || request.credentials === 'same-origin') {
          args[0] = new Request(request, {
            credentials: 'include'
          });
        }
      } 
      // If we have a URL and options
      else if (args.length >= 1) {
        // Initialize options if not present
        if (!args[1]) {
          args[1] = {};
        }
        
        // Set credentials if not already set
        if (!args[1].credentials) {
          args[1].credentials = 'include';
        }
      }
      
      // Call the original fetch with our modified arguments
      return originalFetch.apply(this, args);
    };
  }
}

export default { patchFetch }; 