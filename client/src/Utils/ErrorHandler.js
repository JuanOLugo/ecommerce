export const ErrorHandler = (message, time_message) => {
    setErrorMsg(message);
    setTimeout(() => {
      setErrorMsg(null);
    }, time_message);
  };