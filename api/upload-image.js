import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import sharp from 'sharp';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  // Polyfills for raw Node.js environments (local dev)
  if (!res.status) res.status = (code) => { res.statusCode = code; return res; };
  if (!res.json) res.json = (data) => { res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify(data)); };

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    let buffer;
    if (Buffer.isBuffer(req.body)) {
      buffer = req.body;
    } else {
      // In case we are running in an environment that didn't parse the buffer
      const chunks = [];
      for await (const chunk of req) {
        chunks.push(chunk);
      }
      buffer = Buffer.concat(chunks);
    }

    if (!buffer || buffer.length === 0) {
      return res.status(400).json({ error: 'No image data provided' });
    }

    // Convert to AVIF
    const avifBuffer = await sharp(buffer)
      .avif({ quality: 80, effort: 4 })
      .toBuffer();

    const s3 = new S3Client({
      region: 'auto',
      endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
      },
    });

    const folder = 'uploads';
    const fileName = `${folder}/${uuidv4()}.avif`;
    const bucketName = process.env.R2_BUCKET_NAME || 'sudarshan-gallery';

    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: fileName,
      Body: avifBuffer,
      ContentType: 'image/avif',
    });

    await s3.send(command);

    return res.status(200).json({
      fileName,
      publicUrl: `${process.env.R2_PUBLIC_URL}/${fileName}`,
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
