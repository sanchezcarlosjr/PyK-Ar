def cors(func):
    def function_wrapper(request):
        # Set CORS headers for the preflight request
        if request.method == 'OPTIONS':
            # Allows GET requests from any origin with the Content-Type
            # header and caches preflight response for an 3600s
            headers = {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST',
                'Access-Control-Allow-Headers': 'authorization,content-type',
                'Access-Control-Max-Age': '3600'
            }
            return '', 204, headers

        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'authorization,content-type'
        }
        return func(request, headers)

    return function_wrapper
