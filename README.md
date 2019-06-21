# react-singleton-overlay

![aa](./세부세부.svg)
![aa](./세부블랙.svg)
![aa](./세부블루.svg)

## Install

```
yarn add react-singleton-overlay
```
```
npm i --save react-singleton-overlay
```

## Usage

```
import { Overlay } from "react-singleton-overlay";

Overlay.show(<SomeContent />);
```

## API

### Methods

**Overlay.show(content: ReactNode, options?: Options)**

**Overlay.hide()**

### Options

| title      | type       | description                  | default |
|------------|------------|-----------------------------|---------|
| width      | string     | overlay container width      | 100vw   |
| height     | string     | overlay container height     | 100vh   |
| background | string     | overlay container background | #fff    |
| onClose    | () => void | called when overlay hide     | null    |

## License

MIT