from fastapi import APIRouter, status
from ..schemas.analysis_schema import FlightOutSchema, FlightInSchema
from ..controllers.analysis_controller import analysis_controller

router = APIRouter(
    prefix='/analysis',
    tags=['Analysis']
)

@router.post('/create',  status_code=status.HTTP_201_CREATED, response_model=FlightOutSchema)
async def create_flight(flight: FlightInSchema):
    return analysis_controller.create_flight(flight)

