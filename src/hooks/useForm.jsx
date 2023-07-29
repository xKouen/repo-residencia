// hooks/useForm.js
import { useState } from "react";

export function useForm(initialValues) {
  const [form, setForm] = useState(initialValues);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [id]: value }));
  };

  return { form, changed: handleChange };
}
