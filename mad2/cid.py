from flask_security import SQLAlchemyUserDatastore
def cd(user_datastore:SQLAlchemyUserDatastore):
    user_datastore.find_or_create_role