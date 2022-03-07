import { Button, Input, Modal } from "antd";
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
export default function Task() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { arrTask, error, loading } = useSelector((state) => state.task);
  const [values, setValues] = useState({
    title: "",
    isFinish: "",
    id: "",
  });

  const dispatch = useDispatch();

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
  const renderTask = () => {
    return arrTask?.map((item, index) => {
      return (
        <tr key={index}>
          <td colSpan="1">{item.id}</td>
          <td colSpan="3">{item.title}</td>
          <td colSpan="2">
            {item.isFinish ? (
              <span className="text-success">Finished</span>
            ) : (
              <span className="text-danger">Unfinished</span>
            )}
          </td>
          <td colSpan="1">
            <Button
              type="primary"
              className="bg-success"
              onClick={() => {
                showModal(item.title, item.isFinish, item.id);
                console.log(
                  "Item can edit",
                  item.title,
                  item.isFinish,
                  item.id
                );
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
          </td>
        </tr>
      );
    });
  };
  return (
    <div
      style={{ minHeight: 400, width: "80%", margin: "0 auto" }}
      className="table-responsive"
    >
      <ToastComponent />
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
      <div className="container py-3">
        <div className="row">
          <div className="col-12 col-md-6">
            <h3 className="text-lg-left text-sm-center text-danger text-uppercase">
              Bảng công việc
            </h3>
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
      </div>
      {arrTask.length > 0 ? (
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th colSpan="1">ID</th>
              <th colSpan="3">TITLE</th>
              <th colSpan="2">STATUS</th>
              <th colSpan="1">ACTION</th>
            </tr>
          </thead>
          <tbody>{renderTask()}</tbody>
        </table>
      ) : (
        <p className="text-center text-danger">(No data ....)</p>
      )}
    </div>
  );
}
