export const reducer = (state, action) => {
  const { validationResult, inputId } = action;

  const updateValidities = {
    ...state.inputValidities,
    [inputId]: validationResult,
  };

  let updatedFormIsValid = true;
  for (const key in updateValidities) {
    if (updateValidities[key] !== undefined) {
      updatedFormIsValid = false;
      break;
    }
  }
  return {
    inputValidities: updateValidities,
    formIsValid: updatedFormIsValid,
  };
};
