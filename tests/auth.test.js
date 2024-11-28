const request = require('supertest');
const app = require('../server');
const User = require('../models/User');

describe('Auth API', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: 'testuser@example.com',
        password: 'password123',
      });
    expect(res.status).toBe(201);
    expect(res.body.token).toBeDefined();
  });

  it('should login an existing user', async () => {
    await User.create({ name: 'Test User', email: 'testuser@example.com', password: 'password123' });
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'testuser@example.com',
        password: 'password123',
      });
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});
