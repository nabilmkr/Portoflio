export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // TODO: Connect to Resend or Nodemailer
    // For now, returning success as placeholder
    console.log('Received contact form submission:', { name, email, message });

    return res.status(200).json({ message: 'Success' });
  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
