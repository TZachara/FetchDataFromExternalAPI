const usersInteractor = require('./usersInteractor');

const id = 1;
const user = {};

describe('get all Users', () => {
    test('if respond with 200 status code', async () => {
        const res = await usersInteractor.getUsers();
        expect(res.status).toBe(200);
    });
    test('if header contains application/json', async () => {
        const res = await usersInteractor.getUsers();
        expect(res.headers['content-type']).toEqual(expect.stringContaining('application/json'));
    });
    test('if returns array', async () => {
        const res = await usersInteractor.getUsers();
        expect(Array.isArray(res.data)).toBeTruthy();
    });
    test('if array contains 10 records', async () => {
        const res = await usersInteractor.getUsers();
        expect(res.data.length).toBe(10);
    });
    test('if array from response contains objects with id', async () => {
        const res = await usersInteractor.getUsers();
        expect(res.data.every((user) => typeof user.id == 'number')).toEqual(true);
    });
});

describe('Get User By ID', () => {
    test('if respond with 200 status code', async () => {
        const res = await usersInteractor.getUserByIdIteractor(id);
        expect(res.status).toBe(200);
    });
    test('if header contains application/json', async () => {
        const res = await usersInteractor.getUserByIdIteractor(id);
        expect(res.headers['content-type']).toEqual(expect.stringContaining('application/json'));
    });
    test('if response has same id as in request', async () => {
        const res = await usersInteractor.getUserByIdIteractor(id);
        expect(res.data.id).toEqual(1);
    });
});

describe('Create User', () => {
    test('if respond with 200 status code', async () => {
        const res = await usersInteractor.createUser(user);
        expect(res.status).toBe(201);
    });
    test('if header contains application/json', async () => {
        const res = await usersInteractor.createUser(user);
        expect(res.headers['content-type']).toEqual(expect.stringContaining('application/json'));
    });
});

describe('Update User', () => {
    test('if respond with 200 status code', async () => {
        const res = await usersInteractor.updateUser(id, user);
        expect(res.status).toBe(200);
    });
    test('if header contains application/json', async () => {
        const res = await usersInteractor.updateUser(id, user);
        expect(res.headers['content-type']).toEqual(expect.stringContaining('application/json'));
    });
    test('if returns id', async () => {
        const res = await usersInteractor.updateUser(id, user);
        expect(typeof res.data.id).toEqual('number');
    });
});

describe('Delete User', () => {
    test('if user Deleted', async () => {
        const res = await usersInteractor.deleteUser(id);
        expect(res.data.message).toEqual('User Deleted');
    });
});
