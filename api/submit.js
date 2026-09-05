const https = require('https');

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const data = req.body;
  
  const payload = JSON.stringify(data);
  
  const options = {
    hostname: 'script.google.com',
    path: '/macros/s/AKfycbz2KtYYJfYL-O59JB0k_OQCFv2hvIbqi1PD1afm3qQv_iG6Q8-6OB8EjSe-Dzgf36G-1A/exec',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': payload.length
    }
  };

  return new Promise((resolve) => {
    const request = https.request(options, (response) => {
      resolve(res.status(200).json({ success: true }));
    });

    request.on('error', (error) => {
      console.error('Error:', error);
      resolve(res.status(500).json({ success: false, error: error.message }));
    });

    request.write(payload);
    request.end();
  });
};
