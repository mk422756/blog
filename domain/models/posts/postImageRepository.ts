import Post from './post'
import PostId from './postId'
import UserId from '~/domain/models/users/userId'

export default interface PostImageRepository {
  FindAll(): Promise<Post[]>
  Find(id: PostId): Promise<Post | null>
  FindByUserId(userId: UserId): Promise<Post[]>
  Save(post: Post): Promise<void>
  Delete(post: Post): Promise<void>
}
