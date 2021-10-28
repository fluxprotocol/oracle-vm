# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [2.0.0](https://github.com/fluxprotocol/oracle-vm/compare/v1.1.0...v2.0.0) (2021-10-28)


### ⚠ BREAKING CHANGES

* **vm:** Removes support for old opcodes

Squashed commits:
[4ebf0e3] WIP: Convert timestamp to hrtime
[1912f63] WIP: Add support for caching prepared WASM
[ed045c7] WIP: Add extra debugging logs
[60c2707] WIP: Implemented BigDecimal for combining numbers
[9749435] WIP: Add support for logging errors
[41b01fb] WIP: Add support for setting headers and method in a http_call
[e652060] WIP: Fetching API data through WASM
[0ed74e0] WIP: Sending commands from the worker back to the master
[5c62c60] WIP: Implementing function calling
[da679b2] chore(build): Working version of workers + TypeScript + Webpack
[8920f06] WIP: On node/browser building with webpack
[f56d907] WIP: WASM implementation

### Features

* **vm:** Add support for WASM ([7f2cd5c](https://github.com/fluxprotocol/oracle-vm/commit/7f2cd5cff2c6764b93b85ed906461da87069dd66))

## [1.1.0](https://github.com/fluxprotocol/oracle-vm/compare/v0.0.5...v1.1.0) (2021-07-14)


### Features

* **opcode:** Add EQ opcode ([690c0ec](https://github.com/fluxprotocol/oracle-vm/commit/690c0ecbbe76af9aff021019a86ba2f9e354e872))
* **opcode:** Add OR opcode ([f03a723](https://github.com/fluxprotocol/oracle-vm/commit/f03a723cdf10a9a0bf718b7df0f489868eed3423))

### [0.0.5](https://github.com/fluxprotocol/oracle-vm/compare/v0.0.4...v0.0.5) (2021-07-07)


### Features

* **opcode:** Add AND operator ([f93f4ad](https://github.com/fluxprotocol/oracle-vm/commit/f93f4add3c0c7d66a03507f890aab188134dafb4))

### [0.0.4](https://github.com/fluxprotocol/oracle-vm/compare/v0.0.3...v0.0.4) (2021-07-06)


### Features

* **PARSE:** Add dynamic variables to path ([25436e6](https://github.com/fluxprotocol/oracle-vm/commit/25436e6f92e29e42fb5e7f9c0e67431fff533a6d))

### [0.0.3](https://github.com/fluxprotocol/oracle-vm/compare/v0.0.2...v0.0.3) (2021-07-06)


### Bug Fixes

* **build:** Fix issue where main.js could not be found ([deec7c0](https://github.com/fluxprotocol/oracle-vm/commit/deec7c076e8bd3e0a27b04ea178935957fa3cedc))

### [0.0.2](https://github.com/fluxprotocol/oracle-vm/compare/v0.0.1...v0.0.2) (2021-07-06)


### Features

* **exports:** Add Code and ExecuteOptions as a export ([0d447da](https://github.com/fluxprotocol/oracle-vm/commit/0d447da7ed15020ea5a3930b107836b85744af58))

### 0.0.1 (2021-07-06)


### Features

* **opcode:** Add ability to inject variables into VAR opcodes ([c63ab87](https://github.com/fluxprotocol/oracle-vm/commit/c63ab8799c662f5aa7d90a5a3c73b1042f5e77f6))
* **opcode:** Add ENV opcode ([cd97607](https://github.com/fluxprotocol/oracle-vm/commit/cd976070d7472fb7f38700a3eeb7d28d795ee8ae))
* **opcode:** Add GT opcode ([419b323](https://github.com/fluxprotocol/oracle-vm/commit/419b323154770dfdd1c5f817f3c6d2cd17a755d7))
* **opcode:** Add JUMP and JUMPDEST opcode ([470ea5e](https://github.com/fluxprotocol/oracle-vm/commit/470ea5ed9ea2fc178c58800ac1db404f3ad0fa48))
* **opcode:** Add JUMPI opcode ([e096f93](https://github.com/fluxprotocol/oracle-vm/commit/e096f937b359a0b461be5cbf6c80c9ff4fb38863))
* **opcode:** Add LT opcode ([05292a9](https://github.com/fluxprotocol/oracle-vm/commit/05292a9d6e637a316e270bbffe583994fe42da31))
* **opcode:** Add rounding down for when a float is generated due to math functions ([578777a](https://github.com/fluxprotocol/oracle-vm/commit/578777ad2728415f349c3732760eaee46a2ed94a))
* **opcode:** Add SUB, MUL, PARSE, RETURN, SUB and VAR ([4e8172d](https://github.com/fluxprotocol/oracle-vm/commit/4e8172d5571f6c46b9f4b3eac0a18f5fe82ce769))
* **opcode:** Add validation for overflow in uint types ([ac58c20](https://github.com/fluxprotocol/oracle-vm/commit/ac58c20f6f1af611af8ad29c1ce4ce5bf5f10555))
* **runtime:** Switch to using a program counter ([f45c2d2](https://github.com/fluxprotocol/oracle-vm/commit/f45c2d22b16dd76cdd39b8dd57594d5c1c04d997))
* **type:** Add support for double variable types ([25130c6](https://github.com/fluxprotocol/oracle-vm/commit/25130c6848cb66a31d11577cb38534116931c74d))
* **type:** Add support for signed integers ([a8df738](https://github.com/fluxprotocol/oracle-vm/commit/a8df7387846b477ca7195a9f34db03294ebecdf7))
