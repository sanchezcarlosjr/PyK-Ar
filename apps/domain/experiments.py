from dataclasses import dataclass

from dacite import from_dict

from domain.experiment import Experiment, Cycle


@dataclass
class Experiments:
    experiments: list[Experiment]

    def __init__(self, experiments):
        self.experiments = [from_dict(data_class=Experiment, data=experiment) for experiment in experiments]
        self.original_experiments = experiments

    def filter_corrected_cycles(self) -> list[Cycle]:
        return [cycle for experiment in self.experiments for cycle in experiment.cycles if cycle.is_corrected()]

    def __getitem__(self, key):
        return self.experiments[key]

    def calculate_york_fit_error(self):
        pass

    def calculate_dalrymple_error(self):
        pass

    def calculate_age(self):
        pass

    def __eq__(self, other):
        return self.original_experiments == other

    def to_dict(self):
        return self.original_experiments
