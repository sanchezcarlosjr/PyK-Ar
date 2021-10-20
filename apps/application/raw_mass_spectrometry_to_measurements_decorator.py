from dacite import from_dict

from domain.experiment import Experiment
from domain.measurement import Measurement


def raw_mass_spectrometry_to_measurements(func):
    def function_wrapper(experiments, user):
        measurement = Measurement(
            experiments=[from_dict(data_class=Experiment, data=experiment) for experiment in experiments],
            createdby=user['user_id'],
            updatedby=user['user_id'])
        return func(measurement)

    return function_wrapper
