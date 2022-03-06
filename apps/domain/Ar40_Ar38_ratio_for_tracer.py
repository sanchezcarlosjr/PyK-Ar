from application.constant import Constant


class Ar40Ar38RatioForTracer(Constant):
    def __new__(cls, value=None):
        return super().__new__(cls, key="Ar40_Ar38_ratio_for_tracer", value=value)
