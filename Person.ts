import IBtreeItem from "./IBtreeItem";

class Person implements IBtreeItem {
  public name: string;
  public age: number;
  public test: string;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
    this.test = "ok"
  }

  public compareTo(object?: Person | null, id?: number | string): number {
    
    if (!object && id == null){
      return 1;
    }

    if (object) {
      if (this.age < object.age) {
        return -1;
      } else if (this.age == object.age) {
        return 0;
      } else if (this.age > object.age) {
        return 1;
      }
    } else if (id != null) {
      if (this.age < id) {
        return -1;
      } else if (this.age == id) {
        return 0;
      } else if (this.age > id) {
        return 1;
      }
    }
    return 1;
  }
}

export default Person;