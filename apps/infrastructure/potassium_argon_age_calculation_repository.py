from dataclasses import asdict

from firebase_admin import firestore

from domain.measurement import Measurement


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


class PotassiumArgonAgeCalculationRepository:
    def __init__(self, database=FirestoreRepository()):
        self.calculations = u'potassium-argon-age-calculations'
        self.database = database

    def save(self, measurement: Measurement):
        measurement_to_save = measurement.to_dict()
        measurement_to_save = self.database.save(self.calculations, measurement_to_save)
        measurement.id = measurement_to_save['id']
        return asdict(measurement)
