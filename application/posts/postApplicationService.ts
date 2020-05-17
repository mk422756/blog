import UserId from '~/domain/models/users/userId'
import Post from '~/domain/models/posts/post'
import PostId from '~/domain/models/posts/postId'
import PostRepository from '~/domain/models/posts/postRepository'
import FirestorePostRepository from '~/infrastructure/post/firestorePostRepository'
import PostData from './postData'
import PostHtmlText from '~/domain/models/posts/postHtmlText'
import PostMarkdownText from '~/domain/models/posts/postMarkdownText'
import PostTitle from '~/domain/models/posts/postTitle'
import PostIsDraft from '~/domain/models/posts/postIsDraft'
import Image from '~/domain/models/images/image'
import ImageUrl from '~/domain/models/images/imageUrl'
import { v4 as uuidv4 } from 'uuid'
import ImageRepository from '~/domain/models/images/imageRepository'
import FirebaseImageRepository from '~/infrastructure/image/firebaseImageRepository'

export default class PostApplicationService {
  private postRepository: PostRepository
  private imageRepository: ImageRepository

  constructor(
    postRepository: PostRepository = new FirestorePostRepository(),
    imageRepository: ImageRepository = new FirebaseImageRepository()
  ) {
    this.postRepository = postRepository
    this.imageRepository = imageRepository
  }

  private postModelToData(post: Post): PostData {
    return {
      id: post.id.value,
      title: post.title.value,
      htmlText: post.htmlText.value,
      markdownText: post.markdownText.value,
      createdBy: post.createdBy.value,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      isDraft: post.isDraft.value
    }
  }

  async getAll(): Promise<PostData[]> {
    const posts = await this.postRepository.FindAll()

    const output: PostData[] = []
    posts.forEach((post) => {
      output.push(this.postModelToData(post))
    })

    return output
  }

  async getByUserId(userId: string): Promise<PostData[]> {
    const posts = await this.postRepository.FindByUserId(new UserId(userId))

    const output: PostData[] = []
    posts.forEach((post) => {
      output.push(this.postModelToData(post))
    })

    return output
  }

  async getById(id: string): Promise<PostData | null> {
    const post = await this.postRepository.Find(new PostId(id))
    if (!post) {
      return null
    }
    return this.postModelToData(post)
  }

  async create(
    title: string,
    htmlText: string,
    markdownText: string,
    createdBy: string
  ): Promise<Post> {
    const post = new Post(
      new PostId(uuidv4()),
      new PostTitle(title),
      new PostHtmlText(htmlText),
      new PostMarkdownText(markdownText),
      new UserId(createdBy),
      new Date(),
      new Date(),
      new PostIsDraft(true)
    )
    await this.postRepository.Save(post)
    return post
  }

  async save(
    id: string,
    title: string,
    htmlText: string,
    markdownText: string,
    isDraft: boolean
  ): Promise<Post> {
    const post = await this.postRepository.Find(new PostId(id))
    if (post === null) {
      throw new Error('post not found')
    }

    post.changeTitle(new PostTitle(title))
    post.changeHtmlText(new PostHtmlText(htmlText))
    post.changeMarkdownText(new PostMarkdownText(markdownText))
    post.changeIsDraft(new PostIsDraft(isDraft))
    await this.postRepository.Save(post)
    return post
  }

  async delete(id: string): Promise<void> {
    const post = await this.postRepository.Find(new PostId(id))
    if (post === null) {
      throw new Error('post not found')
    }
    await this.postRepository.Delete(post)
  }

  async imageUpload(path: string, file: File): Promise<ImageUrl> {
    const image = new Image(path, file)
    await this.imageRepository.save(image)
    return await this.imageRepository.findUrl(image)
  }

  async imageDelete(path: string): Promise<void> {
    const image = new Image(path)
    await this.imageRepository.delete(image)
  }
}
