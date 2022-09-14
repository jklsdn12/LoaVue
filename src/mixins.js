import axios from 'axios';

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