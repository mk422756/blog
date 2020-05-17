import Post from '~/domain/models/posts/post'
import UserId from '~/domain/models/users/userId'
import PostId from '~/domain/models/posts/postId'
import PostTitle from '~/domain/models/posts/postTitle'
import PostHtmlText from '~/domain/models/posts/postHtmlText'
import PostMarkdownText from '~/domain/models/posts/postMarkdownText'
import PostIsDraft from '~/domain/models/posts/postIsDraft'
import PostRepository from '~/domain/models/posts/postRepository'
import { db } from '~/plugins/firebase'

export default class FirestorePostRepository implements PostRepository {
  private postSnapshotToModel(
    snapshot:
      | firebase.firestore.QueryDocumentSnapshot<
          firebase.firestore.DocumentData
        >
      | firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>
  ): Post {
    const data = snapshot.data()
    return new Post(
      new PostId(snapshot.id),
      new PostTitle(data?.title),
      new PostHtmlText(data?.html),
      new PostMarkdownText(data?.md),
      new UserId(data?.createdBy),
      data?.createdAt.toDate(),
      data?.updatedAt.toDate(),
      new PostIsDraft(data?.isDraft)
    )
  }

  async Find(id: PostId): Promise<Post | null> {
    const snapshot = await db
      .collection('posts')
      .doc(id.value)
      .get()

    if (!snapshot.exists) {
      console.log("document doesn't exist")
      return null
    }

    return this.postSnapshotToModel(snapshot)
  }

  async FindAll(): Promise<Post[]> {
    const snapshots = await db
      .collection('posts')
      .where('isDraft', '==', false)
      .orderBy('createdAt', 'desc')
      .get()

    const posts: Post[] = []
    snapshots.forEach((snapshot) => {
      posts.push(this.postSnapshotToModel(snapshot))
    })

    return posts
  }

  async FindByUserId(userId: UserId): Promise<Post[]> {
    const snapshots = await db
      .collection('posts')
      .where('createdBy', '==', userId.value)
      .get()

    const posts: Post[] = []
    snapshots.forEach((snapshot) => {
      posts.push(this.postSnapshotToModel(snapshot))
    })

    return posts
  }

  async Save(post: Post): Promise<void> {
    const docRef = db.collection('posts').doc(post.id.value)

    const snapshot = await docRef.get()
    if (snapshot.exists) {
      console.log('post update')
      await docRef.update({
        title: post.title.value,
        md: post.markdownText.value,
        html: post.htmlText.value,
        updatedAt: new Date(),
        isDraft: post.isDraft.value
      })
    } else {
      console.log('post create new')
      await docRef.set({
        title: post.title.value,
        md: post.markdownText.value,
        html: post.htmlText.value,
        createdBy: post.createdBy.value,
        createdAt: new Date(),
        updatedAt: new Date(),
        isDraft: post.isDraft.value
      })
    }
  }
  async Delete(post: Post): Promise<void> {
    await db
      .collection('posts')
      .doc(post.id.value)
      .delete()
  }
}
