import { observable, action, makeObservable, runInAction } from "mobx";
import UserService from "../Common/services/userService";

class UserStore {
  constructor() {
    makeObservable(this, {
      users: observable,
      setUsers: action,
      setUser: action,
      getUsersList: action,
      deleteUser: action,
    });
    this.userService = new UserService();
  }

  // observable users list
  users = [];

  //user methods

  getUsersList = async () => {
    const data = await this.userService.getUsers();
    runInAction(() => {
      this.users = data;
    });
  };

  setUsers = (users) => {
    this.users = users;
  };

  setUser = (user, uid) => {
    if (!this.users) {
      this.users = {};
    }
    this.users[uid] = user;
  };

  deleteUser = (uid) => {
    this.userService.delete(uid);
  };
}

export default UserStore;
