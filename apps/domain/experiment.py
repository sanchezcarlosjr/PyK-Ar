from dataclasses import dataclass

from domain.cycle import Cycle


@dataclass
class Experiment:
    cycles: list[Cycle]
    analysis_date: str
    spectrum: str
    sample_id: str
    type: str
    spectrum_user_name: str
    file_name: str
