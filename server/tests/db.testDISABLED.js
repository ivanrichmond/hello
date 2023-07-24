import {describe, expect, test} from '@jest/globals';
import dbConnect from '../src/db'

describe('user.db', () => {
  test('dbConnect()', () => {
    const db = dbConnect('../db/users.db');
    expect(db).toBeTruthy();
  });
});