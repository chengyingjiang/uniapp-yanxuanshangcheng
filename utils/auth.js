export function tranListToTreeData(list, rootPid) {
  var arr = [];
  list.forEach((item) => {
    if (item.pid === rootPid) {
      // 找到之后，就去找item下是否有子节点
      var children = tranListToTreeData(list, item.id);
      if (children.length) {
        // 说明找到了子节点  添加到item的children属性中
        item.children = children;
      }
      arr.push(item);
    }
  });
  return arr;
}
// 转为query参数  {username:123,pwd:123}===>username=123&pwd=123
export function objToStr(obj) {
  let str = ""
  const temp = []
  for (const key in obj) {
    temp.push(`${key}=${obj[key]}`)
  }
  str = temp.join("&")
  return str
}
