from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

# Connect to the database
engine = create_engine('sqlite:///database/app.db', echo=True)

# Create a session to interact with the database
Session = sessionmaker(bind=engine)
Base = declarative_base()

db = Session()
