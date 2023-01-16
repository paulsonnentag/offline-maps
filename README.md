# offline maps demo

Demo to test caching of tiles in MapLibre to support offline use cases.  

## Setup

Install dependencies

```bash
yarn install
```

Download example data 

```bash
wget -O data/zurich_switzerland.mbtiles data https://github.com/maptiler/tileserver-gl/releases/download/v1.3.0/zurich_switzerland.mbtiles
```

> Full data can be downloaded here: https://data.maptiler.com/downloads/planet/

Start the tile server

```bash
yarn run tileserver
```

Start the dev server

```bash
yarn dev
```

