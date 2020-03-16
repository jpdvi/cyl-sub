from app.extensions import application as app
from flask import request, abort
from sqlalchemy.sql import func
from app.data.models.bandwidth import Bandwidth
import time
import json


@app.route("/", methods=["GET"])
def root():
    return "Hello, Cylera"


@app.route("/device", methods=["GET"])
def list_devices():
    """Returns a list of Device Ids"""
    return json.dumps(
        [
            x[0]
            for x in Bandwidth.query.with_entities(Bandwidth.device_id).distinct().all()
            if len(x) > 0
        ]
    )


@app.route("/device/<device_id>", methods=["GET"])
def get_device_by_id(device_id):
    """Returns a list of Bandwidth objects based on a `device_id`"""

    args = request.args

    window_time = (
        60 if not args.get("window_time") else int(args.get("window_time"))
    )
    end_time = (
        int(time.time()) if not args.get("end_time") else int(args.get("end_time"))
    )
    num_windows = (
        10 if not args.get("num_windows") else int(args.get("num_windows"))
    )

    # You can't have a line graph with only 1 data point :)
    # normally would throw some error here to let client know this is invalid.
    num_windows = 2 if num_windows == 1 else num_windows

    # In production I would probably use postgresql which allows the additional
    # logic to be taken care of by functions provided by postgresql itself.
    # However, for portability I've chosen to stick with sqlite.
    # Although this doesn't provide much value for the example I've kept it in
    # to avoid needing to write my own filters for in memory objects.
    # Additionally, I would note that I generally prefer to avoid writing
    # business logic inside of a resource controller, it can become very messy.
    bws = Bandwidth.query.filter(
        Bandwidth.device_id == device_id,
        Bandwidth._timestamp <= end_time,
        Bandwidth._timestamp >= end_time - window_time * num_windows,
    ).order_by(Bandwidth._timestamp)

    if len(bws.all()) < 1:
        abort(404, "Device ID: {device_id} has 0 entries")

    min_bandwidth = bws.first()
    max_timestamp = bws.all()[len(bws.all()) - 1]._timestamp
    if end_time > max_timestamp:
        end_time = max_timestamp

    # Create Datastructure with with indexes
    interval_map = {
        x: [] for x in range(min_bandwidth._timestamp, end_time, window_time)
    }

    # Assign bandwidths to aggregate index
    for idx, x in enumerate(interval_map.keys()):
        if idx < len(interval_map.keys()) - 1:
            interval_map[x] = bws.filter(
                Bandwidth._timestamp >= x,
                Bandwidth._timestamp < list(interval_map.keys())[idx + 1],
            ).all()
        else:
            interval_map[x] = bws.filter(
                Bandwidth._timestamp <= end_time, Bandwidth._timestamp >= x
            ).all()

    # Aggregate bandwidths inside index
    for key, values in interval_map.items():
        aggregate_bw = Bandwidth(
            _timestamp=key, bytes_ts=0, bytes_fs=0, device_id=device_id
        )
        for bw in values:
            aggregate_bw.bytes_ts += bw.bytes_ts
            aggregate_bw.bytes_fs += bw.bytes_fs
        interval_map[key] = aggregate_bw.serialize
    return interval_map
