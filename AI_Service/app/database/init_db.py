from config import Base
from sqlalchemy import MetaData, Table, Column, Float, Integer, DateTime, create_engine, String
from datetime import datetime

# import Temperature, Humidity
class Analysis(Base):
    __tablename__ = "analysis"

    id = Column(Integer, primary_key=True, index=True)    
    departure_delay = Column(Integer, default=0) # +10 -10
    day_of_week = Column(Integer) # 0-6
    day_of_month = Column(Integer) # 1-31
    distance = Column(Integer) # 1 / 2 / 3
    flight_number = Column(Integer) # 9699
    created_at = Column(DateTime(), default=datetime.now)
    updated_at = Column(DateTime(), default=datetime.now, onupdate=datetime.now)
    

def main():
    metadata = MetaData()
    
    # Function to init the db tables
    analysis_table = Table('analysis', metadata,
        Column('id', Integer(), primary_key=True),
        Column('departure_delay', Integer(), default=0),
        Column('day_of_week', Integer()),
        Column('day_of_month', Integer()),
        Column('distance', Integer()),
        Column('flight_number', Integer()),
        Column('created_at', DateTime(), default=datetime.now),
        Column('updated_at', DateTime(), default=datetime.now, onupdate=datetime.now)
    )

    # Connect to the database
    engine = create_engine('sqlite:///app.db', echo=True)   
    metadata.create_all(engine)

    
if __name__ == '__main__':
    main()