build: 
	docker build . -t klimandrew/inventory_crawler
run: 
	docker run -p 3055:3055 -d --name inventory_crawler klimandrew/inventory_crawler 
stopRm:
	docker stop inventory_crawler && docker rm inventory_crawler

.PHONY: build run stopRm