
let lastRequestTime = 0;

export default async function SearchPeople(name) {
  const currentTime = Date.now();

  // Calculate the time elapsed since the last request
  const timeElapsed = currentTime - lastRequestTime;

  // If the last request was made less than 2 seconds ago, wait for the remaining time
  if (timeElapsed < 2000) {
    await new Promise(resolve => setTimeout(resolve, 2000 - timeElapsed));
  }

  // Update the last request time to the current time
  lastRequestTime = Date.now();

  try {
    // Perform the API call to fetch user details
    const response = await fetch(`/api/users/search/${name}`);

    if (!response.ok) {
      throw new Error('Failed to fetch user details');
    }

    const data = await response.json();
    console.log(data);
    return data.length > 0 ? data : "Not found!!";
  } catch (error) {
    console.error('Error fetching user details:', error.message);
    throw error;
  }
}
