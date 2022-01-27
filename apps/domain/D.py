from application.constant import Constant


class D(Constant):
    def __new__(cls):
        return super().__new__(cls, "D")
