from collections import OrderedDict
from app.data.dump.bandwidths import BANDWIDTHS
from app.extensions import db
from sqlalchemy.ext.hybrid import hybrid_property


class Bandwidth(db.Model):
    _all = {}
    __tablename__ = "bandwidth"
    id = db.Column(db.Integer, primary_key=True)
    device_id = db.Column(db.String(50), index=True)
    _timestamp = db.Column(db.Integer, nullable=False, index=True)
    bytes_fs = db.Column(db.Integer, nullable=False)
    bytes_ts = db.Column(db.Integer, nullable=False)

    def __init__(self, **kwargs):
        super(Bandwidth, self).__init__(**kwargs)

    @staticmethod
    def populate_in_mem():
        Bandwidth._all = OrderedDict(
            sorted(
                {
                    x["timestamp"]: Bandwidth(
                        _timestamp=x["timestamp"],
                        bytes_ts=x["bytes_ts"],
                        bytes_fs=x["bytes_fs"],
                        device_id=x["device_id"],
                    )
                    for i, x in enumerate(BANDWIDTHS)
                }.items()
            )
        )

    @hybrid_property
    def serialize(self):
        # Would generally use a proper serializer in place of this.
        # Please forgive me.
        return {
            "id": self.id,
            "device_id": self.device_id,
            "bytes_ts": self.bytes_ts,
            "bytes_fs": self.bytes_fs,
            "timestamp": self._timestamp,
        }

    def __repr__(self):
        return str(self.serialize)
