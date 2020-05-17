import Image from '~/domain/models/images/image'
import ImageUrl from '~/domain/models/images/imageUrl'

export default interface ImageRepository {
  save(image: Image): Promise<void>
  delete(image: Image): Promise<void>
  findUrl(image: Image): Promise<ImageUrl>
}
