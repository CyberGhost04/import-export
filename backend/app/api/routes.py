from fastapi import APIRouter

from app.schemas.trade import TradeData
from app.services.trade_data import load_trade_data

router = APIRouter()


@router.get("/trade-data", response_model=TradeData)
def get_trade_data() -> TradeData:
    return load_trade_data()
