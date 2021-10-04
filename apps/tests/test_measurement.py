from dataclasses import asdict
from potassium_argon_age_calculation_mock_repository import PotassiumArgonAgeCalculationMockRepository
import sys
sys.path.append('../apps')
from measurement import Measurement

def test_set_measurement_id():
    measurement = Measurement()
    mock = PotassiumArgonAgeCalculationMockRepository()
    m = mock.save(asdict(measurement))
    assert 0 <= float(m['id']) <= 1, "Dict should set id"
