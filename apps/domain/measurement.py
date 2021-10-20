from dataclasses import dataclass
from datetime import datetime

from domain.experiment import Experiment, Cycle


@dataclass
class Measurement:
    experiments: list[Experiment]
    id: str = ""
    age: float = 0
    uncertainty: float = 0
    createdate: datetime = datetime.now()
    deleted: bool = False
    lastupdate: datetime = datetime.now()
    updatedby: str = ""
    createdby: str = ""

    def filter_corrected_cycles(self) -> list[Cycle]:
        return [cycle for experiment in self.experiments for cycle in experiment.cycles if cycle.is_corrected()]
