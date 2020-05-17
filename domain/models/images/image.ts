export default class Image {
  constructor(private _path: string, private _blob: Blob = new Blob()) {}

  get path() {
    return this._path
  }

  get blob() {
    return this._blob
  }
}
