import random
from dataclasses import dataclass, asdict, field
from datetime import datetime

from domain.experiments import Experiments


@dataclass
class Measurement:
    experiments: Experiments
    id: str = ""
    ar36_divides_ar38_t: float = 0
    ar40_divides_ar38_t: float = 0
    delta: float = 0
    analysis_date: str = ""
    spectrum: str = ""
    spectrum_user_name: str = ""
    gramsOfK: float = 0
    weight: float = 0
    age: float = random.uniform(100, 1000)
    york_fit_error: float = random.uniform(10, 20)
    dalrymple_error: float = random.uniform(10, 20)
    createdate: datetime = datetime.now()
    deleted: bool = False
    lastupdate: datetime = datetime.now()
    updatedby: str = ""
    createdby: str = ""

    def calculate(self):
        return self

    def to_dict(self):
        measurement = asdict(self)
        del measurement['experiments']
        return measurement, self.experiments.original_experiments
