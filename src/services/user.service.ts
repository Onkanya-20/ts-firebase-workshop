import { db, timestamp } from '../firebase';

const userDb = db.collection('users');

const reqUser = (): Promise<unknown> => {
  return userDb.get().then(querySnapshot => {
    return querySnapshot.docs.map(doc => {
      console.log(doc.id, doc.data());
      return {
        id: doc.id,
        ...doc.data()
      };
    });
  });
};

const reqCreateUser = (values: Partial<unknown>): Promise<unknown> => {
  return userDb.add({
    ...values,
    created_at: timestamp,
    updated_at: timestamp
  });
};

export { reqUser, reqCreateUser };
