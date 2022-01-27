import random
import re
from dataclasses import dataclass, asdict
from datetime import datetime
from math import exp

from domain.T0 import T0
from domain.atoms_K40_divides_atomsK import AtomsK40DividesAtomsK
from domain.experiments import Experiments
from domain.gramsK_divides_moleK import GramsKDividesMoleK
from domain.x import X


@dataclass
class Measurement:
    experiments: Experiments
    id: str = ""
    type: str = ""
    file_name: str = ""
    ar36_divides_ar38_t: float = 0
    ar40_divides_ar38_t: float = 0
    moles_A38_in_tracer: float = 0
    delta: float = 0
    analysis_date: datetime = datetime.now()
    spectrum: str = ""
    spectrum_user_name: str = ""
    gramsOfK: float = 0
    moles_of_K40: float = 0
    weight: float = 0
    age: float = random.uniform(100, 1000)
    york_fit_error: float = random.uniform(10, 20)
    dalrymple_error: float = random.uniform(10, 20)
    createdate: datetime = datetime.now()
    deleted: bool = False
    lastupdate: datetime = datetime.now()
    updatedby: str = ""
    createdby: str = ""
    sample_index = 0
    blank_index = 0

    def __post_init__(self):
        self.identify_sample_and_blank()
        self.id = self.experiments[self.sample_index].sample_id
        self.spectrum_user_name = self.experiments[self.sample_index].spectrum_user_name
        self.spectrum = self.experiments[self.sample_index].spectrum
        self.type = self.experiments[self.sample_index].type
        self.file_name = self.experiments[self.sample_index].file_name
        analysis_date = self.experiments[self.sample_index].analysis_date
        self.analysis_date = datetime.strptime(analysis_date, '%Y-%m-%dT%H:%M:%S.%fZ')

    def identify_sample_and_blank(self):
        blank_regex = re.compile(r'BCO')
        match_blank = blank_regex.search(self.experiments[0].sample_id) is None
        self.blank_index = int(match_blank)
        self.sample_index = int(not match_blank)

    def calculate(self):
        return self

    def to_dict(self):
        measurement = asdict(self)
        del measurement['experiments']
        return measurement

    def calculate_moles_of_K40(self):
        atoms_K40_divides_atomsK = AtomsK40DividesAtomsK()
        gramsK_divides_moleK = GramsKDividesMoleK()
        moles_of_K40 = (atoms_K40_divides_atomsK * self.gramsOfK) / gramsK_divides_moleK
        self.moles_of_K40 = round(moles_of_K40, 12)

    def calculate_moles_A38_in_tracer(self):
        x = X()
        t0 = T0()
        moles_A38_in_tracer = t0*exp(-self.delta*x)
        self.moles_A38_in_tracer = round(moles_A38_in_tracer, 13)
