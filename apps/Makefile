ifdef OS
	PY="py"
else
   ifeq ($(shell uname), Linux)
      PY="python"
   endif
endif

install:
	$(PY) -m pip install -r requirements-dev.txt

test:
	python -m pytest tests

deploy:
	gcloud functions deploy calculate_age_by_potassium_argon --memory=1024MB \
	--runtime python39 --trigger-http --allow-unauthenticated --region us-west4 \


