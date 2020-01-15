import * as firebase from '@firebase/testing'
import fs from 'fs'

describe('Firestore Security Rules', () => {
  const rules = fs.readFileSync('firestore.rules', 'utf8')
  const projectID = 'test1'

  firebase.loadFirestoreRules({
    projectId: projectID,
    rules: rules
  })

  const aliceApp = firebase
    .initializeTestApp({
      projectId: projectID,
      auth: { uid: 'alice', email: 'alice@example.com' }
    })
    .firestore()

  const noAuthApp = firebase
    .initializeTestApp({
      projectId: projectID,
      auth: undefined
    })
    .firestore()

  it('postsの書き込みは認証ユーザーのみ可能', async () => {
    await firebase.assertSucceeds(
      aliceApp
        .collection('posts')
        .doc()
        .set({ createdBy: 'alice' })
    )

    await firebase.assertFails(
      noAuthApp
        .collection('posts')
        .doc()
        .set({ test: 'test' })
    )
  })

  it('postsの上書きと削除は作成ユーザーのみ可能', async () => {
    aliceApp
      .collection('posts')
      .doc('doc1')
      .set({ createdBy: 'alice' })
    await firebase.assertSucceeds(
      aliceApp
        .collection('posts')
        .doc('doc1')
        .update({ test: 'test' })
    )

    await firebase.assertFails(
      noAuthApp
        .collection('posts')
        .doc('doc1')
        .update({ test: 'test' })
    )
    await firebase.assertFails(
      noAuthApp
        .collection('posts')
        .doc('doc1')
        .delete()
    )

    await firebase.assertSucceeds(
      aliceApp
        .collection('posts')
        .doc('doc1')
        .delete()
    )
  })

  it('postsの読み取りは下書き記事は作成者のみ、公開記事はだれでも可能', async () => {
    aliceApp
      .collection('posts')
      .doc('draftDoc')
      .set({ createdBy: 'alice', isDraft: true })

    aliceApp
      .collection('posts')
      .doc('publishedDoc')
      .set({ createdBy: 'alice', isDraft: false })

    await firebase.assertSucceeds(
      aliceApp
        .collection('posts')
        .doc('draftDoc')
        .get()
    )

    await firebase.assertSucceeds(
      aliceApp
        .collection('posts')
        .doc('publishedDoc')
        .get()
    )

    await firebase.assertSucceeds(
      aliceApp
        .collection('posts')
        .where('createdBy', '==', 'alice')
        .get()
    )

    await firebase.assertSucceeds(
      noAuthApp
        .collection('posts')
        .doc('publishedDoc')
        .get()
    )

    await firebase.assertFails(
      noAuthApp
        .collection('posts')
        .doc('draftDoc')
        .get()
    )

    await firebase.assertSucceeds(
      noAuthApp
        .collection('posts')
        .where('isDraft', '==', false)
        .get()
    )

    await firebase.assertFails(
      noAuthApp
        .collection('posts')
        .where('createdBy', '==', 'alice')
        .get()
    )
  })
})
