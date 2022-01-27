from dataclasses import dataclass, replace

from domain.cycle import Cycle
from statistics import mean


@dataclass
class Experiment:
    cycles: list[Cycle]
    analysis_date: str
    spectrum: str
    sample_id: str
    type: str
    spectrum_user_name: str
    file_name: str

    def mean(self, removing_blank_mean=0):
        intensities = [cycle.intensity - removing_blank_mean for cycle in self.cycles]
        return mean(intensities)

    def filter_corrected_cycles(self):
        experiment = replace(self)
        experiment.cycles = [cycle for cycle in self.cycles if cycle.is_corrected()]
        return experiment

    def filter_byAr36(self):
        experiment = replace(self)
        experiment.cycles = [cycle for cycle in self.cycles if cycle.is_Ar36()]
        return experiment

    def filter_byAr38(self):
        experiment = replace(self)
        experiment.cycles = [cycle for cycle in self.cycles if cycle.is_Ar38()]
        return experiment

    def filter_byAr40(self):
        experiment = replace(self)
        experiment.cycles = [cycle for cycle in self.cycles if cycle.is_Ar40()]
        return experiment
