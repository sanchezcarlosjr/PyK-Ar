from dataclasses import dataclass, field


@dataclass
class Cycle:
    cycle: str
    mass: str
    peak: str
    measure: str
    inty: str
    time: str
    fmass: float = field(init=False, default=0)
    finty: float = field(init=False, default=0)
    ftime: float = field(init=False, default=0)

    def __post_init__(self):
        self.fmass = float(self.mass)
        self.finty = float(self.inty)
        self.ftime = float(self.time)


@dataclass
class Experiment:
    cycles: list[Cycle]
    analysis_date: str
    spectrum: str
    sample_id: str
    type: str
    spectrum_user_name: str
    file_name: str
