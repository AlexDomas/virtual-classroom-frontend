import remoteServer from "./RemoteService";

export default class StudentService {

    static async getAll() {
        let response = (await remoteServer.get("students/"));
        return response.data;
    }
    
    static async createStudent(student) {
        let response = (await remoteServer.post("students/", student));
        return response;
    }

}