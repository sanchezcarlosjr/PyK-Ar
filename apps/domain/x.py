from application.constant import Constant


# tracer number
class X(Constant):
    def __new__(cls, value=None):
        return super().__new__(cls, key="X", value=value)
