
export default function handler(req, res) {
    const csrfToken = generateCsrfToken();
    res.status(200).json({ csrfToken });
  }
  