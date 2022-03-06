import json
import sys
from datetime import datetime

from firebase_admin import initialize_app

from potassium_argon_age_calculation_mock_repository import PotassiumArgonAgeCalculationMockRepository

initialize_app()

sys.path.append('../apps')
from domain.measurement import Measurement
from domain.T0 import T0
from application.raw_mass_spectrometry_to_measurements_decorator import raw_mass_spectrometry_to_measurements
from infrastructure.firestore_repository import FirestoreRepository


def load_measurement_from_json(file: str) -> Measurement:
    with open(file) as f:
        sample = json.load(f)['data']
    return raw_mass_spectrometry_to_measurements(lambda m: m)(sample, {'user_id': 'A'})


def test_set_measurement_id():
    measurement = load_measurement_from_json("tests/request1.json")
    mock = PotassiumArgonAgeCalculationMockRepository()
    m = mock.save(measurement)
    assert 0 <= float(m.id) <= 1, "Dict should set id"


def test_filter_corrected_cycles():
    measurement = load_measurement_from_json("tests/request1.json")
    e = measurement.experiments
    cycles = e.filter_corrected_cycles()
    for cycle in cycles:
        assert cycle.measure == "Corrected"


def test_equals_experiments():
    def test_raw_mass_spectrometry_to_measurements():
        measurement = load_measurement_from_json("tests/request1.json")
        with open("tests/request1.json") as f:
            sample = json.load(f)['data']
        assert measurement.experiments == sample['experiments']

    test_raw_mass_spectrometry_to_measurements()


def test_convert_to_dict():
    def test_raw_mass_spectrometry_to_measurements():
        measurement_obj = load_measurement_from_json("tests/request1.json")
        measurement = measurement_obj.to_dict()
        assert 'experiments' not in measurement
        assert 'blank_index' not in measurement
        assert 'sample_index' not in measurement
        with open("tests/request1.json") as f:
            sample = json.load(f)['data']
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
    measurement = load_measurement_from_json("tests/request1.json")
    assert measurement.moles_of_K40 == 0
    measurement.calculate_moles_of_K40(atoms_K40_divides_atomsK=0.000119, gramsK_divides_moleK=39.1)
    assert measurement.moles_of_K40 == 5.787E-8


def test_calculate_moles_Ar38_in_tracer():
    measurement = load_measurement_from_json("tests/request1.json")
    assert measurement.moles_Ar38_in_tracer == 0
    measurement.calculate_moles_Ar38_in_tracer()
    assert measurement.moles_Ar38_in_tracer == 2.976E-10


def test_calculate_Ar40_Ar38_ratio():
    measurement = load_measurement_from_json("tests/request1.json")
    assert measurement.Ar40_Ar38_ratio == 0
    measurement.calculate_Ar38()
    measurement.calculate_Ar40()
    measurement.calculate_Ar40_Ar38_ratio()
    assert measurement.Ar40_Ar38_ratio == 1358.1974700151454


def test_clone_experiment():
    measurement = load_measurement_from_json("tests/request1.json")
    old = measurement.experiments[0]
    new = measurement.experiments[0].filter_corrected_cycles()
    assert old != new
    assert old is not new


def test_should_calculate_cycles_mean():
    measurement = load_measurement_from_json("tests/request1.json")
    measurement.calculate_Ar36()
    assert measurement.Ar36 == 0.000114046680375


def test_should_calculate_Ar40_Ar38_ratios_in_the_gas_mixture():
    measurement = load_measurement_from_json("tests/request1.json")
    measurement.Ar38 = 1
    measurement.Ar40 = 0.743
    measurement.calculate_Ar40_Ar38_ratio()
    assert measurement.Ar40_Ar38_ratio == 0.743
    assert measurement.Ar40_Ar38_ratios_in_the_gas_mixture == 0
    measurement.calculate_Ar40_Ar38_ratios_in_the_gas_mixture()
    assert measurement.Ar40_Ar38_ratios_in_the_gas_mixture == 1.485


def test_should_calculate_Ar38_Ar36_ratios_in_the_gas_mixture():
    measurement = load_measurement_from_json("tests/request1.json")
    measurement.Ar38 = 1
    measurement.Ar36 = 0.98814229249
    measurement.calculate_Ar38_Ar36_ratio()
    assert measurement.Ar38_Ar36_ratio == 1.012
    assert measurement.Ar38_Ar36_ratios_in_the_gas_mixture == 0
    measurement.calculate_Ar38_Ar36_ratios_in_the_gas_mixture()
    assert measurement.Ar38_Ar36_ratios_in_the_gas_mixture == 1011


def test_should_calculate_total_Ar40():
    measurement = load_measurement_from_json("tests/request1.json")
    measurement.Ar38 = 1
    measurement.Ar40 = 0.743
    assert measurement.total_Ar40 == 0
    measurement.calculate_total_Ar40()
    assert measurement.total_Ar40 == 4.419E-10


def test_should_calculate_Ar40_rad():
    measurement = load_measurement_from_json("tests/request1.json")
    measurement.Ar36 = 0.98814229249
    measurement.Ar38 = 1
    measurement.Ar40 = 0.743
    assert measurement.Ar40_rad == 0
    measurement.calculate_Ar40_rad()
    assert measurement.Ar40_rad == 3.57E-10


def test_should_calculate_percentage_of_Ar40_rad_in_the_analysis():
    measurement = load_measurement_from_json("tests/request1.json")
    measurement.Ar36 = 0.98814229249
    measurement.Ar38 = 1
    measurement.Ar40 = 0.743
    assert measurement.percentage_of_Ar40_rad_in_the_analysis == 0
    measurement.calculate_percentage_of_Ar40_rad_in_the_analysis()
    assert measurement.percentage_of_Ar40_rad_in_the_analysis == 80.8


def test_should_calculate_age():
    measurement = load_measurement_from_json("tests/request1.json")
    measurement.Ar36 = 0.98814229249
    measurement.Ar38 = 1
    measurement.Ar40 = 0.743
    assert measurement.age == 0
    measurement.calculate_age()
    assert measurement.age == 102603993.84


def test_should_create_a_object_value_constant():
    t0_value = 3.086E-10
    f = FirestoreRepository()
    f.save(u'potassium-argon-age-constants', {
        "id": "T0",
        "value": t0_value,
    })
    t0 = T0()
    assert t0 == t0_value
