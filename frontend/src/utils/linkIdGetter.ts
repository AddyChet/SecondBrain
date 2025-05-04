
export const linkIdGetter = (type : string, link : string) : string => {
  if (type === "tweet") {
    const urlSegments  = link.split("/");
    const tweetId  = urlSegments[urlSegments.length - 1];
    return tweetId ;
  }
  else if (type === "youtube") {
    const urlSegments = link.split("/")
    const queryParams  = urlSegments[urlSegments.length -1].split("=")
    const lastParamIndex = queryParams .length - 1

    return queryParams[lastParamIndex]
  }
  else {
    return ""
  }
};
