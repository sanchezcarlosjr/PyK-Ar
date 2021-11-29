import sys
from random import random

sys.path.append('../apps')
from domain.measurement import Measurement


class PotassiumArgonAgeCalculationMockRepository:

    def save(self, measurement: Measurement):
        measurement.id = str(random())
        return measurement
