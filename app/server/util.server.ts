export const delayResponse = async (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time));
