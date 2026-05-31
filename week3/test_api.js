const http = require('http');

function get(path) {
  return new Promise((resolve, reject) => {
    const req = http.get({ host: 'localhost', port: 5000, path, agent: false }, (res) => {
      let body = '';
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => resolve({ status: res.statusCode, body }));
    });
    req.on('error', reject);
  });
}

function post(path, data) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify(data);
    const options = {
      host: 'localhost',
      port: 5000,
      path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload),
      },
      agent: false,
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => resolve({ status: res.statusCode, body }));
    });

    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

(async () => {
  try {
    console.log('GET /api');
    const api = await get('/api');
    console.log(api);

    console.log('\nPOST /api/auth/signup (test)');
    const signup = await post('/api/auth/signup', { name: 'Test', email: 'test@example.com', password: 'password123' });
    console.log(signup);
  } catch (err) {
    console.error('Request failed:', err.message);
  }
})();
