const request = require('supertest');
const app = require('./app');

const id = 1;
const testUser = {
    name: 'test',
    username: 'test',
    email: 'test@example.com',
};

describe('Users Routes', () => {
    describe('Get all users', () => {
        test('if response with 200 status code', async () => {
            const res = await request(app).get(`/api/users`);
            expect(res.statusCode).toBe(200);
        });
        test('if response body contains array', async () => {
            const res = await request(app).get(`/api/users`);
            expect(Array.isArray(res.body)).toBeTruthy();
        });
        test('if header contains application/json', async () => {
            const res = await request(app).get(`/api/users`);
            expect(res.headers['content-type']).toEqual(expect.stringContaining('application/json'));
        });
        test('if array from response contains objects with id', async () => {
            const res = await request(app).get(`/api/users`);
            expect(res.body.every((user) => typeof user.id == 'number')).toEqual(true);
        });
    });

    describe('Get user by id', () => {
        test('if response with 200 status code', async () => {
            const res = await request(app).get(`/api/users/${id}`);
            expect(res.statusCode).toBe(200);
        });
        test('if header contains application/json', async () => {
            const res = await request(app).get(`/api/users/${id}`);
            expect(res.headers['content-type']).toEqual(expect.stringContaining('application/json'));
        });
        test('if array from response contains objects with id', async () => {
            const res = await request(app).get(`/api/users/${id}`);
            expect(typeof res.body.id).toEqual('number');
        });
    });

    describe('Create User', () => {
        test('if respond with error when no fileds sent', async () => {
            const res = await request(app).post(`/api/users`).send({});
            expect(Array.isArray(res.body.errors)).toBeTruthy();
        });
        test('if with status 200 when data is filled in', async () => {
            const res = await request(app).post(`/api/users`).send(testUser);
            expect(res.statusCode).toBe(200);
        });
    });

    describe('Update User', () => {
        test('if respond with error when no fileds sent', async () => {
            const res = await request(app).put(`/api/users/${id}`).send({});
            expect(Array.isArray(res.body.errors)).toBeTruthy();
        });
        test('if with status 200 when data is filled in', async () => {
            const res = await request(app).put(`/api/users/${id}`).send(testUser);
            expect(res.statusCode).toBe(200);
        });
    });

    describe('Delete User', () => {
        test('if user Deleted', async () => {
            const res = await request(app).delete(`/api/users/${id}`);
            expect(res.body.message).toEqual('User Deleted');
        });
    });
});
