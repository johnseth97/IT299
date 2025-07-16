# [1.4.0](https://github.com/johnseth97/IT299/compare/v1.3.0...v1.4.0) (2025-07-16)


### Bug Fixes

* **CD:** hardcoding in GH secrets ([34c0134](https://github.com/johnseth97/IT299/commit/34c01340352ee4bfd841a942b9ddab5bdb9a78b8))
* **CD:** manual dispatch [run ci] ([1304626](https://github.com/johnseth97/IT299/commit/1304626a40844b655264aace9b01dffbcfab11fe))
* **dockerfile:** forgot prod deps aren't in json ([b12fcce](https://github.com/johnseth97/IT299/commit/b12fcce41073d959e6702f73879a2b6fa5b6742b))
* **docker:** forgot to install tsx globally ([6e1af49](https://github.com/johnseth97/IT299/commit/6e1af498ebf138df1d20a9b2b0703ba7d53b1334))
* **frontend:** lsp did accidental import ([25e369f](https://github.com/johnseth97/IT299/commit/25e369fb6bc5d826fcf92031e77aed254a9a0235))
* **frontend:** pathtoregexp error ([b9651cb](https://github.com/johnseth97/IT299/commit/b9651cb68ac6fd83a97c018f292ebd2f58ba99ae))
* **frontend:** regexp ([23464cb](https://github.com/johnseth97/IT299/commit/23464cbfeb15e30ba93fb407c389576f0d9a8972))
* **frontend:** stop swallowing api routes ([3588809](https://github.com/johnseth97/IT299/commit/3588809a88cf6f37b4a38d31a0fb96ed501436b7))
* **orders:** solved type error resulting in uncategorized ([01a435a](https://github.com/johnseth97/IT299/commit/01a435a6409b29ef10a7c24c0cb9ff4cebaa7aa4))
* **proxy:** finallly figured out how the module works ([934467f](https://github.com/johnseth97/IT299/commit/934467f438b0d7dd72302e272263b59d40a55616))
* **statics:** attempting to inject api url at runtime ([2a308bb](https://github.com/johnseth97/IT299/commit/2a308bb6c37cad4b5dfabc4621d21f7320170171))
* **workflow:** added run CI flag for workflow debug [run ci] ([331d716](https://github.com/johnseth97/IT299/commit/331d716719a7a0e92c5e9476d1ef29825758827a))
* **workflow:** comparing strings not string to bool ([8e19e71](https://github.com/johnseth97/IT299/commit/8e19e71a4b1daf2e57f76cc54f347e77373e952e))


### Features

* **frontend:** reverse proxy to avoid cors ([465a12f](https://github.com/johnseth97/IT299/commit/465a12f9bd363b23dc07e91f01dafd9d59c512aa))

# [1.3.0](https://github.com/johnseth97/IT299/compare/v1.2.1...v1.3.0) (2025-07-15)


### Bug Fixes

* **CD:** hopefully, the final dockerfile fixes ([932f27b](https://github.com/johnseth97/IT299/commit/932f27b4c794a120b8acbf48d9d3ec83e32c0ff0))
* **CD:** missing another js ([871202c](https://github.com/johnseth97/IT299/commit/871202cf50e8c350b4a6fb293f39bfd6f6a7062b))
* **docker:** omitted file ([6ed339b](https://github.com/johnseth97/IT299/commit/6ed339b350ab80a37c286f935875922e25be3098))
* **frontend:** serving with express to grab process envars ([793e733](https://github.com/johnseth97/IT299/commit/793e7339d1a43500f2dd4a88e20de4c3975ee771))
* **workflows:** passing tags back instead of artifacts ([7f0e62b](https://github.com/johnseth97/IT299/commit/7f0e62b37d8a11b951a94efd4e6cea61798de58f))


### Features

* **CI:** automatically trigger build-push ([c797848](https://github.com/johnseth97/IT299/commit/c797848134eca875a22ee0a850accd7773697240))

## [1.2.1](https://github.com/johnseth97/IT299/compare/v1.2.0...v1.2.1) (2025-07-15)


### Bug Fixes

* **workflow:** hopefully simplier version of CI pipelines ([f32d046](https://github.com/johnseth97/IT299/commit/f32d046e3844d56cb18a892b96e41ee8f396941f))

# [1.2.0](https://github.com/johnseth97/IT299/compare/v1.1.2...v1.2.0) (2025-07-15)


### Features

* **CD:** major build changes, cors, the like. Actually building, not previewing. ([284a043](https://github.com/johnseth97/IT299/commit/284a043a4b2c970049c9625f08425051e707d44f))
* **vite:** pull url from .env ([e829def](https://github.com/johnseth97/IT299/commit/e829defdec07998e39b481ed86abfb93e5e3fd51))

## [1.1.2](https://github.com/johnseth97/IT299/compare/v1.1.1...v1.1.2) (2025-07-15)


### Bug Fixes

* **CD:** missing context ([8d7364d](https://github.com/johnseth97/IT299/commit/8d7364dc951438ce92ee4b47978c18a31204a953))

## [1.1.1](https://github.com/johnseth97/IT299/compare/v1.1.0...v1.1.1) (2025-07-15)


### Bug Fixes

* **CD:** moved dockerfile context ([20aa37f](https://github.com/johnseth97/IT299/commit/20aa37f928ac899c14f2192f2c09729a6084bf17))
* **workflow:** conditionally skip downloading CI metadata ([ebaa134](https://github.com/johnseth97/IT299/commit/ebaa1342eabb1e9f399e55ee067ef194798f7e82))
* **workflow:** fetch depth on checkout ([39bc4ea](https://github.com/johnseth97/IT299/commit/39bc4ea34a46ec97418d0fb0012c58c6833dc468))

# [1.1.0](https://github.com/johnseth97/IT299/compare/v1.0.0...v1.1.0) (2025-07-15)


### Features

* **CD:** fixed docker containers and added workflow dispatch ([6578ae4](https://github.com/johnseth97/IT299/commit/6578ae4859ddfe69f095e99ab3ebe6742b7f5ea5))
* **frontend:** added ability to search by id and email ([4b9a57f](https://github.com/johnseth97/IT299/commit/4b9a57fddbb773f56cbe35865637a577fcde2513))

# 1.0.0 (2025-07-14)

### Features

* **frontend:** built frontend ui to be tied into API ([2e952ca](https://github.com/johnseth97/IT299/commit/2e952ca76a61452f1eb15cdffc5ec4d76c45e710))
