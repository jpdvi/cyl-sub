export SQLALCHEMY_DATABASE_URI=sqlite:///bandwidth.sqlite3
export FLASK_APP=app

install:
	pipenv install

seed : install
	rm app/*.sqlite3;\
	rm -rf migrations;\
	pipenv run flask db init &&\
	pipenv run flask db migrate &&\
	pipenv run flask db upgrade &&\
	echo Seeding ... ${SQLALCHEMY_DATABASE_URI} &&\
	pipenv run flask seed

run: seed
	 pipenv run flask run
