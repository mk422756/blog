import UserId from '~/domain/models/users/userId'
import PostId from '~/domain/models/posts/postId'
import PostTitle from '~/domain/models/posts/postTitle'
import PostHtmlText from '~/domain/models/posts/postHtmlText'
import PostMarkdownText from '~/domain/models/posts/postMarkdownText'
import PostIsDraft from '~/domain/models/posts/postIsDraft'
import ImageUrl from '~/domain/models/images/imageUrl'
import imageUrl from '~/domain/models/images/imageUrl'

export default class Post {
  private _id: PostId
  private _title: PostTitle
  private _htmlText: PostHtmlText
  private _marddownText: PostMarkdownText
  private _createdBy: UserId
  private _createdAt: Date
  private _updatedAt: Date
  private _isDraft: PostIsDraft
  private _topImage: ImageUrl

  constructor(
    id: PostId,
    title: PostTitle,
    htmlText: PostHtmlText,
    markdownText: PostMarkdownText,
    createdBy: UserId,
    createdAt: Date,
    updatedAt: Date,
    isDraft: PostIsDraft,
    topImage: ImageUrl
  ) {
    this._id = id
    this._title = title
    this._htmlText = htmlText
    this._marddownText = markdownText
    this._createdBy = createdBy
    this._createdAt = createdAt
    this._updatedAt = updatedAt
    this._isDraft = isDraft
    this._topImage = topImage
  }

  changeTitle(title: PostTitle) {
    if (!title.value) {
      throw new Error('no title error')
    }
    this._title = title
  }

  changeHtmlText(htmlText: PostHtmlText) {
    this._htmlText = htmlText
  }

  changeMarkdownText(markdownText: PostMarkdownText) {
    this._marddownText = markdownText
  }

  changeIsDraft(isDraft: PostIsDraft) {
    this._isDraft = isDraft
  }

  changeTopImage(topImage: ImageUrl) {
    this._topImage = topImage
  }

  isAuthor(createdBy: UserId): boolean {
    return createdBy.value === this._createdBy.value
  }

  get id(): PostId {
    return this._id
  }

  get title(): PostTitle {
    return this._title
  }

  get htmlText(): PostHtmlText {
    return this._htmlText
  }

  get markdownText(): PostMarkdownText {
    return this._marddownText
  }

  get createdBy(): UserId {
    return this._createdBy
  }

  get createdAt(): Date {
    return this._createdAt
  }

  get updatedAt(): Date {
    return this._updatedAt
  }

  get isDraft(): PostIsDraft {
    return this._isDraft
  }

  get topImage(): ImageUrl {
    return this._topImage
  }
}
