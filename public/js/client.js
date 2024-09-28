


async function fetchProtectedData() {
    try {
      // Fetch the protected data from the '/about' route
      let response = await fetch('/about', {
        method: 'GET',
        credentials: 'include', // This ensures cookies are sent with the request
      });
  

      if (response.status === 401) {
        console.error('Unauthorized: Missing or invalid token');
        // Optionally redirect to login page
        window.location.href = '/login';
        return;
      }
      
      // If the token is invalid or expired (403 status)
      if (response.status === 403) {
        console.log('Access token expired, trying to refresh the token...');
  
        // Refresh the token using the refresh-token endpoint
        const refreshResponse = await fetch('/refresh-token', {
          method: 'POST',
          credentials: 'include', // Send refresh token cookie with request
        });
  
        // If refresh was successful, try fetching the protected data again
        if (refreshResponse.ok) {
          console.log('Token refreshed successfully.');
  
          // Retry fetching the protected data
          response = await fetch('/about', {
            method: 'GET',
            credentials: 'include', // Send the new access token cookie
          });
        } else {
          console.error('Failed to refresh token. Please log in again.');
          return;
        }
      }
  
      //If everything is fine, handle the response data
      if (response.ok) {
        const data = await response.text();
        // document.body.innerHTML = data

        // console.log('Protected data:', data); // Handle or display data
        console.log('page refreshed');
        
      } else {
        console.error('Failed to fetch protected data:', response.status);
      }
    } catch (error) {
      console.error('Error fetching protected data:', error);
    }
  }

  window.onload = async () => {
    await fetchProtectedData();
    console.log('fetching data');
  };

  