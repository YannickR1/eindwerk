export function state() {
  return {
    google: window.google,
    bias: {},
  }
}

export const getters = {}

export const mutations = {
  setLocation(state, bias) {
    state.bias = bias
  },
}

export const actions = {}
