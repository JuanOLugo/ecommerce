export const autoDefaultStates = ({ ...states }) => {
    console.log(states);
    const statesToArray = Object.keys(states);
    statesToArray.forEach((state) => {
      states[state]("");
    });
  };