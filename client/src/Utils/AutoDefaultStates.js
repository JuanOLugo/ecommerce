export const autoDefaultStates = ({ ...states }) => {
    const statesToArray = Object.keys(states);
    statesToArray.forEach((state) => {
      states[state]("");
    });
  };