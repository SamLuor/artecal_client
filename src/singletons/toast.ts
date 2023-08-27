/* eslint-disable @typescript-eslint/no-explicit-any */
interface ToastOptions {
  severity?: 'success' | 'info' | 'warn' | 'error';
  summary?: string;
  detail?: string;
  life?: number;
}

type ToastRefType = {
  current: {
    current: {
      show: (options: ToastOptions) => void;
      clear: () => void;
    };
    // Outras propriedades e métodos do objeto current
  };
};

const ToastSingleton = {
  instance: null,
  toastRef: null as ToastRefType['current'] | null,
  
  getInstance: function() {
    if (!this.instance) {
      this.instance = Object.create(this);
    }
    return this.instance;
  },

  setToastRef: function(ref: any) {
    this.toastRef = ref;
  },

  getToastRef: function() {
    return this.toastRef;
  }
};

export default ToastSingleton;