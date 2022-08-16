import React from "react";
import {BrowserRouter} from "react-router-dom";
import {render, RenderResult} from "@testing-library/react";

export interface IProps {
  [key: string]: any;
}

export interface ICreateSetupParams {
  component: React.FC<any>;
  props?: IProps;
}

export type TRenderResult = RenderResult & {
  props: IProps;
};

export type TTestSetupFn = (params?: React.ReactElement) => TRenderResult;
export type TCreateTestSetupFn = (params: ICreateSetupParams) => TTestSetupFn;

export function createTestSetup(params: ICreateSetupParams): TTestSetupFn {
  const { component: Component, props: initialProps = {} } = params;

  return (ui?: React.ReactElement): TRenderResult => {
    const combinedProps = { ...initialProps, ...ui?.props };

    const wrappedComponent = (props: IProps) => (
      <BrowserRouter>
        <Component {...props} />
      </BrowserRouter>
    );

    const wrapper = render(wrappedComponent(combinedProps));

    const rerender = (ui: React.ReactElement) => {
      const { props } = ui;
      const newProps = { ...combinedProps, ...props };

      wrapper.rerender(wrappedComponent(newProps));
    };

    return {
      ...wrapper,
      rerender,
      props: ui?.props,
    };
  };
}
