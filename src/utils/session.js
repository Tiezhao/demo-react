//sessionStorage.setItem("lastname", "Smith"),在浏览器中暂时存储 key/value 对的数据,lastname为key，Smith为值
//sessionStorage.getItem("lastname"),获取再浏览器暂时存储的key的值
let tokenAdmin = "adminToken";
export const setToken = (value) => {
  sessionStorage.setItem(tokenAdmin, value);
};

export const getToken = () => {
  return sessionStorage.getItem(tokenAdmin);
};
