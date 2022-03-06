from application.constant import Constant


class Ar36Ar38CompositionOfAtmospheric(Constant):
    def __new__(cls, value=None):
        return super().__new__(cls, key="Ar36_Ar38_composition_of_atmospheric", value=value)
