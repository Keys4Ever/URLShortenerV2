export const quickShort = async (url) => {
    const response = await fetch('http://localhost:3000/api/quick', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          longUrl: url
        })
      });
      return await response.json();
}

export const addSecretToUser = async (user, secret) => {
  const response = await fetch('http://localhost:3000/api/quick/connect', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId: user,
      secretKey: secret
    })

  });

  return await response.json();
}