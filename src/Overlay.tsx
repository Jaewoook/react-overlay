import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import {
  background,
  BackgroundProps,
  height,
  HeightProps,
  width,
  WidthProps,
} from "styled-system";

const Container = styled.div<BackgroundProps>`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100vw;
  z-index: 10000;
  overflow: auto!important;
  -webkit-overflow-scrolling: touch!important;
  ${background}
`;

const Wrapper = styled.div<WidthProps & HeightProps>`
  ${width}
  ${height}
  box-sizing: border-box;
`;

type Options = WidthProps & HeightProps & BackgroundProps & {
  onClose?: () => void;
};

interface OverlayState {
  show: boolean;
  children: React.ReactNode;
  options: Options;
}

export class Overlay extends React.Component<{}, OverlayState> {
  static instance: any;

  static getInstance(callback) {
    if (Overlay.instance) {
      callback(Overlay.instance);
      return;
    }

    const ref = (instance) => {
      callback(instance);
      Overlay.instance = instance;
      return instance;
    };

    const el = document.createElement("div");
    const root = document.getElementById("portal-root");
    el.setAttribute("id", "overlay");
    root.appendChild(el);

    ReactDOM.render(<Overlay ref={ref} />, el);
  }

  static show(children: React.ReactNode, options?: Options) {
    Overlay.getInstance((instance) => {
      instance.show(children, options);
    });
  }

  static hide() {
    if (Overlay.instance) {
      Overlay.getInstance((instance) => {
        instance.hide();
      });
    }
  }

  state = {
    show: false,
    children: null,
    options: {
      width: "100vw",
      height: "100vh",
      background: "#fff",
      onClose: null,
    },
  };

  show(children: React.ReactNode, options?: Options) {
    if (!options) {
      options = {
        width: "100vw",
        height: "100vh",
        background: "#fff",
      };
    }
    const { width, height, background, onClose } = options;

    this.setState({
      show: true,
      children,
      options: {
        width: width || "100vw",
        height: height || "100vh",
        background: background || "#fff",
        onClose,
      },
    });
  }

  hide() {
    if (this.state.options.onClose) {
      this.state.options.onClose();
    }
    this.setState({
      show: false,
      children: null,
    });
  }

  render() {
    const { options, children, show } = this.state;
    return show ? (
      <Container background={options.background}>
        <Wrapper width={options.width} height={options.height}>
          {children}
        </Wrapper>
      </Container>
    ) : null;
  }

}
