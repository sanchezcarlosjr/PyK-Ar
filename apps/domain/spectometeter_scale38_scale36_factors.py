from application.constant import Constant


class SpectrometerScale38Scale36(Constant):
    def __new__(cls):
        return super().__new__(cls, "scale38_divides_scale36")
