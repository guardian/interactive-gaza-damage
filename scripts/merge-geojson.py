# split-multi.py
# open source, MIT license

import json

areas = ["beit-hanoun", "al-zahra", "khan-younis"]

features = []
for area in areas:
    js = open(f"src/assets/geojson/{area}.geojson", "r").read()
    gj = json.loads(js)

    for feature in gj["features"]:
        del feature["id"]
        feature["properties"]['area'] = area
        features.append(feature)


output = {"type": "FeatureCollection", "features": features}

print(len(features))

open(f"src/assets/geojson/annotations.geojson", "w").write(
    json.dumps(output)
)
