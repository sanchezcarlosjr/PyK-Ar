from dataclasses import dataclass


@dataclass
class Cycle:
    cycle: str
    mass: float
    peak: str  # M36, M38, M40
    measure: str  # RawData, Corrected
    intensity: float  # Volts
    time: float  # Milliseconds

    def is_corrected(self):
        return self.measure == "Corrected"

    def is_Ar36(self):
        return self.peak == "M36"

    def is_Ar38(self):
        return self.peak == "M38"

    def is_Ar40(self):
        return self.peak == "M40"
