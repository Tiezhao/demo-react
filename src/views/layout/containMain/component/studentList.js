import React from "react";
import { Table, Tag, Space, Button } from "antd";
const columns = [
  {
    title: "姓名",
    dataIndex: "name",
    key: "name",
    // render: (text) => <a>{text}</a>,
  },
  {
    title: "性别",
    dataIndex: "sex",
    key: "sex",
  },
  {
    title: "年龄",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "班级",
    dataIndex: "class",
    key: "class",
  },
  {
    title: "成绩",
    dataIndex: "score",
    key: "score",
  },
  {
    // title: "Action",
    key: "action",
    render: (text, record) => (
      // <Space size="middle">
      //   <a>Invite {record.name}</a>
      //   <a>Delete</a>
      // </Space>
      <Button type="primary">编辑</Button>
    ),
  },
];

const data = [
  {
    key: "1",
    name: "张三",
    sex: "男",
    age: 12,
    class: "1班",
    score: 60,
  },
  {
    key: "2",
    name: "张三",
    sex: "男",
    age: 12,
    class: "1班",
    score: 60,
  },
  {
    key: "3",
    name: "张三",
    sex: "男",
    age: 12,
    class: "1班",
    score: 60,
  },
  {
    key: "4",
    name: "张三",
    sex: "男",
    age: 12,
    class: "1班",
    score: 60,
  },
  {
    key: "5",
    name: "张三",
    sex: "男",
    age: 12,
    class: "1班",
    score: 60,
  },
  {
    key: "5",
    name: "张三",
    sex: "男",
    age: 12,
    class: "1班",
    score: 60,
  },
  {
    key: "5",
    name: "张三",
    sex: "男",
    age: 12,
    class: "1班",
    score: 60,
  },
  {
    key: "5",
    name: "张三",
    sex: "男",
    age: 12,
    class: "1班",
    score: 60,
  },
  {
    key: "5",
    name: "张三",
    sex: "男",
    age: 12,
    class: "1班",
    score: 60,
  },
];

export default class StudentList extends React.Component {
  render() {
    return (
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 5 }}
        pageSizeOptions={[6, 6]}
      />
    );
  }
}
