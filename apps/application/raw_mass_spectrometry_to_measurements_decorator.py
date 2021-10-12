from domain.measurement import Measurement


def raw_mass_spectrometry_to_measurements(func):
    def function_wrapper(data, user):
        measurement = Measurement(createdby=user['user_id'], updatedby=user['user_id'])
        return func(measurement)

    return function_wrapper
