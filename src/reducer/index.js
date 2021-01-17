const initState = [
  {
    姓名: "张三",
    性别: "男",
    年龄: "12",
    班级: "1班",
    成绩: "60",
  },
  {
    姓名: "刘玲",
    性别: "女",
    年龄: "12",
    班级: "1班",
    成绩: "75",
  },
  {
    姓名: "李四",
    性别: "男",
    年龄: "13",
    班级: "2班",
    成绩: "89",
  },
  {
    姓名: "王五",
    性别: "男",
    年龄: "13",
    班级: "2班",
    成绩: "78",
  },
  {
    姓名: "张爱玲",
    性别: "女",
    年龄: "13",
    班级: "3班",
    成绩: "98",
  },
];

const reducer = (state, action) => {
  if (action.type === "send_action") {
    return Object.assign({}, state, action);
  }
  return state;
};

export default reducer;
