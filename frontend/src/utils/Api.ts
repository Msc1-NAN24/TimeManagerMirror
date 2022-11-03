export const authorize = (accessToken: string) => {
  return {
    headers: {authorization: accessToken}
  };
}