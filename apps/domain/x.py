from application.constant import Constant


# tracer number
class X(Constant):
    def __new__(cls):
        return super().__new__(cls, "X")
