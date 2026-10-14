import { reactive } from 'vue';

const toasts = reactive([]);
let nextId = 1;

export function useToast() {
  function add({ severity = 'success', summary, detail, life = 5000 }) {
    const id = nextId++;
    toasts.push({ id, severity, summary, detail });
    setTimeout(() => remove(id), life);
  }

  function remove(id) {
    const index = toasts.findIndex((toast) => toast.id === id);
    if (index !== -1) {
      toasts.splice(index, 1);
    }
  }

  return { toasts, add, remove };
}
