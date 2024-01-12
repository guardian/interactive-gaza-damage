# split-multi.py
# open source, MIT license

import json

js = open("src/assets/geojson/beit-hanoun-annotations.geojson", "r").read()
gj = json.loads(js)

output = {"type": "FeatureCollection", "crs": gj["crs"], "features": []}

for feature in gj["features"]:
    if (feature["geometry"] is not None) and (
        feature["geometry"]["type"] == "MultiPolygon"
    ):
        for poly in feature["geometry"]["coordinates"]:
            xfeature = {
                "id": feature["properties"]["id"],
                "type": "Feature",
                "properties": feature["properties"],
                "geometry": {"type": "Polygon"},
            }
            xfeature["geometry"]["coordinates"] = poly
            output["features"].append(xfeature)

open("src/assets/geojson/beit-hanoun-annotations-simplified.geojson", "w").write(
    json.dumps(output)
)
