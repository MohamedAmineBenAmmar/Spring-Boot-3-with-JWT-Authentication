from sqlalchemy import Column, Integer, String, Float, DateTime
from sqlalchemy.orm import relationship
from database.config import Base
from datetime import datetime


class Analysis(Base):
    __tablename__ = "analysis"

    id = Column(Integer, primary_key=True, index=True)    
    departure_delay = Column(Integer)
    day_of_week = Column(Integer)
    day_of_month = Column(Integer)
    distance = Column(Integer)
    flight_number = Column(Integer)    
    created_at = Column(DateTime(), default=datetime.now)
    updated_at = Column(DateTime(), default=datetime.now, onupdate=datetime.now)
    