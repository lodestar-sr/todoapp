import {fireEvent} from "@testing-library/dom";
import {wait} from "@testing-library/user-event/dist/utils";
import {createTestSetup, TTestSetupFn} from "../../../utils/helpers";
import {TodoItem} from "./index";

describe("<TodoItem />", () => {
  let setup: TTestSetupFn;
  const changeFn = jest.fn();
  const deleteFn = jest.fn();

  beforeAll(() => {
    setup = createTestSetup({
      component: TodoItem,
      props: {
        todo: { id: 1, text: 'TODO', completed: false },
        onChange: changeFn,
        onDelete: deleteFn,
      },
    });
  });

  it("should be rendered", () => {
    const { container } = setup();
    expect(container).toBeTruthy();
  });

  it("should render todoItem", async () => {
    const { getByTestId } = setup();

    const todoItem = getByTestId("todo-item");
    expect(todoItem).toBeTruthy();

    const checkbox = getByTestId("checkbox");
    expect(checkbox).toBeTruthy();
    fireEvent.click(checkbox);
    await wait();
    expect(changeFn).toBeCalledWith({ id: 1, text: 'TODO', completed: true });

    const editButton = getByTestId("edit-button");
    expect(editButton).toBeTruthy();
    fireEvent.click(editButton);
    await wait();

    const input = getByTestId("input");
    expect(input).toBeTruthy();
    fireEvent.change(input, { target: { value: 'NEW TODO' } });
    await wait();

    changeFn.mockReset();
    const saveButton = getByTestId("save-button");
    expect(saveButton).toBeTruthy();
    fireEvent.click(saveButton);
    await wait();
    expect(changeFn).toBeCalledWith({ id: 1, text: 'NEW TODO', completed: false });

    jest.spyOn(window, 'confirm').mockImplementation(() => true);
    const deleteButton = getByTestId("delete-button");
    expect(deleteButton).toBeTruthy();
    fireEvent.click(deleteButton);
    await wait(1000);
    expect(deleteFn).toBeCalled();
  });
});