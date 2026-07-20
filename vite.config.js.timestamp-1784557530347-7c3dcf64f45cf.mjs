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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiLCAiYXBpL2dldC11cGxvYWQtdXJsLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcbGVub3ZvXFxcXE9uZURyaXZlXFxcXERlc2t0b3BcXFxcU3VkYXJzaGFuX0NyYWZ0c19XZWJzaXRlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxsZW5vdm9cXFxcT25lRHJpdmVcXFxcRGVza3RvcFxcXFxTdWRhcnNoYW5fQ3JhZnRzX1dlYnNpdGVcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL2xlbm92by9PbmVEcml2ZS9EZXNrdG9wL1N1ZGFyc2hhbl9DcmFmdHNfV2Vic2l0ZS92aXRlLmNvbmZpZy5qc1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xyXG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnO1xyXG5pbXBvcnQgZG90ZW52IGZyb20gJ2RvdGVudic7XHJcbmltcG9ydCBnZXRVcGxvYWRVcmxIYW5kbGVyIGZyb20gJy4vYXBpL2dldC11cGxvYWQtdXJsLmpzJztcclxuXHJcbi8vIExvYWQgLmVudi5sb2NhbCBmb3IgYmFja2VuZCBrZXlzXHJcbmRvdGVudi5jb25maWcoeyBwYXRoOiAnLmVudi5sb2NhbCcgfSk7XHJcblxyXG4vLyBTaW1wbGUgVml0ZSBtaWRkbGV3YXJlIHRvIG1vY2sgVmVyY2VsIHNlcnZlcmxlc3MgZnVuY3Rpb25zIGxvY2FsbHlcclxuY29uc3QgYXBpTWlkZGxld2FyZSA9ICgpID0+IHtcclxuICByZXR1cm4ge1xyXG4gICAgbmFtZTogJ2FwaS1taWRkbGV3YXJlJyxcclxuICAgIGNvbmZpZ3VyZVNlcnZlcihzZXJ2ZXIpIHtcclxuICAgICAgc2VydmVyLm1pZGRsZXdhcmVzLnVzZSgnL2FwaS9nZXQtdXBsb2FkLXVybCcsIChyZXEsIHJlcywgbmV4dCkgPT4ge1xyXG4gICAgICAgIGlmIChyZXEubWV0aG9kID09PSAnUE9TVCcpIHtcclxuICAgICAgICAgICBsZXQgYm9keSA9ICcnO1xyXG4gICAgICAgICAgIHJlcS5vbignZGF0YScsIGNodW5rID0+IGJvZHkgKz0gY2h1bmsudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgcmVxLm9uKCdlbmQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgcmVxLmJvZHkgPSBKU09OLnBhcnNlKGJvZHkgfHwgJ3t9Jyk7XHJcbiAgICAgICAgICAgICAgZ2V0VXBsb2FkVXJsSGFuZGxlcihyZXEsIHJlcyk7XHJcbiAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICBuZXh0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHBsdWdpbnM6IFtyZWFjdCgpLCBhcGlNaWRkbGV3YXJlKCldLFxyXG4gIHNlcnZlcjoge1xyXG4gICAgcG9ydDogMzAwMCxcclxuICAgIG9wZW46IHRydWUsXHJcbiAgfSxcclxufSk7IiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxsZW5vdm9cXFxcT25lRHJpdmVcXFxcRGVza3RvcFxcXFxTdWRhcnNoYW5fQ3JhZnRzX1dlYnNpdGVcXFxcYXBpXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxsZW5vdm9cXFxcT25lRHJpdmVcXFxcRGVza3RvcFxcXFxTdWRhcnNoYW5fQ3JhZnRzX1dlYnNpdGVcXFxcYXBpXFxcXGdldC11cGxvYWQtdXJsLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9sZW5vdm8vT25lRHJpdmUvRGVza3RvcC9TdWRhcnNoYW5fQ3JhZnRzX1dlYnNpdGUvYXBpL2dldC11cGxvYWQtdXJsLmpzXCI7aW1wb3J0IHsgUzNDbGllbnQsIFB1dE9iamVjdENvbW1hbmQgfSBmcm9tICdAYXdzLXNkay9jbGllbnQtczMnO1xuaW1wb3J0IHsgZ2V0U2lnbmVkVXJsIH0gZnJvbSAnQGF3cy1zZGsvczMtcmVxdWVzdC1wcmVzaWduZXInO1xuaW1wb3J0IHsgdjQgYXMgdXVpZHY0IH0gZnJvbSAndXVpZCc7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIGhhbmRsZXIocmVxLCByZXMpIHtcbiAgLy8gUG9seWZpbGxzIGZvciByYXcgTm9kZS5qcyBlbnZpcm9ubWVudHMgKGxvY2FsIGRldilcbiAgaWYgKCFyZXMuc3RhdHVzKSByZXMuc3RhdHVzID0gKGNvZGUpID0+IHsgcmVzLnN0YXR1c0NvZGUgPSBjb2RlOyByZXR1cm4gcmVzOyB9O1xuICBpZiAoIXJlcy5qc29uKSByZXMuanNvbiA9IChkYXRhKSA9PiB7IHJlcy5zZXRIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7IHJlcy5lbmQoSlNPTi5zdHJpbmdpZnkoZGF0YSkpOyB9O1xuXG4gIGlmIChyZXEubWV0aG9kICE9PSAnUE9TVCcpIHtcbiAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDUpLmpzb24oeyBlcnJvcjogJ01ldGhvZCBub3QgYWxsb3dlZCcgfSk7XG4gIH1cblxuICBjb25zdCB7IGNvbnRlbnRUeXBlLCBmb2xkZXIgPSAndXBsb2FkcycgfSA9IHJlcS5ib2R5O1xuICBpZiAoIWNvbnRlbnRUeXBlKSB7XG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgZXJyb3I6ICdDb250ZW50IHR5cGUgaXMgcmVxdWlyZWQnIH0pO1xuICB9XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBzMyA9IG5ldyBTM0NsaWVudCh7XG4gICAgICByZWdpb246ICdhdXRvJyxcbiAgICAgIGVuZHBvaW50OiBgaHR0cHM6Ly8ke3Byb2Nlc3MuZW52LlIyX0FDQ09VTlRfSUR9LnIyLmNsb3VkZmxhcmVzdG9yYWdlLmNvbWAsXG4gICAgICBjcmVkZW50aWFsczoge1xuICAgICAgICBhY2Nlc3NLZXlJZDogcHJvY2Vzcy5lbnYuUjJfQUNDRVNTX0tFWV9JRCxcbiAgICAgICAgc2VjcmV0QWNjZXNzS2V5OiBwcm9jZXNzLmVudi5SMl9TRUNSRVRfQUNDRVNTX0tFWSxcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICBjb25zdCBmaWxlRXh0ZW5zaW9uID0gY29udGVudFR5cGUuc3BsaXQoJy8nKVsxXSB8fCAnanBnJztcbiAgICBjb25zdCBmaWxlTmFtZSA9IGAke2ZvbGRlcn0vJHt1dWlkdjQoKX0uJHtmaWxlRXh0ZW5zaW9ufWA7XG4gICAgXG4gICAgLy8gRW5zdXJlIHRoZSBidWNrZXQgbmFtZSBtYXRjaGVzIHdoYXQgdGhlIHVzZXIgc2V0cyB1cFxuICAgIGNvbnN0IGJ1Y2tldE5hbWUgPSBwcm9jZXNzLmVudi5SMl9CVUNLRVRfTkFNRSB8fCAnc3VkYXJzaGFuLWdhbGxlcnknO1xuXG4gICAgY29uc3QgY29tbWFuZCA9IG5ldyBQdXRPYmplY3RDb21tYW5kKHtcbiAgICAgIEJ1Y2tldDogYnVja2V0TmFtZSxcbiAgICAgIEtleTogZmlsZU5hbWUsXG4gICAgICBDb250ZW50VHlwZTogY29udGVudFR5cGUsXG4gICAgfSk7XG5cbiAgICAvLyBVUkwgZXhwaXJlcyBpbiA1IG1pbnV0ZXNcbiAgICBjb25zdCBzaWduZWRVcmwgPSBhd2FpdCBnZXRTaWduZWRVcmwoczMsIGNvbW1hbmQsIHsgZXhwaXJlc0luOiAzMDAgfSk7XG5cbiAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oe1xuICAgICAgdXBsb2FkVXJsOiBzaWduZWRVcmwsXG4gICAgICBmaWxlTmFtZSxcbiAgICAgIHB1YmxpY1VybDogYCR7cHJvY2Vzcy5lbnYuUjJfUFVCTElDX1VSTH0vJHtmaWxlTmFtZX1gLFxuICAgIH0pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGdlbmVyYXRpbmcgcHJlLXNpZ25lZCBVUkw6JywgZXJyb3IpO1xuICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7IGVycm9yOiAnSW50ZXJuYWwgU2VydmVyIEVycm9yJyB9KTtcbiAgfVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF5VyxTQUFTLG9CQUFvQjtBQUN0WSxPQUFPLFdBQVc7QUFDbEIsT0FBTyxZQUFZOzs7QUNGMFcsU0FBUyxVQUFVLHdCQUF3QjtBQUN4YSxTQUFTLG9CQUFvQjtBQUM3QixTQUFTLE1BQU0sY0FBYztBQUU3QixlQUFPLFFBQStCLEtBQUssS0FBSztBQUU5QyxNQUFJLENBQUMsSUFBSSxPQUFRLEtBQUksU0FBUyxDQUFDLFNBQVM7QUFBRSxRQUFJLGFBQWE7QUFBTSxXQUFPO0FBQUEsRUFBSztBQUM3RSxNQUFJLENBQUMsSUFBSSxLQUFNLEtBQUksT0FBTyxDQUFDLFNBQVM7QUFBRSxRQUFJLFVBQVUsZ0JBQWdCLGtCQUFrQjtBQUFHLFFBQUksSUFBSSxLQUFLLFVBQVUsSUFBSSxDQUFDO0FBQUEsRUFBRztBQUV4SCxNQUFJLElBQUksV0FBVyxRQUFRO0FBQ3pCLFdBQU8sSUFBSSxPQUFPLEdBQUcsRUFBRSxLQUFLLEVBQUUsT0FBTyxxQkFBcUIsQ0FBQztBQUFBLEVBQzdEO0FBRUEsUUFBTSxFQUFFLGFBQWEsU0FBUyxVQUFVLElBQUksSUFBSTtBQUNoRCxNQUFJLENBQUMsYUFBYTtBQUNoQixXQUFPLElBQUksT0FBTyxHQUFHLEVBQUUsS0FBSyxFQUFFLE9BQU8sMkJBQTJCLENBQUM7QUFBQSxFQUNuRTtBQUVBLE1BQUk7QUFDRixVQUFNLEtBQUssSUFBSSxTQUFTO0FBQUEsTUFDdEIsUUFBUTtBQUFBLE1BQ1IsVUFBVSxXQUFXLFFBQVEsSUFBSSxhQUFhO0FBQUEsTUFDOUMsYUFBYTtBQUFBLFFBQ1gsYUFBYSxRQUFRLElBQUk7QUFBQSxRQUN6QixpQkFBaUIsUUFBUSxJQUFJO0FBQUEsTUFDL0I7QUFBQSxJQUNGLENBQUM7QUFFRCxVQUFNLGdCQUFnQixZQUFZLE1BQU0sR0FBRyxFQUFFLENBQUMsS0FBSztBQUNuRCxVQUFNLFdBQVcsR0FBRyxNQUFNLElBQUksT0FBTyxDQUFDLElBQUksYUFBYTtBQUd2RCxVQUFNLGFBQWEsUUFBUSxJQUFJLGtCQUFrQjtBQUVqRCxVQUFNLFVBQVUsSUFBSSxpQkFBaUI7QUFBQSxNQUNuQyxRQUFRO0FBQUEsTUFDUixLQUFLO0FBQUEsTUFDTCxhQUFhO0FBQUEsSUFDZixDQUFDO0FBR0QsVUFBTSxZQUFZLE1BQU0sYUFBYSxJQUFJLFNBQVMsRUFBRSxXQUFXLElBQUksQ0FBQztBQUVwRSxXQUFPLElBQUksT0FBTyxHQUFHLEVBQUUsS0FBSztBQUFBLE1BQzFCLFdBQVc7QUFBQSxNQUNYO0FBQUEsTUFDQSxXQUFXLEdBQUcsUUFBUSxJQUFJLGFBQWEsSUFBSSxRQUFRO0FBQUEsSUFDckQsQ0FBQztBQUFBLEVBQ0gsU0FBUyxPQUFPO0FBQ2QsWUFBUSxNQUFNLG9DQUFvQyxLQUFLO0FBQ3ZELFdBQU8sSUFBSSxPQUFPLEdBQUcsRUFBRSxLQUFLLEVBQUUsT0FBTyx3QkFBd0IsQ0FBQztBQUFBLEVBQ2hFO0FBQ0Y7OztBRDlDQSxPQUFPLE9BQU8sRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUdwQyxJQUFNLGdCQUFnQixNQUFNO0FBQzFCLFNBQU87QUFBQSxJQUNMLE1BQU07QUFBQSxJQUNOLGdCQUFnQixRQUFRO0FBQ3RCLGFBQU8sWUFBWSxJQUFJLHVCQUF1QixDQUFDLEtBQUssS0FBSyxTQUFTO0FBQ2hFLFlBQUksSUFBSSxXQUFXLFFBQVE7QUFDeEIsY0FBSSxPQUFPO0FBQ1gsY0FBSSxHQUFHLFFBQVEsV0FBUyxRQUFRLE1BQU0sU0FBUyxDQUFDO0FBQ2hELGNBQUksR0FBRyxPQUFPLE1BQU07QUFDakIsZ0JBQUksT0FBTyxLQUFLLE1BQU0sUUFBUSxJQUFJO0FBQ2xDLG9CQUFvQixLQUFLLEdBQUc7QUFBQSxVQUMvQixDQUFDO0FBQUEsUUFDSixPQUFPO0FBQ0osZUFBSztBQUFBLFFBQ1I7QUFBQSxNQUNGLENBQUM7QUFBQSxJQUNIO0FBQUEsRUFDRjtBQUNGO0FBRUEsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUyxDQUFDLE1BQU0sR0FBRyxjQUFjLENBQUM7QUFBQSxFQUNsQyxRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsRUFDUjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
