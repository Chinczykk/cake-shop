export class FakeBackendService {

  private data: any = {
    cakes_list: []
  };

  constructor() {}

  public set(key, data) {
    this.data[key] = data;
  }

  public add(key, data) {
    this.data[key].push(data);
  }

  public get(key) {
    return this.data[key];
  }

  public remove(key) {
    delete this.data[key];
  }

  public removeItemWithId(key, id) {
    for (let i = 0; i < this.data[key].length; i++) {
      if (this.data[key][i].id === id) {
        this.data[key].splice(i, 1);
        return;
      }
    }
  }

  public updateItemWithId(key, id, data) {
    for (let i = 0; i < this.data[key].length; i++) {
      if (this.data[key][i].id === id) {
        this.data[key][i] = data;
        return;
      }
    }
  }

}
