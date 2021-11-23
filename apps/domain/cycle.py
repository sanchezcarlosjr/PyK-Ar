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

    def is_corrected(self):
        return self.measure == "Corrected"
