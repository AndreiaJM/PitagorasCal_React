import axios from 'axios'
import React from 'react'

export const api = axios.create({
    baseURL: 'https://my-json-server.typicode.com/AndreiaJM/fakeapi-teste'
})


export const post = async (url: any,dados:any,setDados:any) => {
    const resposta = await api.post(url,dados)
    calcular(resposta)
    setDados(resposta.data)
}

//função para realizar o calculo de qualquer um dos lados do teorema de pitagoras
const calcular=(res:any)=>{
    var hpt=Number(res.data.hipotenusa)
    var ca=Number(res.data.catetoadjacente)
    var co=Number(res.data.catetooposto)
    var result:any

    if(co!=0 && ca!=0 && co<ca && hpt==0){
        result=Math.pow(co,2)+Math.pow(ca,2)
    }else if(ca!=0 && hpt!=0 && ca<hpt && co==0){
        result=Math.pow(hpt,2)-Math.pow(ca,2)
    }else if(co!=0 && hpt!=0 &&  co<hpt && ca==0){
        result=Math.pow(hpt,2)-Math.pow(co,2)
    }else{
        result="Não é triangulo retangulo, verifique os dados e tente novamente"
    }
    res.data.resultado=result

}


