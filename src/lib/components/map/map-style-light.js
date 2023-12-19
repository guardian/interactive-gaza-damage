export default {
	"id": "0io8hvicy",
	"version": 8,
	"name": "OS Open Zoomstack - Light",
	"center": [-1.464858786792547, 50.939150779110975],
	"zoom": 10,
	"bearing": -0.44200633613297663,
	"pitch": 0,
	"light": {"intensity": 0.25, "color": "hsl(0, 0%, 100%)"},
	"transition": {
		"duration": 500,
		"delay": 0
	},
	"sources": {
	  "composite": {
		"type": "vector",
		"minzoom":0,
		"maxzoom":14,
		"tiles":[
			"https://interactive.guim.co.uk/maptiles/2023/07/uk-river-pollution/basemap/{z}/{x}/{y}.pbf"
		  ]
	  },
	  "data-tiles": {
		"type": "vector",
		"minzoom": 3,
		"maxzoom": 9,
		"tiles": [
			"https://interactive.guim.co.uk/maptiles/2023/07/uk-river-pollution/data-tiles/{z}/{x}/{y}.pbf"
		]
	  },
	  "raster-tiles": {
		"type": "raster",
		"tiles": [
			"https://interactive.guim.co.uk/maptiles/2023/07/uk-river-pollution/raster-tiles/{z}/{x}/{y}.jpg"
		],
		"tileSize": 256,
		"minzoom": 10,
		"maxzoom": 17,
		"bounds": [
			-0.36486253135514896,
			51.44875604155573,
			-0.28184254685699495,
			51.48468345317755
		],
	  }
	},
	"sprite": "https://interactive.guim.co.uk/maptiles/2023/07/uk-river-pollution/basemap/sprites/sprites",
	"glyphs": "https://interactive.guim.co.uk/maptiles/fonts/{fontstack}/{range}.pbf",
	"layers": [
	  {
		"id": "background",
		"type": "background",
		"layout": {"visibility": "visible"},
		"paint": {"background-color": "#f6f5f3"}
	  },
	  {
		"id": "sea",
		"type": "fill",
		"source": "composite",
		"source-layer": "sea",
		"layout": {"visibility": "visible"},
		"paint": {
			"fill-color": "#E0E4E6", 
			"fill-opacity": 1
		}
	  },
	  {
		"id": "national-parks",
		"type": "fill",
		"source": "composite",
		"source-layer": "national_parks",
		"maxzoom": 12,
		"layout": {},
		"paint": {
		  "fill-color": "#d8ddd4",
		  "fill-opacity": [
			"interpolate",
			["linear"],
			["zoom"],
			5,
			0.6,
			9,
			0.5,
			12,
			0.1
		  ]
		}
	  },
	  {
		"id": "urban-areas",
		"type": "fill",
		"source": "composite",
		"source-layer": "urban_areas",
		"maxzoom": 11,
		"layout": {},
		"paint": {
		  "fill-color": "#CCC",
		  "fill-opacity": ["interpolate", ["linear"], ["zoom"], 6, 0.4, 7, 0.5]
		}
	  },
	  {
		"id": "sites",
		"type": "fill",
		"source": "composite",
		"source-layer": "sites",
		"layout": {},
		"paint": {"fill-color": "#eee7dd", "fill-opacity": 0.7}
	  },
	  {
		"id": "greenspace",
		"type": "fill",
		"source": "composite",
		"source-layer": "greenspaces",
		"layout": {},
		"paint": {"fill-color": "#eaeee7", "fill-antialias": false}
	  },
	  {
		"id": "greenspace outlines",
		"type": "line",
		"source": "composite",
		"source-layer": "greenspaces",
		"layout": {"line-join": "round"},
		"paint": {
		  "line-color": "#d5ddd0",
		  "line-width": [
			"interpolate",
			["linear"],
			["zoom"],
			10,
			0.1,
			15,
			0.3,
			18,
			0.6
		  ]
		}
	  },
	  {
		"id": "woodland",
		"type": "fill",
		"source": "composite",
		"source-layer": "woodland",
		"layout": {},
		"paint": {
		  "fill-color": "#d8ddd4",
		  "fill-opacity": ["interpolate", ["linear"], ["zoom"], 6, 0.5, 12, 1]
		}
	  },
	  {
		"id": "surfacewater",
		"type": "fill",
		"source": "composite",
		"source-layer": "surfacewater",
		"layout": {},
		"paint": {"fill-color": "#E0E4E6"}
	  },
	  {
		"id": "foreshore",
		"type": "fill",
		"source": "composite",
		"source-layer": "foreshore",
		"layout": {},
		"paint": {"fill-color": "#e9e7e2"}
	  },
	  {
		"id": "waterlines",
		"type": "line",
		"source": "composite",
		"source-layer": "waterlines",
		"layout": {"line-join": "round"},
		"paint": {
		  "line-color": "#c5cdd0",
		  "line-width": [
			"match",
			["get", "type"],
			["National", "Regional", "District", "Local"],
			2,
			["MHW"],
			1.2,
			["MLW"],
			0.7,
			1
		  ]
		}
	  },
	  {
		"id": "buildings",
		"type": "fill",
		"source": "composite",
		"source-layer": "buildings",
		"layout": {},
		"paint": {"fill-color": "#e1e0db", "fill-translate": [0, 0]}
	  },
	  {
		"id": "boundaries",
		"type": "line",
		"source": "composite",
		"source-layer": "boundaries",
		"layout": {"line-join": "round"},
		"minzoom": 5,
		"paint": {
			"line-color": "#BABABA", 
			"line-width": 1, 
		}
	  },
	  {
		"id": "etl",
		"type": "line",
		"source": "composite",
		"source-layer": "etl",
		"layout": {"line-join": "round"},
		"paint": {
		  "line-color": "#5b2f2f",
		  "line-opacity": 0.25,
		  "line-dasharray": [10, 5]
		}
	  },
	  {
		"id": "greenspace names",
		"type": "symbol",
		"metadata": {"mapbox:group": "e196265c0e550aaddd2885dc32fdb674"},
		"source": "composite",
		"source-layer": "names",
		"minzoom": 13,
		"filter": ["match", ["get", "type"], ["Greenspace"], true, false],
		"layout": {
		  "text-field": ["to-string", ["get", "name1"]],
		  "text-size": ["interpolate", ["linear"], ["zoom"], 13, 9, 14, 11],
		  "text-font": ["Guardian Text Sans Regular"],
		  "text-line-height": 1
		},
		"paint": {
		  "text-color": "#89a489",
		  "text-halo-color": "#f1efec",
		  "text-halo-width": 1,
		  "text-halo-blur": 1
		}
	  },
	  {
		"id": "sites names",
		"type": "symbol",
		"metadata": {"mapbox:group": "e196265c0e550aaddd2885dc32fdb674"},
		"source": "composite",
		"source-layer": "names",
		"minzoom": 13,
		"filter": ["match", ["get", "type"], ["Sites"], true, false],
		"layout": {
		  "text-field": ["to-string", ["get", "name1"]],
		  "text-size": ["interpolate", ["linear"], ["zoom"], 13, 9, 14, 11],
		  "text-font": ["Guardian Text Sans Regular"],
		  "text-line-height": 1
		},
		"paint": {
		  "text-color": "#6a6f73",
		  "text-halo-color": "#f1efec",
		  "text-halo-width": 1,
		  "text-halo-blur": 1
		}
	  },
	  {
		"id": "landform names",
		"type": "symbol",
		"metadata": {"mapbox:group": "e196265c0e550aaddd2885dc32fdb674"},
		"source": "composite",
		"source-layer": "names",
		"minzoom": 5,
		"filter": ["match", ["get", "type"], ["Landform"], true, false],
		"layout": {
		  "text-field": ["to-string", ["get", "name1"]],
		  "text-size": ["interpolate", ["linear"], ["zoom"], 11, 9, 14, 11],
		  "text-font": ["Guardian Text Sans Regular"],
		  "text-line-height": 1
		},
		"paint": {
		  "text-color": "#6a6f73",
		  "text-halo-color": "#f1efec",
		  "text-halo-width": 1,
		  "text-halo-blur": 1
		}
	  },
	  {
		"id": "landcover names",
		"type": "symbol",
		"metadata": {"mapbox:group": "e196265c0e550aaddd2885dc32fdb674"},
		"source": "composite",
		"source-layer": "names",
		"minzoom": 5,
		"filter": ["match", ["get", "type"], ["Landcover"], true, false],
		"layout": {
		  "text-field": ["to-string", ["get", "name1"]],
		  "text-size": ["interpolate", ["linear"], ["zoom"], 11, 9.5, 14, 12],
		  "text-font": ["Guardian Text Sans Regular"],
		  "text-line-height": 1
		},
		"paint": {
		  "text-color": "#6a6f73",
		  "text-halo-color": "#f1efec",
		  "text-halo-width": 1,
		  "text-halo-blur": 1
		}
	  },
	  {
		"id": "water names",
		"type": "symbol",
		"metadata": {"mapbox:group": "e196265c0e550aaddd2885dc32fdb674"},
		"source": "composite",
		"source-layer": "names",
		"minzoom": 12,
		"filter": ["match", ["get", "type"], ["Water"], true, false],
		"layout": {
		  "text-field": ["to-string", ["get", "name1"]],
		  "text-size": ["interpolate", ["linear"], ["zoom"], 11, 9, 14, 11],
		  "text-font": ["Gdn Text Sans TS3Regular It"],
		  "text-line-height": 1
		},
		"paint": {
		  "text-color": "#6c8499",
		  "text-halo-color": "#f1efec",
		  "text-halo-width": 1,
		  "text-halo-blur": 1
		}
	  },
	  {
		"id": "woodland names",
		"type": "symbol",
		"metadata": {"mapbox:group": "e196265c0e550aaddd2885dc32fdb674"},
		"source": "composite",
		"source-layer": "names",
		"minzoom": 5,
		"filter": ["match", ["get", "type"], ["Woodland"], true, false],
		"layout": {
		  "text-field": ["to-string", ["get", "name1"]],
		  "text-size": ["interpolate", ["linear"], ["zoom"], 11, 9.5, 14, 11.5],
		  "text-font": ["Guardian Text Sans Regular"],
		  "text-line-height": 1,
		  "text-padding": ["interpolate", ["linear"], ["zoom"], 14, 10, 16, 2]
		},
		"paint": {
		  "text-color": "#89a489",
		  "text-halo-color": "#f1efec",
		  "text-halo-width": 1,
		  "text-halo-blur": 1
		}
	  },
	  {
		"id": "small settlement names",
		"type": "symbol",
		"metadata": {"mapbox:group": "e196265c0e550aaddd2885dc32fdb674"},
		"source": "composite",
		"source-layer": "names",
		"minzoom": 12,
		"filter": ["match", ["get", "type"], ["Small Settlements"], true, false],
		"layout": {
		  "text-field": ["to-string", ["get", "name1"]],
		  "text-size": ["interpolate", ["linear"], ["zoom"], 12, 9, 14, 11],
		  "text-font": ["Guardian Text Sans Regular"],
		  "text-line-height": 1
		},
		"paint": {
		  "text-color": "#6a6f73",
		  "text-halo-color": "#f1efec",
		  "text-halo-width": 1,
		  "text-halo-blur": 1
		}
	  },
	  {
		"id": "suburban area names",
		"type": "symbol",
		"metadata": {"mapbox:group": "e196265c0e550aaddd2885dc32fdb674"},
		"source": "composite",
		"source-layer": "names",
		"minzoom": 12,
		"filter": ["match", ["get", "type"], ["Suburban Area"], true, false],
		"layout": {
		  "text-field": ["to-string", ["get", "name1"]],
		  "text-size": ["interpolate", ["linear"], ["zoom"], 10, 10.5, 14, 14],
		  "text-font": ["Guardian Text Sans Regular"],
		  "text-line-height": 1,
		  "text-padding": ["interpolate", ["linear"], ["zoom"], 10, 10, 14, 2]
		},
		"paint": {
		  "text-color": "#6a6f73",
		  "text-halo-color": "#f1efec",
		  "text-halo-width": 1,
		  "text-halo-blur": 1,
		  "text-opacity": ["interpolate", ["linear"], ["zoom"], 10, 0.8, 14, 1]
		}
	  },
	  {
		"id": "railwaystations",
		"type": "symbol",
		"metadata": {"mapbox:group": "e196265c0e550aaddd2885dc32fdb674"},
		"source": "composite",
		"source-layer": "railwaystations",
		"minzoom": 18,
		"layout": {
		  "text-line-height": 1,
		  "text-size": ["interpolate", ["linear"], ["zoom"], 12, 9, 15, 13],
		  "icon-image": [
			"match",
			["get", "type"],
			["Railway Station"],
			"RS",
			["London Underground Station"],
			"UG",
			["Light Rapid Transit Station"],
			"LRTS",
			["Light Rapid Transit Station And London Underground Station"],
			"LRTS-UG",
			["Light Rapid Transit Station And Railway Station"],
			"RS-LRTS",
			["Railway Station And London Underground Station"],
			"RS-UG",
			""
		  ],
		  "text-font": ["Guardian Text Sans Regular"],
		  "text-justify": "left",
		  "text-offset": [
			"match",
			["get", "type"],
			["Railway Station"],
			["literal", [1, 0]],
			["Light Rapid Transit Station"],
			["literal", [1, 0]],
			["London Underground Station"],
			["literal", [1, 0]],
			["Railway Station And London Underground Station"],
			["literal", [1.7, 0]],
			["Light Rapid Transit Station And London Underground Station"],
			["literal", [1.5, 0]],
			["Light Rapid Transit Station And Railway Station"],
			["literal", [1.7, 0]],
			["literal", [0, 0]]
		  ],
		  "icon-size": ["interpolate", ["linear"], ["zoom"], 12, 0.5, 15, 1],
		  "text-anchor": "left",
		  "text-field": ["to-string", ["get", "name"]]
		},
		"paint": {
		  "text-halo-color": "#ffffff",
		  "text-halo-width": 1,
		  "text-halo-blur": 1,
		  "text-color": "#6a6f73"
		}
	  },
	  {
		"id": "airports",
		"type": "symbol",
		"metadata": {"mapbox:group": "e196265c0e550aaddd2885dc32fdb674"},
		"source": "composite",
		"source-layer": "airports",
		"layout": {
		  "icon-image": "Airport",
		  "icon-size": ["interpolate", ["linear"], ["zoom"], 10, 0.8, 15, 1],
		  "text-field": ["to-string", ["get", "name"]],
		  "text-font": ["Guardian Text Sans Regular"],
		  "text-size": ["interpolate", ["linear"], ["zoom"], 10, 9, 15, 13],
		  "text-justify": "left",
		  "text-anchor": "left",
		  "text-offset": [0.8, 0]
		},
		"paint": {
		  "text-color": "#6a6f73",
		  "text-halo-color": "hsl(0, 0%, 100%)",
		  "text-halo-width": 1,
		  "text-halo-blur": 1
		}
	  },
	  {
		"id": "village and hamlet names",
		"type": "symbol",
		"metadata": {"mapbox:group": "e196265c0e550aaddd2885dc32fdb674"},
		"source": "composite",
		"source-layer": "names",
		"minzoom": 12,
		"filter": ["match", ["get", "type"], ["Village", "Hamlet"], true, false],
		"layout": {
		  "text-field": ["to-string", ["get", "name1"]],
		  "text-size": ["interpolate", ["linear"], ["zoom"], 9, 9, 14, 15],
		  "text-font": ["Guardian Text Sans Regular"],
		  "text-line-height": 1,
		  "text-padding": 2
		},
		"paint": {
		  "text-color": "#6a6f73",
		  "text-halo-color": "#f1efec",
		  "text-halo-width": 1,
		  "text-halo-blur": 1,
		  "text-opacity": 1
		}
	  },
	  {
		"id": "town names",
		"type": "symbol",
		"metadata": {"mapbox:group": "e196265c0e550aaddd2885dc32fdb674"},
		"source": "composite",
		"source-layer": "names",
		"minzoom": 12,
		"filter": ["match", ["get", "type"], ["Town"], true, false],
		"layout": {
		  "text-field": ["to-string", ["get", "name1"]],
		  "text-size": ["interpolate", ["linear"], ["zoom"], 7, 10, 14, 18],
		  "text-font": ["Guardian Text Sans Regular"],
		  "text-line-height": 1,
		  "text-padding": 2
		},
		"paint": {
		  "text-color": "#6a6f73",
		  "text-halo-color": "#f1efec",
		  "text-halo-width": 1,
		  "text-halo-blur": 1,
		  "text-opacity": 1
		}
	  },
	  {
		"id": "city names",
		"type": "symbol",
		"metadata": {"mapbox:group": "e196265c0e550aaddd2885dc32fdb674"},
		"source": "composite",
		"source-layer": "names",
		"minzoom": 5,
		"filter": [
			"all",
			["match", ["get", "type"], ["City"], true, false],
			["in", ["get", "name1"], ["literal", ["Liverpool", "Manchester", "Leeds", "Birmingham", "Newcastle", "Nottingham", "Sheffield", "Oxford"]]]
		],
		"layout": {
		  "text-field": ["to-string", ["get", "name1"]],
		  "text-size": ["interpolate", ["linear"], ["zoom"], 6, 12, 14, 20],
		  "text-font": ["Guardian Text Sans Regular"],
		  "text-line-height": 1,
		  "text-padding": 2,
		  "text-letter-spacing": 0.05
		},
		"paint": {
		  "text-color": "#55595c",
		  "text-halo-color": "#f1efec",
		  "text-halo-width": 1,
		  "text-halo-blur": 1,
		  "text-opacity": 1
		}
	  },
	  {
		"id": "national park names",
		"type": "symbol",
		"metadata": {"mapbox:group": "e196265c0e550aaddd2885dc32fdb674"},
		"source": "composite",
		"source-layer": "names",
		"minzoom": 5,
		"filter": ["match", ["get", "type"], ["National Park"], true, false],
		"layout": {
		//   "text-field": ["to-string", ["get", "name1"]],
		  "text-field":[
			"let", 
			"name",
			["get", "name1"],
			[
				"case",
				["==", ["var", "name"], "BRECON BEACONS NATIONAL PARK"],
				"BANNAU BRYCHEINIOG NATIONAL PARK",
				["var", "name"]
			]
		  ],
		  "text-size": ["interpolate", ["linear"], ["zoom"], 6, 8, 14, 15],
		  "text-font": ["Guardian Text Sans Medium"],
		  "text-line-height": 1,
		  "text-padding": 2,
		  "text-letter-spacing": 0.06
		},
		"paint": {
		  "text-color": "#89a489",
		  "text-halo-color": "#f1efec",
		  "text-halo-width": 1,
		  "text-halo-blur": 1,
		  "text-opacity": 0.8
		}
	  },
	  {
		"id": "capital city names",
		"type": "symbol",
		"metadata": {"mapbox:group": "e196265c0e550aaddd2885dc32fdb674"},
		"source": "composite",
		"source-layer": "names",
		"minzoom": 7,
		"filter": ["match", ["get", "type"], ["Capital"], true, false],
		"layout": {
		  "text-field": ["to-string", ["get", "name1"]],
		  "text-size": ["interpolate", ["linear"], ["zoom"], 6, 12, 12, 22],
		  "text-font": ["Guardian Text Sans Bold"],
		  "text-line-height": 1,
		  "text-padding": 2,
		  "text-letter-spacing": 0.05
		},
		"paint": {
		  "text-color": "#55595c",
		  "text-halo-color": "#f1efec",
		  "text-halo-width": 1,
		  "text-halo-blur": 1,
		  "text-opacity": 1
		}
	  },
	  {
		"id": "country names",
		"type": "symbol",
		"metadata": {"mapbox:group": "e196265c0e550aaddd2885dc32fdb674"},
		"source": "composite",
		"source-layer": "names",
		"minzoom": 4,
		"maxzoom": 10,
		"filter": ["match", ["get", "type"], ["Country"], true, false],
		"layout": {
		  "text-field": ["to-string", ["get", "name1"]],
		  "text-size": ["interpolate", ["linear"], ["zoom"], 5, 18, 10, 18],
		  "text-font": ["Guardian Text Egyptian Medium"],
		  "text-line-height": 1,
		  "text-padding": 2,
		},
		"paint": {
		  "text-color": "#55595c",
		  "text-halo-color": "#f1efec",
		  "text-halo-width": 2,
		  "text-halo-blur": 0,
		  "text-opacity": 1
		}
	  },
	  {
		"id": "river names wye catchment",
        "type": "symbol",
		"source": "data-tiles",
		"source-layer": "WyecatchmentriversOSM",
		"minzoom": 8,
        "layout": {
            "text-size": [
                    "interpolate",
                    ["linear"], 
                    ["zoom"], 
                    6, 
                    14, 
                    9, 
                    [
                        "case",
                        ["==", ["get", "name"], "River Wye"],
                        16,
                        14   
                    ]
            ], 
            "text-font": [
				"case",
				["==", ["get", "name"], "River Wye"],
				["literal", ["Guardian Text Egyptian Medium"]],
				["literal", ["Gdn Text Sans TS3Regular It"]]    
			],
            "text-line-height": 1,
            "text-padding": 2,
            "text-field": [
                "let", 
                "name",
                ["get", "name"],
                [
                    "case",
                    ["==", ["get", "osm_id"], "4078508"],
                    ["concat", ["var", "name"], " ", "(Afon Gŵy)"],
                    ["var", "name"]
                ]
            ]
        },
        "paint": {
            "text-color": "#55595c",
            "text-halo-color": "#f1efec",
            "text-halo-width": 2,
            "text-halo-blur": 1,
            "text-opacity": 1
        },
        "filter": ["match", ["get", "osm_id"], ["4078508", "4075419", "205976472", "401854354", "23688690", "424818064", "45725708"], true, false]
	  }
	]
}
