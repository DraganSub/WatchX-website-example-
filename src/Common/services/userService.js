import FirebaseService from "./firebaseService";
class UserService {
  constructor() {
    this.firebaseService = new FirebaseService();
  }

  getUsers = async () => {
    let items = [];
    const data = await this.firebaseService.users();
    data.on("value", (snap) => {
      let result = [];
      snap.forEach((item) => {
        result.push({ ...item.val() });
      });
      items = result;
    });
    return items;
  };

  delete = async (id) => {
    this.firebaseService.user(id).remove();
  };
}

export default UserService;
