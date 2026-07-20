import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req, res) {
  // Polyfills for raw Node.js environments (local dev)
  if (!res.status) res.status = (code) => { res.statusCode = code; return res; };
  if (!res.json) res.json = (data) => { res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify(data)); };

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { contentType, folder = 'uploads' } = req.body;
  if (!contentType) {
    return res.status(400).json({ error: 'Content type is required' });
  }

  try {
    const s3 = new S3Client({
      region: 'auto',
      endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
      },
    });

    const fileExtension = contentType.split('/')[1] || 'jpg';
    const fileName = `${folder}/${uuidv4()}.${fileExtension}`;
    
    // Ensure the bucket name matches what the user sets up
    const bucketName = process.env.R2_BUCKET_NAME || 'sudarshan-gallery';

    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: fileName,
      ContentType: contentType,
    });

    // URL expires in 5 minutes
    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 300 });

    return res.status(200).json({
      uploadUrl: signedUrl,
      fileName,
      publicUrl: `${process.env.R2_PUBLIC_URL}/${fileName}`,
    });
  } catch (error) {
    console.error('Error generating pre-signed URL:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
