from app.extensions import db
from sqlalchemy.dialects.postgresql import UUID
from app.extensions import db
import uuid
from sqlalchemy.ext.hybrid import hybrid_property

class Device(db.Model):
    __tablename__ = "device"
    id = db.Column(db.Integer, primary_key=True)
    _class = db.Column(db.String)
    device_id = db.Column(db.String)
    _type = db.Column(db.String)
    location = db.Column(db.String)
    model = db.Column(db.String)
    organization = db.Column(db.String)

    def __init__(self, **kwargs):
        super(Device, self).__init__(**kwargs)

    @hybrid_property
    def serialize(self):
        # Would generally use a proper serializer in place of this.
        # Please forgive me.
        return {
            "id": self.id,
            "class": self._class,
            "device_id": self.device_id,
            "type": self._type,
            "location": self.location,
            "model": self.model,
            "organization": self.organization
        }
