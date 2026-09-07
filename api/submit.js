export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const data = req.body;
    
    const response = await fetch(
      'https://script.google.com/macros/s/AKfycbwdJhEsbivkgrDomWp4GaRpFN7P3dbJ693M8Q9g0iubwy3ofhsEC4MdgSeraKXDqmZfhw/exec',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      }
    );

    const result = await response.json();
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
};
