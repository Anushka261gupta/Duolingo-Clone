from datetime import datetime
from typing import List, Optional

from sqlalchemy import Boolean, DateTime, ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import BaseModel
from app.models.enums import InventoryStatus


class ShopItem(BaseModel):
    __tablename__ = "shop_items"

    title: Mapped[str] = mapped_column(String(100))
    description: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    category: Mapped[str] = mapped_column(String(50), index=True)
    price: Mapped[int] = mapped_column(Integer)
    is_consumable: Mapped[bool] = mapped_column(Boolean, default=True)

    # Effects for future configurable items (e.g., STREAK_FREEZE, HEART_REFILL)
    effect_type: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)
    effect_value: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)

    # Relationships
    inventory: Mapped[List["Inventory"]] = relationship("Inventory", back_populates="shop_item", cascade="all, delete-orphan")


class Inventory(BaseModel):
    __tablename__ = "inventory"

    user_id: Mapped[str] = mapped_column(String(50), ForeignKey("users.id", ondelete="CASCADE"), index=True)
    shop_item_id: Mapped[str] = mapped_column(String(50), ForeignKey("shop_items.id", ondelete="CASCADE"), index=True)
    
    status: Mapped[InventoryStatus] = mapped_column(String(50), default=InventoryStatus.OWNED)
    
    purchased_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=datetime.utcnow)
    activated_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)

    # Relationships
    user: Mapped["User"] = relationship("User", back_populates="inventory")
    shop_item: Mapped["ShopItem"] = relationship("ShopItem", back_populates="inventory")
