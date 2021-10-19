from flask import jsonify
import logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)


def serialize(func):
    def function_wrapper(request, headers):
        """HTTP Cloud Function.
          Args:
              headers: The cors headers
              request (flask.Request): The request object.
              <https://flask.palletsprojects.com/en/1.1.x/api/#incoming-request-data>
          Returns:
              The response text, or any set of values that can be turned into a
              Response object using `make_response`
              <https://flask.palletsprojects.com/en/1.1.x/api/#flask.make_response>.
          """
        content_type = request.headers['content-type']
        headers['Content-Type'] = "application/json"
        if content_type != 'application/json':
            return jsonify({"error": "JSON is invalid."}), 400, headers
        try:
            data = func(request.get_json(silent=True), request)
            return jsonify({"data": data}), 200, headers
        except KeyError as err:
            logger.exception(err)
            return jsonify({"error": f"Request doesn't have " + str(err)}), 400, headers
        except BaseException as err:
            logger.exception(err)
            return jsonify({"error": f"Unexpected {err=}"}), 500, headers

    return function_wrapper
