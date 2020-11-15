import { db, timestamp } from '../firebase';

export type User = {
  id: string;
  firstName?: string;
  lastName?: string;
  age?: string;
  updatedAt: {
    seconds: number;
    nanoseconds: number;
    toDate: () => string;
  };
  createdAt: {
    seconds: number;
    nanoseconds: number;
    toDate: () => string;
  };
};

const userDb = db.collection('users');

const reqUser = (): Promise<unknown> => {
  return userDb.get().then(querySnapshot => {
    return querySnapshot.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data()
      };
    });
  });
};

const reqUserById = (id: string): Promise<unknown> => {
  return userDb
    .doc(id)
    .get()
    .then(doc => {
      return {
        id: doc.id,
        ...doc.data()
      };
    });
};

const reqCreateUser = (values: Partial<User>): Promise<unknown> => {
  return userDb.add({
    ...values,
    created_at: timestamp,
    updated_at: timestamp
  });
};

const reqDeleteUser = (id: string): Promise<void> => {
  return userDb.doc(id).delete();
};

const reqUpdateUser = (values: Partial<User>): Promise<unknown> => {
  const { id, ...rest } = values;
  return userDb.doc(id).update({ ...rest, update_at: timestamp });
};

export { reqUser, reqUserById, reqCreateUser, reqDeleteUser, reqUpdateUser };
