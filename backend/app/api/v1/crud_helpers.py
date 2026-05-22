from datetime import datetime

from fastapi import HTTPException
from sqlmodel import Session


def get_object_or_404(db: Session, model, object_id: int):
    item = db.query(model).filter(model.id == object_id).first()
    if item is None:
        raise HTTPException(status_code=404, detail=f"{model.__name__} not found")
    return item


def save(db: Session, instance):
    db.add(instance)
    db.commit()
    db.refresh(instance)
    return instance


def update_and_save(db: Session, instance, data: dict):
    for key, value in data.items():
        if value is not None:
            setattr(instance, key, value)
    instance.update_date = datetime.utcnow()
    return save(db, instance)
