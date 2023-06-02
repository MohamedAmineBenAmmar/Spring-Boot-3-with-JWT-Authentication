from ..schemas.analysis_schema import *
from ..models.analysis_model import Analysis
from database.config import db


class AnalysisController():
    
    def create_flight(self, flight: FlightInSchema) -> Analysis:                
        flight_dict = flight.dict()
        flight_model_instance = Analysis(**flight_dict)
        db.add(flight_model_instance)
        db.commit()
        db.refresh(flight_model_instance)

        return flight_model_instance
    
    def getFlightById(self, flightId: int) -> Analysis:
        return db.query(Analysis).filter(Analysis.id == flightId).first()


analysis_controller = AnalysisController()