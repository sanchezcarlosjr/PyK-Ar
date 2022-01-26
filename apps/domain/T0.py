from application.constant import Constant


class T0(Constant):
    def __new__(cls):
        return super().__new__(cls, "T0")
