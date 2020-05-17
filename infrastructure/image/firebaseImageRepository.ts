import ImageRepository from '~/domain/models/images/imageRepository'
import Image from '~/domain/models/images/image'
import ImageUrl from '~/domain/models/images/imageUrl'
import { storage } from '~/plugins/firebase'

export default class FirebaseImageRepository implements ImageRepository {
  async save(image: Image): Promise<void> {
    const storageRef = storage.ref()

    const fileRef = storageRef.child(image.path)
    await fileRef.put(image.blob)
  }

  async delete(image: Image): Promise<void> {
    const storageRef = storage.ref()

    const fileRef = storageRef.child(image.path)
    await fileRef.delete()
  }

  async findUrl(image: Image): Promise<ImageUrl> {
    const storageRef = storage.ref()

    const fileRef = storageRef.child(image.path)
    return new ImageUrl(await fileRef.getDownloadURL())
  }
}
