from random import random


class PotassiumArgonAgeCalculationMockRepository:
    def save(self, measurement: dict):
        measurement['id'] = str(random())
        print(measurement['id'])
        return measurement
