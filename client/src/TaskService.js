import axios from 'axios';

const url = 'api/taskslist/'
/* eslint-disable no-async-promise-executor */
class TaskService{
    //Get Task
    static getTasks(){
        return new Promise(async(resolve, reject)=>{
            try{
                const res = await axios.get(url);
                const data = res.data;
                resolve(
                    data.map(task=>({
                        ...task,
                        dateCreated: new Date(task.dateCreated)
                    }))
                )
            }catch(err){
                reject(err);
            }
        })
    }
    //Create Task
    static insertTask(task){
        return axios.post(url, {
            task
        })
    }
    //Delete Task
    static deleteTask(id){
        return axios.delete(`${url}${id}`);
    }
}
export default TaskService;