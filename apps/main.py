from firebase_admin import initialize_app

from application.raw_mass_spectrometry_to_measurements_decorator import raw_mass_spectrometry_to_measurements
from application.store_age_decorator import store_age
from domain.measurement import Measurement
from infrastructure.http.authorize_decorator import authorize
from infrastructure.http.decorator_cors import cors
from infrastructure.http.serialize_decorator import serialize

initialize_app()


@cors
@serialize
@authorize
@raw_mass_spectrometry_to_measurements
@store_age
def calculate_age_by_potassium_argon(measurement: Measurement):
    measurement.calculate_age()
    measurement.calculate_percentage_of_Ar40_rad_in_the_analysis()
    return measurement
