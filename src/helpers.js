export const randomInt = function (limit) {
  return Math.floor(Math.random() * (limit + 1));
};

export class Stack {
  constructor() {
    this.items = [];
  }

  push(item) {
    this.items.push(item);
  }

  pop() {
    if (this.items.length == 0) return;
    return this.items.pop();
  }

  isEmpty() {
    return this.items.length === 0;
  }
}
