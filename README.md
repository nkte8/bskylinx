![](./public/materials/longlogo.svg)

[Bluesky Link-𝕏 (BskyLinX)](https://bskylinx.com/) is web application that BlueSky user saves their time of boring SNS X.com(Twitter).

## How works

BskyLinX post your post to Bluesky with AT Protocol.  
for twitter, because of X taxes, Skydrop present Post Link: [Like that](https://twitter.com/intent/tweet?text=This&nbsp;is&nbsp;tweet&nbsp;sample.&url=https://bskylinx.com/posts/nlla.bsky.social_3kk2svpe3iz2r/), can only with media by OGP image.

## AR Protocol

Because of [bluesky official typescript client]() seems not available works on React, BskyLinX uses REST API directry by fetch API.  

## Build

Setup node_modules:
```sh
docker run --rm -v $PWD:/src -w /src -u `id -u`:`id -g` -p 80:4321 -it node:18.17.1 npm install
```
Into node container:
```sh
docker run --rm -v $PWD:/src -w /src -u `id -u`:`id -g` -p 80:4321 -it node:18.17.1 /bin/bash
```

setup .env:
```sh
GETPAGES_ENDPOINT="getpages_endpoint"
PUBLIC_CREATEPAGES_ENDPOINT="createpages_endpoint"
```

```sh
# astro develop server
npm run dev
```

## Deploy 

This application works as SSR mode in cloudflare, no support by SSG.
