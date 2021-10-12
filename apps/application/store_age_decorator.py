from infrastructure.potassium_argon_age_calculation_repository import PotassiumArgonAgeCalculationFirestoreRepository


def store_age(func):
    def function_wrapper(measurement):
        age = func(measurement)
        potassium_argon = PotassiumArgonAgeCalculationFirestoreRepository()
        return potassium_argon.save(age)

    return function_wrapper
