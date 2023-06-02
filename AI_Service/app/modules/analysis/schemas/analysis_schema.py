from pydantic import BaseModel
from datetime import datetime

class FlightOutSchema(BaseModel):
    id: int
    departure_delay: int
    day_of_week: int
    day_of_month: int
    distance: int
    created_at: datetime
    updated_at: datetime
    
    class Config():
        orm_mode = True
        
class FlightInSchema(BaseModel):
    id: int
    departure_delay: int
    day_of_week: int
    day_of_month: int
    distance: int
    flight_number: int