from pydantic import BaseModel
from datetime import datetime

class PredictionOutSchema(BaseModel):
    delay: float
        