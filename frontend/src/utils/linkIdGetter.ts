
export const linkIdGetter = (type : string, link : string) : string => {
  if (type === "tweet") {
    const linkArr = link.split("/");
    const assignedLinkId = linkArr[linkArr.length - 1];
    console.log(assignedLinkId)
    return assignedLinkId;
  }
  else if (type === "youtube") {
    const linkArr = link.split("/")
    const anotherLinkArr = linkArr[linkArr.length -1].split("=")
    const length = anotherLinkArr.length - 1

    return anotherLinkArr[length]
  }
  else {
    return ""
  }
};
