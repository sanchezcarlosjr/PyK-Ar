from firebase_admin import firestore


class PotassiumArgonAgeCalculationFirestoreRepository:
    def __init__(self):
        self.calculations = u'potassium-argon-age-calculations'

    def save(self, measurement):
        firestore_db = firestore.client()
        doc_ref = firestore_db.collection(self.calculations).document()
        measurement.id = doc_ref.id
        firestore_db.collection(self.calculations).document(measurement.id).set(measurement)
        return measurement
