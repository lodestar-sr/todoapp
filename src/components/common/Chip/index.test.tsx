import {createTestSetup, TTestSetupFn} from "../../../utils/helpers";
import {Chip} from "./index";

describe("<Chip />", () => {
  let setup: TTestSetupFn;

  beforeAll(() => {
    setup = createTestSetup({
      component: Chip,
      props: {
        color: "primary",
        activc: true,
      },
    });
  });

  it("should be rendered", () => {
    const { container } = setup();
    expect(container).toBeTruthy();
  });

  it("should render chip", async () => {
    const { getByTestId } = setup();

    const chip = getByTestId("chip");
    expect(chip).toBeTruthy();
  });
});