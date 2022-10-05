import axios from 'axios';
axios.defaults.withCredentials = true;

export default  {
    methods : {
        async $callAPI(url, method, data, rtnfunc) {
            return (
                await axios({
                    method: method,
                    url: url,
                    data: data
                }).then(function(response){
                    if(response.data.length > 10 && response.data.indexOf("Session empty") > -1){
                        alert("세션이 종료되었습니다. 다시 로그인 바랍니다.");
                        localStorage.setItem('id', "" );
                        location.href="/userLogin";
                    }
                    rtnfunc(response.data);
            }).catch((e) => {
                    console.log(e);
                })
            );
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
