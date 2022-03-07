import { baseService } from "./baseService";

export class TaskService extends baseService {
  constructor() {
    super();
  }
  addTask = (id, data) => {
    return this.post(`users/${id}/tasks`, data);
  };
  updateTask = (idUser, idTask, data) => {
    return this.put(`users/${idUser}/tasks/${idTask}`, data);
  };
  deteleTask = (idUser, idTask) => {
    return this.delete(`users/${idUser}/tasks/${idTask}`);
  };
  getAllTask = (idUser, isFinish = "") => {
    if (isFinish === "") {
      return this.get(`users/${idUser}/tasks`);
    } else {
      return this.get(`users/${idUser}/tasks?isFinish=${isFinish}`);
    }
  };
  getDetailTask = (idUser, idTask) => {
    return this.get(`/users/${idUser}/tasks/${idTask}`);
  };
}

export const taskService = new TaskService();
