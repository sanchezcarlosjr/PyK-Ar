from application.constant import Constant


class GramsKDividesMoleK(Constant):
    def __new__(cls, value=None):
        return super().__new__(cls, "gramsK_divides_moleK", value)
