from database.config import db
from ...analysis.models.analysis_model import Analysis
from ...analysis.controllers.analysis_controller import analysis_controller
import numpy as np

import pandas as pd
import joblib

class PredictionController():
    
    def query_ai_model(self, flightId: int) -> int:
        # Load the model from file
        model = joblib.load('./modules/prediction/models/linear_reg_model.pkl')

        # Assuming you have a new DataFrame called 'new_data' with the same features as the training data
        flight_analysis: Analysis = analysis_controller.getFlightById(flightId)
        
        # convert the instance to dict
        flight_analysis_dict = flight_analysis.__dict__       
        
        del flight_analysis_dict['_sa_instance_state']
        del flight_analysis_dict['updated_at']
        del flight_analysis_dict['id']
        del flight_analysis_dict['created_at']
        print(flight_analysis_dict)
        
        tmp_dict = {
            "DayofMonth": [flight_analysis_dict['day_of_month']],
            "DayOfWeek": [flight_analysis_dict['day_of_week']], 
            "DepDelay": [flight_analysis_dict['departure_delay']],
            "Distance": [flight_analysis_dict['distance']],                    
        }
        new_data_array = np.array([value[0] for value in tmp_dict.values()])        

        predictions = model.predict(new_data_array.reshape(1,-1))

        return {
            "delay": predictions[0]
        }


prediction_controller = PredictionController()