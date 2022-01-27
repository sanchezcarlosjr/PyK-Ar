from domain.experiments import Experiments
from domain.measurement import Measurement


def raw_mass_spectrometry_to_measurements(func):
    def function_wrapper(sample, user):
        measurement = Measurement(
            createdby=user['user_id'],
            updatedby=user['user_id'],
            experiments=Experiments(sample.experiments),
            ar36_divides_ar38_t=sample.ar36_divides_ar38_t,
            ar40_divides_ar38_t=sample.ar40_divides_ar38_t,
            delta=sample.delta,
            gramsOfK=sample.gramsOfK,
            weight=sample.weight
        )
        return func(measurement)

    return function_wrapper
