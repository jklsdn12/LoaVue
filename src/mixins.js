import axios from 'axios';
axios.defaults.baseURL = 'http://211.53.209.103:8080';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export default  {
    methods : {
        async $callAPI(url, method, data) {
            return (
                await axios({
                    method: method,
                    url: url,
                    data: data,
                }).catch((e) => {
                    console.log(e);
                })
            ).data;
        },
        $base64(file){
            return new Promise(resolve => {
                var a = new FileReader()
                a.onload = e => resolve(e.target.result);
                a.readAsDataURL(file);
            });
        },
        $currencyForrmat(value, format = '#,###'){
            if(value ==0 || value == null) return 0;
            var currency = format.substring(0,1);
            console.log(currency);
        }

    }
}