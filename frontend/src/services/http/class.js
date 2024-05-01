import axios from 'axios';

class ClassService {
    async registerClass(classData) {
        try {
            
            const response = await axios.post('https://backend-2-8rr7.onrender.com/api/class', classData);
            console.log("data1", response.data);
            return response.data;
        } catch (error) {
            console.error('Error in registerClass:', error.response ? error.response.data : error.message);
            return []; 
        }
    }
    async getClass() {
        try {
            const response = await axios.get('https://backend-2-8rr7.onrender.com/api/class/class-list');
            console.log("data1", response.data);
            return response.data;
        } catch (error) {
            console.error('Error in getClass:', error);
            return []; 
        }
    }
    async getStudent() {
        try {
            const classData = JSON.parse(localStorage.getItem('classItem'));

      
        console.log("class",classData.className)
        
        
        const response = await axios.get('https://backend-2-8rr7.onrender.com/api/class/student-list', {
            params: {
                className: classData.className
              }
        });
          console.log("data1", response.data);
          return response.data;
        } catch (error) {
          console.error('Error in getStudent:');
          return []; 
        }
    }
    async deleteClass(classId) {
        try {
            console.log("id1",classId)
            
            const response = await axios.delete('https://backend-2-8rr7.onrender.com/api/class/delete', {
                data:{
                    classId:classId}});
            console.log("data1", response.data);
            return response.data;
        } catch (error) {
            console.error('Error in registerClass:', error.response ? error.response.data : error.message);
            return []; 
        }
    }
}

const classService = new ClassService();
export default classService;
