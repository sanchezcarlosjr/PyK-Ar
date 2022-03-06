from application.constant import Constant


class T0(Constant):
    def __new__(cls, value=None):
        return super().__new__(cls, key="T0", value=value)
