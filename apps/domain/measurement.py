from dataclasses import dataclass, asdict
from datetime import datetime

from domain.experiments import Experiments


@dataclass
class Measurement:
    experiments: Experiments
    id: str = ""
    age: float = 0
    york_fit_error: float = 0
    dalrymple_error: float = 0
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
