import FirebaseService from "./firebaseService";

class HomepageService {
  constructor() {
    this.firebaseService = new FirebaseService();
  }

  getRandomProducts = async () => {
    const data = await this.firebaseService.db.ref("products").limitToLast(4);
    let list = [];
    data.on("value", (snap) => {
      let result = [];
      snap.forEach((item) => {
        result.push(item.val());
      });
      list = result;
    });
    return list;
  };
}

export default HomepageService;
