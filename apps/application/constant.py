from infrastructure.potassium_argon_age_calculation_repository import FirestoreRepository


class Constant(float):
    def __new__(cls, key):
        data_repository = u'potassium-argon-age-constants'
        f = FirestoreRepository()
        docs = f.read(u'%s' % data_repository, key)
        return float.__new__(cls, docs.to_dict()['value'])
