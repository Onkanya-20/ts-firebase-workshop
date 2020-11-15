import React, { useEffect, useState, useCallback } from 'react';

import {
  reqCreateUser,
  reqUser,
  reqDeleteUser,
  reqUserById,
  reqUpdateUser,
  User
} from 'services/user.service';

import { useConfirm } from 'material-ui-confirm';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';

import UserList from './UserList';
import UserForm from './UserForm';

const Users: React.FC = () => {
  const confirm = useConfirm();
  const [users, setUsers] = useState<User[]>([]);
  const [open, setOpen] = useState(false);
  const [initValues, setInitValues] = useState({});

  useEffect(() => {
    reqUser().then((response: any) => setUsers(response));
  }, []);

  const fetchData = () => {
    return reqUser().then((response: any) => setUsers(response));
  };

  const handleCreateUser = (
    values: Partial<unknown>,
    form: { reset: (data: Partial<unknown>) => void }
  ) => {
    if (Object.keys(initValues).length > 0) {
      return reqUpdateUser(values)
        .then(() => {
          fetchData();
          setTimeout(() => {
            form.reset({});
          }, 100);
        })
        .catch(() => {})
        .finally(() => {
          setOpen(false);
          setInitValues({});
        });
    }

    return reqCreateUser(values)
      .then(() => {
        fetchData();
        setTimeout(() => {
          form.reset({});
        }, 100);
      })
      .catch(() => {})
      .finally(() => {
        setOpen(false);
        setInitValues({});
      });
  };

  const handleDelete = useCallback(
    (id: string) => {
      return confirm({
        title: 'Confirmation!',
        description: `Are you sure to delete user id: ${id}`
      })
        .then(() => reqDeleteUser(id))
        .catch(() => {})
        .finally(() => fetchData());
    },
    [confirm]
  );

  const handleUpdate = (id: string) => {
    return reqUserById(id).then((response: any) => {
      setInitValues(response);
      setOpen(true);
    });
  };

  return (
    <>
      <Button variant="outlined" color="primary" onClick={() => setOpen(true)}>
        Open form dialog
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogContent>
          <UserForm initValues={initValues} onCreate={handleCreateUser} />
        </DialogContent>
      </Dialog>
      <UserList users={users} onDelete={handleDelete} onUpdate={handleUpdate} />
    </>
  );
};

export default Users;
