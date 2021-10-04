from dataclasses import asdict

from firebase_admin import initialize_app
from flask import jsonify

from measurement import Measurement
from potassium_argon_age_calculation_repository import PotassiumArgonAgeCalculationFirestoreRepository

app = initialize_app()


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

        measurement = func(request)
        # Set CORS headers for the main request
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'authorization,content-type'
        }
        return jsonify({"data": measurement}), 200, headers

    return function_wrapper


@cors
def calculate_age_by_potassium_argon(request):
    """HTTP Cloud Function.
    Args:
        request (flask.Request): The request object.
        <https://flask.palletsprojects.com/en/1.1.x/api/#incoming-request-data>
    Returns:
        The response text, or any set of values that can be turned into a
        Response object using `make_response`
        <https://flask.palletsprojects.com/en/1.1.x/api/#flask.make_response>.
    """

    print(request.headers.get("Authorization"))

    measurement = Measurement()

    potassium_argon = PotassiumArgonAgeCalculationFirestoreRepository()
    return potassium_argon.save(asdict(measurement))
