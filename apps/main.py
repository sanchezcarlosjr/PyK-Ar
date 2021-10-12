from dataclasses import asdict

from firebase_admin import initialize_app

from domain.measurement import Measurement
from infrastructure.http.authorize_decorator import authorize
from infrastructure.http.decorator_cors import cors
from infrastructure.http.serialize_decorator import serialize
from infrastructure.potassium_argon_age_calculation_repository import PotassiumArgonAgeCalculationFirestoreRepository

app = initialize_app()


@cors
@serialize
@authorize
def calculate_age_by_potassium_argon(data, user):
    measurement = Measurement(createdby=user['user_id'], updatedby=user['user_id'])
    potassium_argon = PotassiumArgonAgeCalculationFirestoreRepository()
    return potassium_argon.save(asdict(measurement))
