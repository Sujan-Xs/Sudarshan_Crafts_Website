// vite.config.js
import { defineConfig } from "file:///C:/Users/lenovo/OneDrive/Desktop/Sudarshan_Crafts_Website/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/lenovo/OneDrive/Desktop/Sudarshan_Crafts_Website/node_modules/@vitejs/plugin-react/dist/index.js";
import dotenv from "file:///C:/Users/lenovo/OneDrive/Desktop/Sudarshan_Crafts_Website/node_modules/dotenv/lib/main.js";

// api/get-upload-url.js
import { S3Client, PutObjectCommand } from "file:///C:/Users/lenovo/OneDrive/Desktop/Sudarshan_Crafts_Website/node_modules/@aws-sdk/client-s3/dist-cjs/index.js";
import { getSignedUrl } from "file:///C:/Users/lenovo/OneDrive/Desktop/Sudarshan_Crafts_Website/node_modules/@aws-sdk/s3-request-presigner/dist-cjs/index.js";
import { v4 as uuidv4 } from "file:///C:/Users/lenovo/OneDrive/Desktop/Sudarshan_Crafts_Website/node_modules/uuid/dist-node/index.js";
async function handler(req, res) {
  if (!res.status) res.status = (code) => {
    res.statusCode = code;
    return res;
  };
  if (!res.json) res.json = (data) => {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(data));
  };
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const { contentType, folder = "uploads" } = req.body;
  if (!contentType) {
    return res.status(400).json({ error: "Content type is required" });
  }
  try {
    const s3 = new S3Client({
      region: "auto",
      endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY
      }
    });
    const fileExtension = contentType.split("/")[1] || "jpg";
    const fileName = `${folder}/${uuidv4()}.${fileExtension}`;
    const bucketName = process.env.R2_BUCKET_NAME || "sudarshan-gallery";
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: fileName,
      ContentType: contentType
    });
    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 300 });
    return res.status(200).json({
      uploadUrl: signedUrl,
      fileName,
      publicUrl: `${process.env.R2_PUBLIC_URL}/${fileName}`
    });
  } catch (error) {
    console.error("Error generating pre-signed URL:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// api/upload-image.js
import { S3Client as S3Client2, PutObjectCommand as PutObjectCommand2 } from "file:///C:/Users/lenovo/OneDrive/Desktop/Sudarshan_Crafts_Website/node_modules/@aws-sdk/client-s3/dist-cjs/index.js";
import { v4 as uuidv42 } from "file:///C:/Users/lenovo/OneDrive/Desktop/Sudarshan_Crafts_Website/node_modules/uuid/dist-node/index.js";
import sharp from "file:///C:/Users/lenovo/OneDrive/Desktop/Sudarshan_Crafts_Website/node_modules/sharp/dist/index.mjs";
async function handler2(req, res) {
  if (!res.status) res.status = (code) => {
    res.statusCode = code;
    return res;
  };
  if (!res.json) res.json = (data) => {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(data));
  };
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  try {
    let buffer;
    if (Buffer.isBuffer(req.body)) {
      buffer = req.body;
    } else {
      const chunks = [];
      for await (const chunk of req) {
        chunks.push(chunk);
      }
      buffer = Buffer.concat(chunks);
    }
    if (!buffer || buffer.length === 0) {
      return res.status(400).json({ error: "No image data provided" });
    }
    const avifBuffer = await sharp(buffer).avif({ quality: 80, effort: 4 }).toBuffer();
    const s3 = new S3Client2({
      region: "auto",
      endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY
      }
    });
    const folder = "uploads";
    const fileName = `${folder}/${uuidv42()}.avif`;
    const bucketName = process.env.R2_BUCKET_NAME || "sudarshan-gallery";
    const command = new PutObjectCommand2({
      Bucket: bucketName,
      Key: fileName,
      Body: avifBuffer,
      ContentType: "image/avif"
    });
    await s3.send(command);
    return res.status(200).json({
      fileName,
      publicUrl: `${process.env.R2_PUBLIC_URL}/${fileName}`
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    return res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
}

// vite.config.js
dotenv.config({ path: ".env.local" });
var apiMiddleware = () => {
  return {
    name: "api-middleware",
    configureServer(server) {
      server.middlewares.use("/api/get-upload-url", (req, res, next) => {
        if (req.method === "POST") {
          let body = "";
          req.on("data", (chunk) => body += chunk.toString());
          req.on("end", () => {
            req.body = JSON.parse(body || "{}");
            handler(req, res);
          });
        } else {
          next();
        }
      });
      server.middlewares.use("/api/upload-image", (req, res, next) => {
        if (req.method === "POST") {
          const chunks = [];
          req.on("data", (chunk) => chunks.push(chunk));
          req.on("end", () => {
            req.body = Buffer.concat(chunks);
            handler2(req, res);
          });
        } else {
          next();
        }
      });
    }
  };
};
var vite_config_default = defineConfig({
  plugins: [react(), apiMiddleware()],
  server: {
    port: 3e3,
    open: true
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiLCAiYXBpL2dldC11cGxvYWQtdXJsLmpzIiwgImFwaS91cGxvYWQtaW1hZ2UuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxsZW5vdm9cXFxcT25lRHJpdmVcXFxcRGVza3RvcFxcXFxTdWRhcnNoYW5fQ3JhZnRzX1dlYnNpdGVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGxlbm92b1xcXFxPbmVEcml2ZVxcXFxEZXNrdG9wXFxcXFN1ZGFyc2hhbl9DcmFmdHNfV2Vic2l0ZVxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvbGVub3ZvL09uZURyaXZlL0Rlc2t0b3AvU3VkYXJzaGFuX0NyYWZ0c19XZWJzaXRlL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XHJcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XHJcbmltcG9ydCBkb3RlbnYgZnJvbSAnZG90ZW52JztcclxuaW1wb3J0IGdldFVwbG9hZFVybEhhbmRsZXIgZnJvbSAnLi9hcGkvZ2V0LXVwbG9hZC11cmwuanMnO1xyXG5pbXBvcnQgdXBsb2FkSW1hZ2VIYW5kbGVyIGZyb20gJy4vYXBpL3VwbG9hZC1pbWFnZS5qcyc7XHJcblxyXG4vLyBMb2FkIC5lbnYubG9jYWwgZm9yIGJhY2tlbmQga2V5c1xyXG5kb3RlbnYuY29uZmlnKHsgcGF0aDogJy5lbnYubG9jYWwnIH0pO1xyXG5cclxuLy8gU2ltcGxlIFZpdGUgbWlkZGxld2FyZSB0byBtb2NrIFZlcmNlbCBzZXJ2ZXJsZXNzIGZ1bmN0aW9ucyBsb2NhbGx5XHJcbmNvbnN0IGFwaU1pZGRsZXdhcmUgPSAoKSA9PiB7XHJcbiAgcmV0dXJuIHtcclxuICAgIG5hbWU6ICdhcGktbWlkZGxld2FyZScsXHJcbiAgICBjb25maWd1cmVTZXJ2ZXIoc2VydmVyKSB7XHJcbiAgICAgIHNlcnZlci5taWRkbGV3YXJlcy51c2UoJy9hcGkvZ2V0LXVwbG9hZC11cmwnLCAocmVxLCByZXMsIG5leHQpID0+IHtcclxuICAgICAgICBpZiAocmVxLm1ldGhvZCA9PT0gJ1BPU1QnKSB7XHJcbiAgICAgICAgICAgbGV0IGJvZHkgPSAnJztcclxuICAgICAgICAgICByZXEub24oJ2RhdGEnLCBjaHVuayA9PiBib2R5ICs9IGNodW5rLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgIHJlcS5vbignZW5kJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgIHJlcS5ib2R5ID0gSlNPTi5wYXJzZShib2R5IHx8ICd7fScpO1xyXG4gICAgICAgICAgICAgIGdldFVwbG9hZFVybEhhbmRsZXIocmVxLCByZXMpO1xyXG4gICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgbmV4dCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgICBzZXJ2ZXIubWlkZGxld2FyZXMudXNlKCcvYXBpL3VwbG9hZC1pbWFnZScsIChyZXEsIHJlcywgbmV4dCkgPT4ge1xyXG4gICAgICAgIGlmIChyZXEubWV0aG9kID09PSAnUE9TVCcpIHtcclxuICAgICAgICAgICBjb25zdCBjaHVua3MgPSBbXTtcclxuICAgICAgICAgICByZXEub24oJ2RhdGEnLCBjaHVuayA9PiBjaHVua3MucHVzaChjaHVuaykpO1xyXG4gICAgICAgICAgIHJlcS5vbignZW5kJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgIHJlcS5ib2R5ID0gQnVmZmVyLmNvbmNhdChjaHVua3MpO1xyXG4gICAgICAgICAgICAgIHVwbG9hZEltYWdlSGFuZGxlcihyZXEsIHJlcyk7XHJcbiAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICBuZXh0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHBsdWdpbnM6IFtyZWFjdCgpLCBhcGlNaWRkbGV3YXJlKCldLFxyXG4gIHNlcnZlcjoge1xyXG4gICAgcG9ydDogMzAwMCxcclxuICAgIG9wZW46IHRydWUsXHJcbiAgfSxcclxufSk7IiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxsZW5vdm9cXFxcT25lRHJpdmVcXFxcRGVza3RvcFxcXFxTdWRhcnNoYW5fQ3JhZnRzX1dlYnNpdGVcXFxcYXBpXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxsZW5vdm9cXFxcT25lRHJpdmVcXFxcRGVza3RvcFxcXFxTdWRhcnNoYW5fQ3JhZnRzX1dlYnNpdGVcXFxcYXBpXFxcXGdldC11cGxvYWQtdXJsLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9sZW5vdm8vT25lRHJpdmUvRGVza3RvcC9TdWRhcnNoYW5fQ3JhZnRzX1dlYnNpdGUvYXBpL2dldC11cGxvYWQtdXJsLmpzXCI7aW1wb3J0IHsgUzNDbGllbnQsIFB1dE9iamVjdENvbW1hbmQgfSBmcm9tICdAYXdzLXNkay9jbGllbnQtczMnO1xuaW1wb3J0IHsgZ2V0U2lnbmVkVXJsIH0gZnJvbSAnQGF3cy1zZGsvczMtcmVxdWVzdC1wcmVzaWduZXInO1xuaW1wb3J0IHsgdjQgYXMgdXVpZHY0IH0gZnJvbSAndXVpZCc7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIGhhbmRsZXIocmVxLCByZXMpIHtcbiAgLy8gUG9seWZpbGxzIGZvciByYXcgTm9kZS5qcyBlbnZpcm9ubWVudHMgKGxvY2FsIGRldilcbiAgaWYgKCFyZXMuc3RhdHVzKSByZXMuc3RhdHVzID0gKGNvZGUpID0+IHsgcmVzLnN0YXR1c0NvZGUgPSBjb2RlOyByZXR1cm4gcmVzOyB9O1xuICBpZiAoIXJlcy5qc29uKSByZXMuanNvbiA9IChkYXRhKSA9PiB7IHJlcy5zZXRIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7IHJlcy5lbmQoSlNPTi5zdHJpbmdpZnkoZGF0YSkpOyB9O1xuXG4gIGlmIChyZXEubWV0aG9kICE9PSAnUE9TVCcpIHtcbiAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDUpLmpzb24oeyBlcnJvcjogJ01ldGhvZCBub3QgYWxsb3dlZCcgfSk7XG4gIH1cblxuICBjb25zdCB7IGNvbnRlbnRUeXBlLCBmb2xkZXIgPSAndXBsb2FkcycgfSA9IHJlcS5ib2R5O1xuICBpZiAoIWNvbnRlbnRUeXBlKSB7XG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgZXJyb3I6ICdDb250ZW50IHR5cGUgaXMgcmVxdWlyZWQnIH0pO1xuICB9XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBzMyA9IG5ldyBTM0NsaWVudCh7XG4gICAgICByZWdpb246ICdhdXRvJyxcbiAgICAgIGVuZHBvaW50OiBgaHR0cHM6Ly8ke3Byb2Nlc3MuZW52LlIyX0FDQ09VTlRfSUR9LnIyLmNsb3VkZmxhcmVzdG9yYWdlLmNvbWAsXG4gICAgICBjcmVkZW50aWFsczoge1xuICAgICAgICBhY2Nlc3NLZXlJZDogcHJvY2Vzcy5lbnYuUjJfQUNDRVNTX0tFWV9JRCxcbiAgICAgICAgc2VjcmV0QWNjZXNzS2V5OiBwcm9jZXNzLmVudi5SMl9TRUNSRVRfQUNDRVNTX0tFWSxcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICBjb25zdCBmaWxlRXh0ZW5zaW9uID0gY29udGVudFR5cGUuc3BsaXQoJy8nKVsxXSB8fCAnanBnJztcbiAgICBjb25zdCBmaWxlTmFtZSA9IGAke2ZvbGRlcn0vJHt1dWlkdjQoKX0uJHtmaWxlRXh0ZW5zaW9ufWA7XG4gICAgXG4gICAgLy8gRW5zdXJlIHRoZSBidWNrZXQgbmFtZSBtYXRjaGVzIHdoYXQgdGhlIHVzZXIgc2V0cyB1cFxuICAgIGNvbnN0IGJ1Y2tldE5hbWUgPSBwcm9jZXNzLmVudi5SMl9CVUNLRVRfTkFNRSB8fCAnc3VkYXJzaGFuLWdhbGxlcnknO1xuXG4gICAgY29uc3QgY29tbWFuZCA9IG5ldyBQdXRPYmplY3RDb21tYW5kKHtcbiAgICAgIEJ1Y2tldDogYnVja2V0TmFtZSxcbiAgICAgIEtleTogZmlsZU5hbWUsXG4gICAgICBDb250ZW50VHlwZTogY29udGVudFR5cGUsXG4gICAgfSk7XG5cbiAgICAvLyBVUkwgZXhwaXJlcyBpbiA1IG1pbnV0ZXNcbiAgICBjb25zdCBzaWduZWRVcmwgPSBhd2FpdCBnZXRTaWduZWRVcmwoczMsIGNvbW1hbmQsIHsgZXhwaXJlc0luOiAzMDAgfSk7XG5cbiAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oe1xuICAgICAgdXBsb2FkVXJsOiBzaWduZWRVcmwsXG4gICAgICBmaWxlTmFtZSxcbiAgICAgIHB1YmxpY1VybDogYCR7cHJvY2Vzcy5lbnYuUjJfUFVCTElDX1VSTH0vJHtmaWxlTmFtZX1gLFxuICAgIH0pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGdlbmVyYXRpbmcgcHJlLXNpZ25lZCBVUkw6JywgZXJyb3IpO1xuICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7IGVycm9yOiAnSW50ZXJuYWwgU2VydmVyIEVycm9yJyB9KTtcbiAgfVxufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxsZW5vdm9cXFxcT25lRHJpdmVcXFxcRGVza3RvcFxcXFxTdWRhcnNoYW5fQ3JhZnRzX1dlYnNpdGVcXFxcYXBpXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxsZW5vdm9cXFxcT25lRHJpdmVcXFxcRGVza3RvcFxcXFxTdWRhcnNoYW5fQ3JhZnRzX1dlYnNpdGVcXFxcYXBpXFxcXHVwbG9hZC1pbWFnZS5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvbGVub3ZvL09uZURyaXZlL0Rlc2t0b3AvU3VkYXJzaGFuX0NyYWZ0c19XZWJzaXRlL2FwaS91cGxvYWQtaW1hZ2UuanNcIjtpbXBvcnQgeyBTM0NsaWVudCwgUHV0T2JqZWN0Q29tbWFuZCB9IGZyb20gJ0Bhd3Mtc2RrL2NsaWVudC1zMyc7XG5pbXBvcnQgeyB2NCBhcyB1dWlkdjQgfSBmcm9tICd1dWlkJztcbmltcG9ydCBzaGFycCBmcm9tICdzaGFycCc7XG5cbmV4cG9ydCBjb25zdCBjb25maWcgPSB7XG4gIGFwaToge1xuICAgIGJvZHlQYXJzZXI6IGZhbHNlLFxuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gaGFuZGxlcihyZXEsIHJlcykge1xuICAvLyBQb2x5ZmlsbHMgZm9yIHJhdyBOb2RlLmpzIGVudmlyb25tZW50cyAobG9jYWwgZGV2KVxuICBpZiAoIXJlcy5zdGF0dXMpIHJlcy5zdGF0dXMgPSAoY29kZSkgPT4geyByZXMuc3RhdHVzQ29kZSA9IGNvZGU7IHJldHVybiByZXM7IH07XG4gIGlmICghcmVzLmpzb24pIHJlcy5qc29uID0gKGRhdGEpID0+IHsgcmVzLnNldEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKTsgcmVzLmVuZChKU09OLnN0cmluZ2lmeShkYXRhKSk7IH07XG5cbiAgaWYgKHJlcS5tZXRob2QgIT09ICdQT1NUJykge1xuICAgIHJldHVybiByZXMuc3RhdHVzKDQwNSkuanNvbih7IGVycm9yOiAnTWV0aG9kIG5vdCBhbGxvd2VkJyB9KTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgbGV0IGJ1ZmZlcjtcbiAgICBpZiAoQnVmZmVyLmlzQnVmZmVyKHJlcS5ib2R5KSkge1xuICAgICAgYnVmZmVyID0gcmVxLmJvZHk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIEluIGNhc2Ugd2UgYXJlIHJ1bm5pbmcgaW4gYW4gZW52aXJvbm1lbnQgdGhhdCBkaWRuJ3QgcGFyc2UgdGhlIGJ1ZmZlclxuICAgICAgY29uc3QgY2h1bmtzID0gW107XG4gICAgICBmb3IgYXdhaXQgKGNvbnN0IGNodW5rIG9mIHJlcSkge1xuICAgICAgICBjaHVua3MucHVzaChjaHVuayk7XG4gICAgICB9XG4gICAgICBidWZmZXIgPSBCdWZmZXIuY29uY2F0KGNodW5rcyk7XG4gICAgfVxuXG4gICAgaWYgKCFidWZmZXIgfHwgYnVmZmVyLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgZXJyb3I6ICdObyBpbWFnZSBkYXRhIHByb3ZpZGVkJyB9KTtcbiAgICB9XG5cbiAgICAvLyBDb252ZXJ0IHRvIEFWSUZcbiAgICBjb25zdCBhdmlmQnVmZmVyID0gYXdhaXQgc2hhcnAoYnVmZmVyKVxuICAgICAgLmF2aWYoeyBxdWFsaXR5OiA4MCwgZWZmb3J0OiA0IH0pXG4gICAgICAudG9CdWZmZXIoKTtcblxuICAgIGNvbnN0IHMzID0gbmV3IFMzQ2xpZW50KHtcbiAgICAgIHJlZ2lvbjogJ2F1dG8nLFxuICAgICAgZW5kcG9pbnQ6IGBodHRwczovLyR7cHJvY2Vzcy5lbnYuUjJfQUNDT1VOVF9JRH0ucjIuY2xvdWRmbGFyZXN0b3JhZ2UuY29tYCxcbiAgICAgIGNyZWRlbnRpYWxzOiB7XG4gICAgICAgIGFjY2Vzc0tleUlkOiBwcm9jZXNzLmVudi5SMl9BQ0NFU1NfS0VZX0lELFxuICAgICAgICBzZWNyZXRBY2Nlc3NLZXk6IHByb2Nlc3MuZW52LlIyX1NFQ1JFVF9BQ0NFU1NfS0VZLFxuICAgICAgfSxcbiAgICB9KTtcblxuICAgIGNvbnN0IGZvbGRlciA9ICd1cGxvYWRzJztcbiAgICBjb25zdCBmaWxlTmFtZSA9IGAke2ZvbGRlcn0vJHt1dWlkdjQoKX0uYXZpZmA7XG4gICAgY29uc3QgYnVja2V0TmFtZSA9IHByb2Nlc3MuZW52LlIyX0JVQ0tFVF9OQU1FIHx8ICdzdWRhcnNoYW4tZ2FsbGVyeSc7XG5cbiAgICBjb25zdCBjb21tYW5kID0gbmV3IFB1dE9iamVjdENvbW1hbmQoe1xuICAgICAgQnVja2V0OiBidWNrZXROYW1lLFxuICAgICAgS2V5OiBmaWxlTmFtZSxcbiAgICAgIEJvZHk6IGF2aWZCdWZmZXIsXG4gICAgICBDb250ZW50VHlwZTogJ2ltYWdlL2F2aWYnLFxuICAgIH0pO1xuXG4gICAgYXdhaXQgczMuc2VuZChjb21tYW5kKTtcblxuICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7XG4gICAgICBmaWxlTmFtZSxcbiAgICAgIHB1YmxpY1VybDogYCR7cHJvY2Vzcy5lbnYuUjJfUFVCTElDX1VSTH0vJHtmaWxlTmFtZX1gLFxuICAgIH0pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHVwbG9hZGluZyBpbWFnZTonLCBlcnJvcik7XG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgZXJyb3I6ICdJbnRlcm5hbCBTZXJ2ZXIgRXJyb3InLCBkZXRhaWxzOiBlcnJvci5tZXNzYWdlIH0pO1xuICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXlXLFNBQVMsb0JBQW9CO0FBQ3RZLE9BQU8sV0FBVztBQUNsQixPQUFPLFlBQVk7OztBQ0YwVyxTQUFTLFVBQVUsd0JBQXdCO0FBQ3hhLFNBQVMsb0JBQW9CO0FBQzdCLFNBQVMsTUFBTSxjQUFjO0FBRTdCLGVBQU8sUUFBK0IsS0FBSyxLQUFLO0FBRTlDLE1BQUksQ0FBQyxJQUFJLE9BQVEsS0FBSSxTQUFTLENBQUMsU0FBUztBQUFFLFFBQUksYUFBYTtBQUFNLFdBQU87QUFBQSxFQUFLO0FBQzdFLE1BQUksQ0FBQyxJQUFJLEtB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LE9BQU8sTUFBTTtBQUNqQixnQkFBSSxPQUFPLEtBQUssTUFBTSxRQUFRLElBQUk7QUFDbEMsb0JBQW9CLEtBQUssR0FBRztBQUFBLFVBQy9CLENBQUM7QUFBQSxRQUNKLE9BQU87QUFDSixlQUFLO0FBQUEsUUFDUjtBQUFBLE1BQ0YsQ0FBQztBQUVELGFBQU8sWUFBWSxJQUFJLHFCQUFxQixDQUFDLEtBQUssS0FBSyxTQUFTO0FBQzlELFlBQUksSUFBSSxXQUFXLFFBQVE7QUFDeEIsZ0JBQU0sU0FBUyxDQUFDO0FBQ2hCLGNBQUksR0FBRyxRQUFRLFdBQVMsT0FBTyxLQUFLLEtBQUssQ0FBQztBQUMxQyxjQUFJLEdBQUcsT0FBTyxNQUFNO0FBQ2pCLGdCQUFJLE9BQU8sT0FBTyxPQUFPLE1BQU07QUFDL0IsWUFBQUMsU0FBbUIsS0FBSyxHQUFHO0FBQUEsVUFDOUIsQ0FBQztBQUFBLFFBQ0osT0FBTztBQUNKLGVBQUs7QUFBQSxRQUNSO0FBQUEsTUFDRixDQUFDO0FBQUEsSUFDSDtBQUFBLEVBQ0Y7QUFDRjtBQUVBLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxNQUFNLEdBQUcsY0FBYyxDQUFDO0FBQUEsRUFDbEMsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1I7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogWyJTM0NsaWVudCIsICJQdXRPYmplY3RDb21tYW5kIiwgInV1aWR2NCIsICJoYW5kbGVyIiwgIlMzQ2xpZW50IiwgInV1aWR2NCIsICJQdXRPYmplY3RDb21tYW5kIiwgImhhbmRsZXIiXQp9Cg==
