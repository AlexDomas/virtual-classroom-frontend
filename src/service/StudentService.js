import remoteService from "./RemoteService";

export default class StudentService {

    static async getAll() {
        let response = (await remoteService.get("students/"));
        return response.data;
    }
    
    static async createStudent(student) {
        let response = (await remoteService.post("students/login", student));
        return response;
    }

    static async raiseHand(id, student) {
        let response = (await remoteService.put("students/" + id, student));
        return response.status;
    }

    static async deleteById(id) {
        let response = (await remoteService.delete("students/" + id));
        return response.status;
    }

}