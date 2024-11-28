const request = require('supertest');
const app = require('../server');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

describe('User API', () => {
  let token;

  beforeAll(async () => {
    const user = await User.create({
      name: 'Test User',
      email: 'testuser@example.com',
      password: 'password123',
    });
    token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  });

  it('should get user information', async () => {
    const res = await request(app)
      .get('/api/users/me')
      .set('x-auth-token', token);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Test User');
  });
});
