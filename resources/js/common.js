const fetchOptions = data => {
  return { 
    method: 'POST', 
    mode: 'cors', 
    cache: 'no-cache', 
    credentials: 'include', 
    headers: { 'Content-Type': 'application/json' },
    referrerPolicy: 'no-referrer', 
    body: JSON.stringify(data)
  }}

