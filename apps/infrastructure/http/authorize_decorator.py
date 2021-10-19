from firebase_admin import auth


def authorize(func):
    def function_wrapper(data, request):
        token = request.headers['Authorization'].replace('Bearer ', '')
        user = auth.verify_id_token(token)
        return func(data, user)

    return function_wrapper
