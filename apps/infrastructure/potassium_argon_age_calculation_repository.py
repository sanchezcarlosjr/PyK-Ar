from dataclasses import asdict

from infrastructure.firestore_repository import FirestoreRepository


class PotassiumArgonAgeCalculationRepository:
    def __init__(self, database=FirestoreRepository()):
        self.calculations = u'potassium-argon-age-calculations'
        self.database = database

    def save(self, measurement):
        measurement_to_save = measurement.to_dict()
        measurement_to_save = self.database.save(self.calculations, measurement_to_save)
        measurement.id = measurement_to_save['id']
        return asdict(measurement)
