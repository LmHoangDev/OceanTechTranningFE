import { Button, Input, Modal, Space, Table } from "antd";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAddTaskByUser,
  fetchDeleteTaskByUser,
  fetchListTaskByUser,
  fetchUpdateTaskByUser,
} from "../../features/task/taskSlice";
import ToastComponent from "../ToastNotification";
import { handleToast } from "../ToastNotification/toast";
import styled from "styled-components";
export default function TableAntd() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [valFilter, setValFilter] = useState("");
  const { arrTask, error, loading } = useSelector((state) => state.task);
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    title: "",
    isFinish: "",
    id: "",
  });
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => {
        let titleA = a.title.toLowerCase().trim();
        let titleB = b.title.toLowerCase().trim();
        if (titleA > titleB) {
          return 1;
        }
        return -1;
      },
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Status",
      dataIndex: "isFinish",
      key: "isFinish",
      render: (text, item, index) => {
        return (
          <>
            {item.isFinish ? (
              <span className="text-success">Hoàn thành</span>
            ) : (
              <span className="text-danger">Chưa hoàn thành</span>
            )}
          </>
        );
      },
    },
    {
      title: "Action",
      key: "Action",
      render: (text, item) => (
        <Space size="middle">
          <Button
            type="primary"
            className="bg-success"
            onClick={() => {
              showModal(item.title, item.isFinish, item.id);
              console.log("Item can edit", item.title, item.isFinish, item.id);
            }}
          >
            Edit
          </Button>
          <Button
            onClick={() => {
              dispatch(fetchDeleteTaskByUser(item.id));
              console.log(item.id);
              return handleToast("success", "Xóa công việc thành công !!");
            }}
            type="primary"
            danger
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];
  //   const SelectStyle = styled(select)`
  //     outlined: none;
  //   `;
  // tao flag check lan dau tien khi disabled checkbox hay ko
  const refCheckBox = useRef();
  useEffect(() => {
    dispatch(fetchListTaskByUser());
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleChangeCheckBox = (event) => {
    if (event.target.type === "checkbox" && !event.target.checked) {
      setValues({ ...values, [event.target.name]: "" });
    } else {
      setValues({ ...values, [event.target.name]: event.target.value });
    }
    console.log("isFinished", !!values.isFinish);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (values.title.length > 0) {
      dispatch(
        fetchAddTaskByUser({
          title: values.title,
        })
      );
      setValues({
        ...values,
        title: "",
      });
      return handleToast("success", "Thêm công việc thành công!!");
    } else {
      return handleToast("error", "Title is required!!");
    }
  };

  ///Modal edit task
  const showModal = (titleTask, status, idTask) => {
    if (status) {
      refCheckBox.current = status;
    } else {
      refCheckBox.current = false;
    }
    console.log("UseRef", refCheckBox);
    console.log("Task can edit", {
      title: titleTask,
      isFinish: !!status,
      id: idTask,
    });
    setIsModalVisible(true);
    setValues({
      ...values,
      title: titleTask,
      isFinish: !!status,
      id: idTask,
    });
  };

  const handleOk = (e) => {
    setIsModalVisible(false);
    handleEditTask(e);
    setValues({
      ...values,
      isFinish: false,
      id: "",
      title: "",
    });
  };
  const handleEditTask = async (e) => {
    e.preventDefault();
    if (values.title.trim().length > 0) {
      const formData = {
        title: values.title,
        isFinish: !!values.isFinish,
      };
      console.log("Data sau khi khi update:", formData);
      await dispatch(fetchUpdateTaskByUser({ ...formData, id: values.id }));
      await dispatch(fetchListTaskByUser());
      return handleToast("success", "Cập nhật công việc thành công !!");
    } else {
      return handleToast("error", "Cập nhật công việc thất bại!!");
    }
  };
  const handleCancel = () => {
    setIsModalVisible(false);
    setValues({
      ...values,
      isFinish: false,
      id: "",
      title: "",
    });
  };
  useEffect(() => {
    dispatch(fetchListTaskByUser());
  }, []);
  function onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }

  /// Filter status
  const handleChangeFilter = (e) => {
    setValFilter(e.target.value);
    console.log(e.target.value, valFilter);
    if (e.target.value === "" || e.target.value === "all")
      dispatch(fetchListTaskByUser());
    else if (e.target.value === "finish") {
      dispatch(fetchListTaskByUser(true));
    } else {
      dispatch(fetchListTaskByUser(false));
    }
  };
  return (
    <>
      {" "}
      <ToastComponent />
      <div className="container py-3">
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="row">
              <h5 className="text-lg-left text-sm-center text-danger text-uppercase col-9">
                Bảng công việc
              </h5>
              <div className="col-3 d-flex justify-content-center align-items-center">
                <select
                  value={valFilter}
                  onChange={handleChangeFilter}
                  className="border-0 p-1 filter-dropdown"
                  defaultValue=""
                >
                  <option value="">--Chọn--</option>
                  <option value="all">Tất cả</option>
                  <option value="finish">Đã hoàn thành</option>
                  <option value="unFinish">Chưa hoàn thành</option>
                </select>
              </div>

              {/* <p>{valFilter}</p> */}
            </div>
          </div>
          <form
            className="col-12 col-md-6 d-flex justify-content-end align-items-center"
            onSubmit={handleSubmit}
          >
            <Input
              type="text"
              name="title"
              onChange={handleChange}
              htmlType="submit"
              placeholder="Thêm công việc"
              value={values.title}
            />
            <Button type="primary" htmlType="submit">
              Thêm
            </Button>
          </form>
        </div>
        <Table
          columns={columns}
          dataSource={arrTask}
          onChange={onChange}
          rowKey={"id"}
        />
        <Modal
          title="Cập nhật công việc"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <form onSubmit={handleEditTask}>
            <div className="form-group">
              <input type="hidden" value={values.id} />
              <label htmlFor="title">Title</label>
              <Input
                type="text"
                id="title"
                placeholder="Enter title"
                name="title"
                value={values.title}
                onChange={handleChange}
              />
            </div>
            <div className="form-group mt-2">
              <label htmlFor="isFinish">Đã hoàn thành</label>
              <input
                type="checkbox"
                id="isFinish"
                name="isFinish"
                style={{ marginLeft: 5 }}
                checked={values.isFinish}
                onChange={handleChangeCheckBox}
                disabled={refCheckBox.current ? true : false}
              />
            </div>
          </form>
        </Modal>
      </div>
    </>
  );
}
