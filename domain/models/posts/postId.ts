export default class PostId {
  constructor(private _id: string) {}

  get value() {
    return this._id
  }
}
