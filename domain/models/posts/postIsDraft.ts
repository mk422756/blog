export default class PostIsDraft {
  constructor(private _isDraft: boolean) {}

  get value() {
    return this._isDraft
  }
}
