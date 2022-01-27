from firebase_admin import firestore


class FirestoreRepository:
    def save(self, collection: str, data: dict):
        firestore_db = firestore.client()
        if hasattr(data, 'id'):
            doc_ref = firestore_db.collection(collection).document()
            data['id'] = doc_ref.id
        print(data)
        firestore_db.collection(collection).document(data['id']).set(data)
        return data

    def read(self, collection, document):
        firestore_db = firestore.client()
        return firestore_db.collection(collection).document(document).get()