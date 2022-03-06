from infrastructure.firestore_repository import FirestoreRepository
import types


class Constant(float):
    def __new__(cls, key: str, value=None):
        if value is float or value is int:
            return float.__new__(cls, value)
        if isinstance(value, types.FunctionType):
            return float.__new__(cls, value(key))
        data_repository = u'potassium-argon-age-constants'
        f = FirestoreRepository()
        docs = f.read(u'%s' % data_repository, key)
        return float.__new__(cls, docs.to_dict()['value'])
