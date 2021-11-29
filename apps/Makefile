test:
	export GOOGLE_APPLICATION_CREDENTIALS="$(pwd)/service-account-credentials.json"
	pytest tests

deploy:
	gcloud functions deploy calculate_age_by_potassium_argon --memory=1024MB \
	--runtime python39 --trigger-http --allow-unauthenticated --region us-west4 \


