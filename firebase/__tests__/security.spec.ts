import * as firebase from '@firebase/testing'
import fs from 'fs'

describe('Firestore Security Rules', () => {
  const rules = fs.readFileSync('firestore.rules', 'utf8')
  const projectID = 'test1'

  firebase.loadFirestoreRules({
    projectId: projectID,
    rules: rules
  })

  const firestore1 = firebase
    .initializeTestApp({
      projectId: projectID,
      auth: { uid: 'alice', email: 'alice@example.com' }
    })
    .firestore()

  const firestore2 = firebase
    .initializeTestApp({
      projectId: projectID,
      auth: undefined
    })
    .firestore()

  it('postsの書き込みは認証ユーザーのみ可能', async () => {
    await firebase.assertSucceeds(
      firestore1
        .collection('posts')
        .doc()
        .set({ createdBy: 'alice' })
    )

    await firebase.assertFails(
      firestore2
        .collection('posts')
        .doc()
        .set({ test: 'test' })
    )
  })

  it('postsの上書きと削除は作成ユーザーのみ可能', async () => {
    firestore1
      .collection('posts')
      .doc('doc1')
      .set({ createdBy: 'alice' })
    await firebase.assertSucceeds(
      firestore1
        .collection('posts')
        .doc('doc1')
        .update({ test: 'test' })
    )

    await firebase.assertFails(
      firestore2
        .collection('posts')
        .doc('doc1')
        .update({ test: 'test' })
    )
    await firebase.assertFails(
      firestore2
        .collection('posts')
        .doc('doc1')
        .delete()
    )

    await firebase.assertSucceeds(
      firestore1
        .collection('posts')
        .doc('doc1')
        .delete()
    )
  })

  it('postsの読み取りは誰でも可能', async () => {
    await firebase.assertSucceeds(
      firestore1
        .collection('posts')
        .doc('test')
        .get()
    )

    await firebase.assertSucceeds(
      firestore2
        .collection('posts')
        .doc('test')
        .get()
    )
  })
})
