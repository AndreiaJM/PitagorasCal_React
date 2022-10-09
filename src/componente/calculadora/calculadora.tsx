import React, { useState, ChangeEvent } from 'react';
import Calc from '../../model/Calc'
import { post } from '../../service/service'
import { useHistory } from 'react-router-dom'
import { Grid, TextField, Typography, Button, Box } from '@material-ui/core'
import "./calculadora.css"

export default function Calcular() {

    /*Estado do componente*/
    const [useCalc, setCalc] = useState<Calc>({
        catetooposto: 0,
        catetoadjacente: 0,
        hipotenusa: 0,
        resultado: 0
    })

    /*Resposta da API*/
    const [useResp, setResp] = useState<Calc>({
        catetooposto: 0,
        catetoadjacente: 0,
        hipotenusa: 0,
        resultado: 0
    })

    function updatedModel(e: ChangeEvent<HTMLInputElement>) {
        setCalc({
            ...useCalc,
            [e.target.name]: e.target.value
        })
    }

    let history = useHistory();

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            await post(`/angulos`, useCalc, setResp)
            console.log("oooooooooook")
            console.log(useResp)


        } catch (error) {
            console.log("Falhou")
        }
    }



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