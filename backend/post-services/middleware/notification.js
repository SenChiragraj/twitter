
export async function sendNotifications({type, from, to}) {
  const response = await fetch("http://localhost:5000/api/notifications/new", {
    method: "POST",
    // Set appropriate Content-Type header based on your backend's expectations
    headers: {
      "Content-Type": "application/json" // Assuming JSON payload
    },
    body: JSON.stringify({
      type,
      from,
      to // Use colon (:) for property assignment
    })
  }).then((result) => { if (result.ok) return { ok: true } })
      .catch(err => { return { ok: false, error: err.message } });
}