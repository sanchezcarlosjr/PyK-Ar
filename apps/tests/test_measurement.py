import sys
import json
from datetime import datetime

from firebase_admin import initialize_app

from potassium_argon_age_calculation_mock_repository import PotassiumArgonAgeCalculationMockRepository

initialize_app()

sys.path.append('../apps')
from domain.experiments import Experiments
from domain.measurement import Measurement
from domain.T0 import T0
from application.raw_mass_spectrometry_to_measurements_decorator import raw_mass_spectrometry_to_measurements
from infrastructure.firestore_repository import FirestoreRepository

with open('tests/example_request.json') as f:
    sample = json.load(f)['data']


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
        measurement = x.to_dict()
        assert 'experiments' not in measurement
        assert 'blank_index' not in measurement
        assert 'sample_index' not in measurement
        assert measurement['id'] == sample['experiments'][1]['sample_id']
        keys_to_check = [
            'spectrum_user_name',
            'spectrum',
            'type',
            'file_name',
        ]
        for key in keys_to_check:
            assert measurement[key] == sample['experiments'][1][key]
        analysis_date = sample['experiments'][1]["analysis_date"]
        assert measurement["analysis_date"] == datetime.strptime(analysis_date, '%Y-%m-%dT%H:%M:%S.%fZ')

    test_raw_mass_spectrometry_to_measurements()


def test_calculate_moles_of_K40():
    measurement: Measurement = raw_mass_spectrometry_to_measurements(lambda m: m)(sample, {'user_id': 'A'})
    assert measurement.moles_of_K40 == 0
    measurement.calculate_moles_of_K40()
    assert measurement.moles_of_K40 == 5.787E-8


def test_calculate_moles_Ar38_in_tracer():
    measurement: Measurement = raw_mass_spectrometry_to_measurements(lambda m: m)(sample, {'user_id': 'A'})
    assert measurement.moles_Ar38_in_tracer == 0
    measurement.calculate_moles_Ar38_in_tracer()
    assert measurement.moles_Ar38_in_tracer == 2.976E-10


def test_should_create_a_object_value_constant():
    t0_value = 3.086E-10
    f = FirestoreRepository()
    f.save(u'potassium-argon-age-constants', {
        "id": "T0",
        "value": t0_value,
    })
    t0 = T0()
    assert t0 == t0_value
