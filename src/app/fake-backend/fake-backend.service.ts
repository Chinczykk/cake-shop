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

}
