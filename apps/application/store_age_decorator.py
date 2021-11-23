from infrastructure.potassium_argon_age_calculation_repository import PotassiumArgonAgeCalculationRepository


def store_age(func, potassium_argon=PotassiumArgonAgeCalculationRepository()):
    def function_wrapper(measurement):
        age = func(measurement)
        return potassium_argon.save(age)

    return function_wrapper
