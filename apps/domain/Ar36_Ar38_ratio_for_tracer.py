from application.constant import Constant


class Ar36Ar38RatioForTracer(Constant):
    def __new__(cls, value=None):
        return super().__new__(cls, "Ar36_Ar38_ratio_for_tracer", value=value)
