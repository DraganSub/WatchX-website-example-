import { action, makeObservable, observable } from "mobx";

class NavigationStore {
  constructor() {
    makeObservable(this, {
      isClicked: observable,
      setIsClicked: action,
    });
  }

  //observable
  isClicked = false;

  //method
  setIsClicked = () => {
    this.isClicked = !this.isClicked;
  };
}

export default NavigationStore;
