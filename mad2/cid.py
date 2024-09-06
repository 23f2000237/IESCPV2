from flask_security import SQLALCHEMYUserDatastore
def cd(user_datastore:SQLALCHEMYUserDatastore):
    user_datastore.find_or_create_role