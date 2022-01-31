from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()


# Define the User data-model
class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)

    public_key = db.Column(db.String(255, collation='NOCASE'), nullable=False,
                      unique=True)

    created_at = db.Column(db.DateTime())

    # Define the relationship to subclasses
    cids = db.relationship('Cid', secondary='user_cids')

# Define the CID data-model
class Cid(db.Model):
    __tablename__ = 'cids'
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(255), nullable=False,
                       server_default='')
    
# Define the UserCid's association table
class UserCids(db.Model):
    __tablename__ = 'user_cids'
    id = db.Column(db.Integer(), primary_key=True)
    user_id = db.Column(db.Integer(), db.ForeignKey('users.id',
                                                    ondelete='CASCADE'))
    cid_id = db.Column(db.Integer(), db.ForeignKey('cids.id',
                                                    ondelete='CASCADE'))
