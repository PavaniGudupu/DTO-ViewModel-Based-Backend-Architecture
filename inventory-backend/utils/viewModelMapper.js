export const mapToViewModel = (dbRow, viewModel) => {
  const output = {};

  for (const key in viewModel) {
    if (dbRow[key] !== undefined) {
      output[key] = dbRow[key];
    }
  }

  return output;
};


