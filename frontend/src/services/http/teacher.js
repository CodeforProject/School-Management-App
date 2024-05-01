import axios from 'axios';

class TeacherService {
    async registerTeacher(teacherData) {
        try {
            console.log("data4",teacherData)
            
            const response = await axios.post('https://backend-2-8rr7.onrender.com/api/teacher', teacherData);
            console.log("data1", response.data);
            return response.data;
        } catch (error) {
            console.error('Error in registerTeacher:', error.response ? error.response.data : error.message);
            return []; 
        }
    }
    async getTeacher() {
        try {
            const response = await axios.get('https://backend-2-8rr7.onrender.com/api/teacher/teacher-list');
            console.log("data1", response.data);
            return response.data;
        } catch (error) {
            console.error('Error in getTeacher:', error);
            return []; 
        }
    }
    async getTeacherSalary() {
        try {
            const response = await axios.get('https://backend-2-8rr7.onrender.com/api/teacher/total-salary');
            console.log("data1", response.data);
            return response.data;
        } catch (error) {
            console.error('Error in getTeacher:', error);
            return []; 
        }
    }
    
    async deleteTeacher(teacherId) {
        try {
            console.log("id8",teacherId)
            
            const response = await axios.delete('https://backend-2-8rr7.onrender.com/api/teacher/delete', {
                data:{
                    teacherId:teacherId}});
            console.log("data1", response.data);
            return response.data;
        } catch (error) {
            console.error('Error in deleteTeacher:', error.response ? error.response.data : error.message);
            return []; 
        }
    }
}

const teacherService = new TeacherService();
export default teacherService;
