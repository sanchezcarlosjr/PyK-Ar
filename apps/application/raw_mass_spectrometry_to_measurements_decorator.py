from domain.experiments import Experiments
from domain.measurement import Measurement


def raw_mass_spectrometry_to_measurements(func):
    def function_wrapper(sample, user):
        measurement = Measurement(
            createdby=user['user_id'],
            updatedby=user['user_id'],
            experiments=Experiments(sample['experiments']),
            delta=sample['delta'],
            gramsOfK=sample['gramsOfK'],
            weight=sample['weight']
        )
        return func(measurement)

    return function_wrapper
