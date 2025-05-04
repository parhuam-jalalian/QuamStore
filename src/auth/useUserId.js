const useUserId = () => {
    return localStorage.getItem('userId') || null;
  };
  
  export default useUserId;
  