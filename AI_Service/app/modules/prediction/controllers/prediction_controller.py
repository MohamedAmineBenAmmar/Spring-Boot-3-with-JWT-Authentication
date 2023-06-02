from database.config import db
from ...analysis.models.analysis_model import Analysis
from ...analysis.controllers.analysis_controller import analysis_controller

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
            "DepDelay": [flight_analysis_dict['departure_delay']],
            "FlightNum": [flight_analysis_dict['flight_number']],
            "Distance": [flight_analysis_dict['distance']],
            "DayOfWeek": [flight_analysis_dict['day_of_week']]            
        }
        
        new_data = pd.DataFrame.from_dict(tmp_dict)
        print("the fucking df")
        print(new_data)
        print()
        # Make predictions on the new data
        predictions = model.predict(new_data.values)

        # Print the predictions
        print("moselm zabour")
        print(predictions)
        
        return {
            "delay": predictions[0]
        }


prediction_controller = PredictionController()