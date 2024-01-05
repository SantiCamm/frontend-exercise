const getTaskCategory = (task, categories) =>
  categories?.find((cat) => cat?.id === task.category_id);

export { getTaskCategory };
