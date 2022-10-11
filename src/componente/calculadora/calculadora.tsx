import React, { useState, ChangeEvent } from 'react';
import Calc from '../../model/Calc'
import { post } from '../../service/service'
import { Grid, TextField, Typography, Button, Box } from '@material-ui/core'
import "./calculadora.css"

/*Explicação do projeto para Korp

Baseado no teorema de pitagoras desenvolvi uma calculadora que calcula qualquer um dos lados do triangulo retangulo! Tratava-se de um desafio proposto.


*/

export default function Calcular() {

    /*Estado do componente capturado em tela*/
    const [useCalc, setCalc] = useState<Calc>({
        catetooposto: 0,
        catetoadjacente: 0,
        hipotenusa: 0,
        resultado: 0
    })

    /*Resposta da API ou "fake API"*/
    const [useResp, setResp] = useState<Calc>({
        catetooposto: 0,
        catetoadjacente: 0,
        hipotenusa: 0,
        resultado: 0
    })

    /*Atualizando o State */
    function updatedModel(e: ChangeEvent<HTMLInputElement>) {
        setCalc({
            ...useCalc,
            [e.target.name]: e.target.value
        })
    }

    /*Submetendo recurso*/
    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault(); /*previnindo comportamento padrão da tela*/

        try {
            await post(`/angulos`, useCalc, setResp)
            console.log("oooooooooook")
            console.log(useResp) /*testando retorno*/

        } catch (error) {
            console.log("Falhou")
        }
    }


    /*Componente*/
    return (
        <>
            <Grid container id='cont'>
                <Box id="box1">
                    <form onSubmit={onSubmit}>
                            <Typography variant="h1" id='titulo'>Pitagoras Calc</Typography>
                            <Box id='boxinput'>
                            <TextField
                                type='number'
                                id='catetooposto'
                                name='catetooposto'
                                label="Cateto Oposto"
                                value={useCalc.catetooposto}
                                onChange={((e: ChangeEvent<HTMLInputElement>) => updatedModel(e))}
                                className='inputs'
                            />
                            <TextField
                                type='number'
                                id='catetoadjacente'
                                name='catetoadjacente'
                                label="Cateto Adjacente"
                                value={useCalc.catetoadjacente}
                                onChange={((e: ChangeEvent<HTMLInputElement>) => updatedModel(e))}
                                className='inputs'
                            />
                            <TextField
                                type='number'
                                id='hipotenusa'
                                label='Hipotenusa'
                                name='hipotenusa'
                                value={useCalc.hipotenusa}
                                onChange={((e: ChangeEvent<HTMLInputElement>) => updatedModel(e))}
                                className='inputs'
                            />
                        </Box>
                        <Button id='button' type='submit' variant="text" color="default">Calcular</Button>
                    </form>
                    <h2>{useResp.resultado}</h2>
                </Box>
                
            </Grid>
        </>
    );
}