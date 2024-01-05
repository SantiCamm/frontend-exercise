import { DESCRIPTION_FIELD_ID, NAME_FIELD_ID } from "src/constants/forms";

export const textFields = [
  {
    name: "title",
    id: NAME_FIELD_ID,
    label: "Título",
  },
  {
    name: "description",
    id: DESCRIPTION_FIELD_ID,
    label: "Descripción",
    sx: { margin: "4px 0" },
  },
];
