export const setRef = (ref, instance) => {
  if (ref instanceof Function) {
    ref(instance);
  } else if (ref != null) {
    ref.current = instance;
  }
};

export const combinedRef = (refs) => {
  return (instance) => refs.forEach((ref) => setRef(ref, instance));
};
