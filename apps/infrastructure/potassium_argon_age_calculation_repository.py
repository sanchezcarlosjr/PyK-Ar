from dataclasses import asdict

from domain.measurement import Measurement

from firebase_admin import firestore


class FirestoreRepository:
    def save(self, collection: str, data: dict):
        firestore_db = firestore.client()
        doc_ref = firestore_db.collection(collection).document()
        data['id'] = doc_ref.id
        firestore_db.collection(collection).document(data['id']).set(data)
        return data


class PotassiumArgonAgeCalculationRepository:
    def __init__(self, database=FirestoreRepository()):
        self.calculations = u'potassium-argon-age-calculations'
        self.database = database

    def save(self, measurement: Measurement):
        measurement_to_save, experiments = measurement.to_dict()
        measurement_to_save = self.database.save(self.calculations, measurement_to_save)
        measurement.id = measurement_to_save['id']
        for experiment in experiments:
            self.database.save(f'{self.calculations}/{measurement.id}/experiments', experiment)
        return asdict(measurement)
