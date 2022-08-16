import {createTestSetup, TTestSetupFn} from "../../utils/helpers";
import Todos from "./index";

describe("<Todos />", () => {
  let setup: TTestSetupFn;

  beforeAll(() => {
    setup = createTestSetup({
      component: Todos,
    });
  });

  it("should be rendered", () => {
    const { container } = setup();
    expect(container).toBeTruthy();
  });

  it("should render coordinate form", async () => {
    const { getByTestId } = setup();

    const todoCreateForm = getByTestId("todo-create-form");
    expect(todoCreateForm).toBeTruthy();

    const todoList = getByTestId("todo-list");
    expect(todoList).toBeTruthy();
  });
});