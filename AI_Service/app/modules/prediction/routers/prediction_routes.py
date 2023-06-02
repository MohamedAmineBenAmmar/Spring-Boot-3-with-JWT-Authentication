from fastapi import APIRouter, status
from ..schemas.prediction_schema import PredictionOutSchema
from ..controllers.prediction_controller import prediction_controller

router = APIRouter(
    prefix='/prediction',
    tags=['Prediction']
)

@router.get('/get/{id}', status_code=200, response_model=PredictionOutSchema)
async def predict(id: int):
    return prediction_controller.query_ai_model(id)


