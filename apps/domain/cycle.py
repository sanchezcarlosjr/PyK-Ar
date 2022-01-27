from dataclasses import dataclass


@dataclass
class Cycle:
    cycle: str
    mass: float
    peak: str
    measure: str
    intensity: float
    time: float

    def is_corrected(self):
        return self.measure == "Corrected"
