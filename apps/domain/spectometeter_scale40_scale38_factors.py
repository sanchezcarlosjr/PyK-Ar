from application.constant import Constant


class SpectrometerScale40Scale38(Constant):
    def __new__(cls, value=None):
        return super().__new__(cls, key="scale40_divides_scale38", value=value)
