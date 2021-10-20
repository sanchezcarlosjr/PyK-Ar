import sys
from dataclasses import asdict

from dacite import from_dict

from potassium_argon_age_calculation_mock_repository import PotassiumArgonAgeCalculationMockRepository

sys.path.append('../apps')
from domain.experiment import Experiment
from domain.measurement import Measurement
from application.raw_mass_spectrometry_to_measurements_decorator import raw_mass_spectrometry_to_measurements

experiments = [{
    "analysis_date": "1",
    "spectrum": "",
    "sample_id": "",
    "type": "",
    "spectrum_user_name": "",
    "file_name": "",
    "cycles": [{
        "cycle": "1",
        "mass": "3.54675500E+001",
        "peak": "ZERO1",
        "measure": "RawData",
        "inty": "1.73016000E-006",
        "time": "7.79375000E+001"
    }, {
        "cycle": "1",
        "mass": "3.54675500E+001",
        "peak": "ZERO1",
        "measure": "Corrected",
        "inty": "1.73016000E-006",
        "time": "7.79375000E+001"
    }]
},
    {
        "analysis_date": "1",
        "spectrum": "",
        "sample_id": "",
        "type": "",
        "spectrum_user_name": "",
        "file_name": "",
        "cycles": [{
            "cycle": "1",
            "mass": "3.54675500E+001",
            "peak": "ZERO1",
            "measure": "RawData",
            "inty": "1.73016000E-006",
            "time": "7.79375000E+001"
        }, {
            "cycle": "1",
            "mass": "3.54675500E+001",
            "peak": "ZERO1",
            "measure": "Corrected",
            "inty": "1.73016000E-006",
            "time": "7.79375000E+001"
        }]
    }
]


def test_set_measurement_id():
    measurement = Measurement(experiments=[
        from_dict(data_class=Experiment, data=experiment) for experiment in experiments])
    mock = PotassiumArgonAgeCalculationMockRepository()
    m = mock.save(asdict(measurement))
    assert 0 <= float(m['id']) <= 1, "Dict should set id"


def test_experiments():
    experiment = from_dict(data_class=Experiment, data=experiments[0])
    assert experiment.cycles[0].cycle == "1"


def test_raw_mass_spectrometry_to_measurements():
    x = raw_mass_spectrometry_to_measurements(lambda m: m)(experiments, {'user_id': 'A'})
    assert x.experiments[0].cycles[0].cycle == "1"


def test_filter_corrected_cycles():
    measurement = raw_mass_spectrometry_to_measurements(lambda m: m)(experiments, {'user_id': 'A'})
    cycles = measurement.filter_corrected_cycles()
    assert cycles[0].measure == "Corrected"
    assert cycles[1].measure == "Corrected"
