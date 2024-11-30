api-service:
	cd ./transaction/ && \
	./gradlew clean bootJar && \
	java -jar ./build/libs/transaction-0.0.2.jar

start-ios-client:
	cd ./ui && \
	npm install && \
	npm run ios