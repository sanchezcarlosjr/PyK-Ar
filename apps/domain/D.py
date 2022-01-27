from application.constant import Constant


# Spectrometer discrimination correction factor for two mass
class D(Constant):
    def __new__(cls):
        return super().__new__(cls, "D")
