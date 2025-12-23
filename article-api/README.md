#Laravel CRUD api

postman docs for articles crud
https://cloudy-capsule-899454.postman.co/workspace/Ananya~339ecd36-83cb-4b54-a988-bc8cf729917f/request/30950584-6021a1b4-237d-4b1e-9210-a11ee86b7631?action=share&creator=30950584

CREATE article
http://127.0.0.1:8000/api/create-article

READ article
http://127.0.0.1:8000/api/get-article

UPDATE article
http://127.0.0.1:8000/api/update-article/{id}

DELETE article
http://127.0.0.1:8000/api/delete-article/{id}

#setup
create a database in phpmyadmin
put database name in env file

#functions
controllers to perform CRUD operations

#latest-article
to get the recently created article
http://127.0.0.1:8000/api/latest-article