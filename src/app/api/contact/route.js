import nodemailer from 'nodemailer';

export async function POST(req) {
  const { name, email, message } = await req.json();

  if (!name || !email || !message) {
    return new Response(
      JSON.stringify({ error: 'All fields are required.' }),
      { status: 400 }
    );
  }

  try {
    // Configure the Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // Use your email service (e.g., Gmail, Outlook, etc.)
      auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // Your email password or app-specific password
      },
    });

    // Define the email options
    const mailOptions = {
      from: email, // Sender's email
      to: process.env.EMAIL_USER, // Your email where messages will be sent
      subject: `New Contact Form Message from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return new Response(
      JSON.stringify({ message: 'Email sent successfully!' }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to send email.' }),
      { status: 500 }
    );
  }
}