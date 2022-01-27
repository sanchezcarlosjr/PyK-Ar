import sys

from firebase_admin import initialize_app

from potassium_argon_age_calculation_mock_repository import PotassiumArgonAgeCalculationMockRepository

initialize_app()

sys.path.append('../apps')
from domain.experiments import Experiments
from domain.measurement import Measurement
from domain.T0 import T0
from application.raw_mass_spectrometry_to_measurements_decorator import raw_mass_spectrometry_to_measurements
from infrastructure.potassium_argon_age_calculation_repository import FirestoreRepository

sample = {
    "ar36_divides_ar38_t": 0,
    "ar40_divides_ar38_t": 0,
    "delta": 0,
    "gramsOfK": 0,
    "weight": 0,
    "experiments": [{
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
            "intensity": "1.73016000E-006",
            "time": "7.79375000E+001"
        }, {
            "cycle": "1",
            "mass": "3.54675500E+001",
            "peak": "ZERO1",
            "measure": "Corrected",
            "intensity": "1.73016000E-006",
            "time": "7.79375000E+001"
        }]
    },
    ]
}


def test_set_measurement_id():
    measurement = Measurement(experiments=Experiments(sample['experiments']))
    mock = PotassiumArgonAgeCalculationMockRepository()
    m = mock.save(measurement)
    assert 0 <= float(m.id) <= 1, "Dict should set id"


def test_filter_corrected_cycles():
    e = Experiments(sample['experiments'])
    cycles = e.filter_corrected_cycles()
    for cycle in cycles:
        assert cycle.measure == "Corrected"


def test_equals_experiments():
    def test_raw_mass_spectrometry_to_measurements():
        x = raw_mass_spectrometry_to_measurements(lambda m: m)(sample, {'user_id': 'A'})
        assert x.experiments == sample['experiments']

    test_raw_mass_spectrometry_to_measurements()


def test_convert_to_dict():
    def test_raw_mass_spectrometry_to_measurements():
        x: Measurement = raw_mass_spectrometry_to_measurements(lambda m: m)(sample, {'user_id': 'A'})
        measurement, experiments_to_save = x.to_dict()
        assert 'experiments' not in measurement
        assert sample['experiments'] == experiments_to_save

    test_raw_mass_spectrometry_to_measurements()


def test_should_create_a_object_value_constant():
    t0_value = 9
    f = FirestoreRepository()
    f.save(u'potassium-argon-age-constants', {
        "id": "T0",
        "value": t0_value,
    })
    t0 = T0()
    assert t0 == t0_value

