from application.constant import Constant


class SpectrometerScale40Scale38(Constant):
    def __new__(cls):
        return super().__new__(cls, "scale40_divides_scale38")
