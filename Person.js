"use strict";
exports.__esModule = true;
var Person = /** @class */ (function () {
    function Person(name, age) {
        this.name = name;
        this.age = age;
        this.test = "ok";
    }
    Person.prototype.compareTo = function (object, id) {
        if (!object && id == null) {
            return 1;
        }
        if (object) {
            if (this.age < object.age) {
                return -1;
            }
            else if (this.age == object.age) {
                return 0;
            }
            else if (this.age > object.age) {
                return 1;
            }
        }
        else if (id != null) {
            if (this.age < id) {
                return -1;
            }
            else if (this.age == id) {
                return 0;
            }
            else if (this.age > id) {
                return 1;
            }
        }
        return 1;
    };
    return Person;
}());
exports["default"] = Person;
