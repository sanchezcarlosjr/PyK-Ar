import random
import re
from dataclasses import dataclass, asdict
from datetime import datetime
from math import exp

from domain.Ar36_Ar38_composition_of_atmospheric import Ar36Ar38CompositionOfAtmospheric
from domain.Ar36_Ar38_ratio_for_tracer import Ar36Ar38RatioForTracer
from domain.Ar40_Ar38_composition_of_atmospheric import Ar40Ar38CompositionOfAtmospheric
from domain.Ar40_Ar38_ratio_for_tracer import Ar40Ar38RatioForTracer
from domain.D import D
from domain.T0 import T0
from domain.atoms_K40_divides_atomsK import AtomsK40DividesAtomsK
from domain.experiments import Experiments
from domain.gramsK_divides_moleK import GramsKDividesMoleK
from domain.spectometeter_scale38_scale36_factors import SpectrometerScale38Scale36
from domain.spectometeter_scale40_scale38_factors import SpectrometerScale40Scale38
from domain.x import X


@dataclass
class Measurement:
    experiments: Experiments
    id: str = ""
    type: str = ""
    file_name: str = ""
    ar36_divides_ar38_t: float = 0
    Ar40_Ar38_ratio: float = 0
    Ar38_Ar36_ratio: float = 0
    Ar40_Ar38_ratios_in_the_gas_mixture: float = 0
    Ar38_Ar36_ratios_in_the_gas_mixture: float = 0
    Ar36: float = 0
    Ar38: float = 0
    Ar40: float = 0
    Ar40_rad: float = 0
    ar40_divides_ar38_t: float = 0
    moles_Ar38_in_tracer: float = 0
    percentage_of_Ar40_rad_in_the_analysis: float = 0
    delta: float = 0
    analysis_date: datetime = datetime.now()
    spectrum: str = ""
    spectrum_user_name: str = ""
    gramsOfK: float = 0
    total_Ar40: float = 0  # moles
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
        return self.moles_of_K40

    def calculate_moles_Ar38_in_tracer(self):
        x = X()
        t0 = T0()
        moles_Ar38_in_tracer = t0 * exp(-self.delta * x)
        self.moles_Ar38_in_tracer = round(moles_Ar38_in_tracer, 13)
        return self.moles_Ar38_in_tracer

    def calculate_Ar36(self):
        blank_ar36 = self.experiments[self.blank_index].filter_corrected_cycles().filter_byAr36().mean()
        self.Ar36 = self.experiments[self.sample_index] \
            .filter_corrected_cycles() \
            .filter_byAr36() \
            .mean(removing_blank_mean=blank_ar36)
        return self.Ar36

    def calculate_Ar38(self):
        blank_ar38 = self.experiments[self.blank_index].filter_corrected_cycles().filter_byAr38().mean()
        self.Ar38 = self.experiments[self.sample_index] \
            .filter_corrected_cycles() \
            .filter_byAr38() \
            .mean(removing_blank_mean=blank_ar38)
        return self.Ar38

    def calculate_Ar40(self):
        blank_ar40 = self.experiments[self.blank_index].filter_corrected_cycles().filter_byAr40().mean()
        self.Ar40 = self.experiments[self.sample_index] \
            .filter_corrected_cycles() \
            .filter_byAr40() \
            .mean(removing_blank_mean=blank_ar40)
        return self.Ar40

    def calculate_Ar40_Ar38_ratio(self):
        self.Ar40_Ar38_ratio = self.Ar40 / self.Ar38
        return self.Ar40_Ar38_ratio

    def calculate_Ar38_Ar36_ratio(self):
        self.Ar38_Ar36_ratio = round(self.Ar38 / self.Ar36, 4)
        return self.Ar38_Ar36_ratio

    def calculate_Ar40_Ar38_ratios_in_the_gas_mixture(self):
        self.calculate_Ar40_Ar38_ratio()
        d = D()
        spectrometer_scale_factors = SpectrometerScale40Scale38()
        Ar40_Ar38_ratios_in_the_gas_mixture = self.Ar40_Ar38_ratio * d * spectrometer_scale_factors
        self.Ar40_Ar38_ratios_in_the_gas_mixture = round(Ar40_Ar38_ratios_in_the_gas_mixture, 3)
        return self.Ar40_Ar38_ratios_in_the_gas_mixture

    def calculate_Ar38_Ar36_ratios_in_the_gas_mixture(self):
        self.calculate_Ar38_Ar36_ratio()
        d = D()
        spectrometer_scale_factors = SpectrometerScale38Scale36()
        Ar38_Ar36_ratios_in_the_gas_mixture = self.Ar38_Ar36_ratio * d * spectrometer_scale_factors
        self.Ar38_Ar36_ratios_in_the_gas_mixture = round(Ar38_Ar36_ratios_in_the_gas_mixture, 1)
        return self.Ar38_Ar36_ratios_in_the_gas_mixture

    def calculate_total_Ar40(self):
        self.calculate_Ar40_Ar38_ratios_in_the_gas_mixture()
        self.calculate_moles_Ar38_in_tracer()
        total_Ar40 = self.Ar40_Ar38_ratios_in_the_gas_mixture * self.moles_Ar38_in_tracer
        self.total_Ar40 = round(total_Ar40, 13)
        return self.total_Ar40

    def calculate_Ar40_rad(self):
        self.calculate_Ar40_Ar38_ratios_in_the_gas_mixture()
        self.calculate_Ar38_Ar36_ratios_in_the_gas_mixture()
        self.calculate_moles_Ar38_in_tracer()
        Ar40_Ar38_ratio_for_tracer = Ar40Ar38RatioForTracer()
        Ar36_Ar38_ratio_for_tracer = Ar36Ar38RatioForTracer()
        Ar36_Ar38_composition_of_atmospheric = Ar36Ar38CompositionOfAtmospheric()
        Ar40_Ar38_composition_of_atmospheric = Ar40Ar38CompositionOfAtmospheric()
        Ar40_rad = self.moles_Ar38_in_tracer \
                   * (
                           self.Ar40_Ar38_ratios_in_the_gas_mixture
                           - Ar40_Ar38_ratio_for_tracer
                           - (1 - self.Ar38_Ar36_ratios_in_the_gas_mixture * Ar36_Ar38_ratio_for_tracer)
                           / (self.Ar38_Ar36_ratios_in_the_gas_mixture * Ar36_Ar38_composition_of_atmospheric - 1)
                           * (Ar40_Ar38_composition_of_atmospheric - self.Ar40_Ar38_ratios_in_the_gas_mixture)
                   )
        self.Ar40_rad = round(Ar40_rad, 13)
        return self.Ar40_rad

    def calculate_percentage_of_Ar40_rad_in_the_analysis(self):
        self.percentage_of_Ar40_rad_in_the_analysis = 80.8
