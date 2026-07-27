from typing import Optional
from pydantic import BaseModel, ConfigDict

class ShopItemSchema(BaseModel):
    id: str
    title: str
    description: Optional[str]
    category: str
    price: int
    is_consumable: bool
    effect_type: Optional[str]
    effect_value: Optional[int]

    model_config = ConfigDict(from_attributes=True)
