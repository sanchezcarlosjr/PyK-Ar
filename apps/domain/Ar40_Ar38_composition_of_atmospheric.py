from application.constant import Constant


class Ar40Ar38CompositionOfAtmospheric(Constant):
    def __new__(cls, value=None):
        return super().__new__(cls, key="Ar40_Ar38_composition_of_atmospheric", value=value)
