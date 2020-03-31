import click
from app.extensions import db
from flask.cli import with_appcontext
from app.data.dump.bandwidths import BANDWIDTHS
from app.data.models.bandwidth import Bandwidth
from app.data.models.device import Device
from app.data.dump.customs_ids import DEVICES

@click.command()
@with_appcontext
def seed():
    for bandwidth in BANDWIDTHS:
        db.session.add(
            Bandwidth(
                _timestamp=bandwidth["timestamp"],
                bytes_ts=bandwidth["bytes_ts"],
                bytes_fs=bandwidth["bytes_fs"],
                device_id=bandwidth["device_id"],
            )
        )
    db.session.commit()

    for device in DEVICES:
        db.session.add(
            Device(_class=device["class"],
                    device_id=device["device_id"],
                    _type=device["type"],
                    location=device["location"],
                    model=device["model"],
                    organization=device["organization"],
            )
        )
        db.session.commit()



def register_commands(app):
    app.cli.add_command(seed)
