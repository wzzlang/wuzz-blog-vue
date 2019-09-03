

import axios from 'axios'







axios.interceptors.request.use(config => {

alert(1)
},error => {

});
