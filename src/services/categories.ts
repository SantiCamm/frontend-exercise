import axios from "axios";

const fetchCategories = async () => {
  try {
    const response = await axios.get("http://localhost:3000/categories");
    return response.data;
  } catch (error) {
    throw new Error("Error fetching categories");
  }
};

export { fetchCategories };
