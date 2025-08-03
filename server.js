const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001; // Use a different port than Next.js

app.use(cors());
app.use(express.json());
app.use(express.raw({ type: 'application/octet-stream', limit: '10mb' }));

const simulateLatency = (min, max) => {
  return new Promise(resolve => {
    const delay = Math.floor(Math.random() * (max - min + 1)) + min;
    setTimeout(resolve, delay);
  });
};

app.get('/ping', async (req, res) => {
  await simulateLatency(20, 50);
  res.json({ status: 'success', ping: Math.floor(Math.random() * 20) + 15 });
});

app.get('/download', async (req, res) => {
  const size = parseInt(req.query.size) || 10000000;
  const buffer = Buffer.alloc(size, '0');
  const chunkSize = 1024 * 1024;
  const delayPerChunk = Math.random() * 20;
  
  res.setHeader('Content-Type', 'application/octet-stream');
  res.setHeader('Content-Length', size);
  
  for (let offset = 0; offset < size; offset += chunkSize) {
    const end = Math.min(offset + chunkSize, size);
    res.write(buffer.slice(offset, end));
    await new Promise(resolve => setTimeout(resolve, delayPerChunk));
  }
  
  res.end();
});

app.post('/upload', async (req, res) => {
  await simulateLatency(30, 100);
  const contentLength = parseInt(req.headers['content-length']) || 0;
  
  res.json({
    status: 'success',
    size: contentLength,
    uploadSpeed: (Math.random() * 40 + 10).toFixed(2)
  });
});

app.listen(port, () => {
  console.log(`SpeedTest backend running on port ${port}`);
});
