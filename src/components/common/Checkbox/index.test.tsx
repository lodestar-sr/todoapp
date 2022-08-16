import {fireEvent} from "@testing-library/dom";
import {wait} from "@testing-library/user-event/dist/utils";
import {createTestSetup, TTestSetupFn} from "../../../utils/helpers";
import {Checkbox} from "./index";

describe("<Checkbox />", () => {
  let setup: TTestSetupFn;
  const changeFn = jest.fn();

  beforeAll(() => {
    setup = createTestSetup({
      component: Checkbox,
      props: {
        checked: true,
        onChange: changeFn,
      },
    });
  });

  it("should be rendered", () => {
    const { container } = setup();
    expect(container).toBeTruthy();
  });

  it("should render checkbox", async () => {
    const { getByTestId } = setup();

    const checkbox = getByTestId("checkbox");
    expect(checkbox).toBeTruthy();
    expect(checkbox.classList.contains('checked')).toBeTruthy();

    fireEvent.click(checkbox);
    await wait();

    expect(changeFn).toBeCalledWith(false);
  });
});