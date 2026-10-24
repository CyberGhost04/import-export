import json
from pathlib import Path

from app.schemas.trade import TradeData

DATA_FILE = Path(__file__).resolve().parents[1] / "data" / "trade_data.json"


def load_trade_data() -> TradeData:
    with DATA_FILE.open(encoding="utf-8") as data_file:
        return TradeData.model_validate(json.load(data_file))
