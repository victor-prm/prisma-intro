import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express()

// Accept requests from anywhere
app.use(cors())

// Expect incoming dato to be JSON
app.use(express.json())


//FIND ALL
app.get("/bolscher", async (_, res) => {
    let bolscher = await prisma.bolsche.findMany();
    res.json(bolscher)
})

//FIND BY ID
app.get("/bolscher/:id", async (req, res) => {
    let params = req.params
    let paramsID = Number(params.id);
    //console.log(param_)
    let bolsche = await prisma.bolsche.findUnique(
        {
            where: { id: paramsID }
        }
    )
    res.json(bolsche)
})

//CREATE NEW 
app.post("/bolscher", async (req, res) => {
    let body = req.body
    let bolsche = await prisma.bolsche.create(
        {
            data: {
                navn: body.navn,
                farve: body.farve,
                vægt: body.vægt,
                surhed: body.surhed,
                styrke: body.styrke,
                smag: body.smag,
                omkostninger: body.omkostninger
            }
        }
    )
    res.json(bolsche)
    return res.status(201).end()
})

//DELETE BY ID
app.delete("/bolscher", async (req, res) => {
    let body = req.body
    let bolsche = await prisma.bolsche.findUnique(
        {
            where: { id: body.id }
        }
    )

    if (!bolsche) {
        return res.status(404).json({ message: "Bolschet findes ikke!" })
    }

    await prisma.bolsche.delete(
        {
            where: { id: body.id }
        }
    )
    return res.status(204).end()
})

//UPDATE BY ID
app.patch("/bolscher", async (req, res) => {
    let body = req.body
    let bolsche = await prisma.bolsche.findUnique(
        {
            where: { id: body.id }
        }
    )

    if (!bolsche) {
        return res.status(404).json({ message: "Bolschet findes ikke!" })
    }

    await prisma.bolsche.update(
        {
            where: { id: body.id },
            data: body
        }
    )
    return res.status(204).end()
})



/*

fetch(url, {
    method: "POST"
    header...
    body...
})

*/


app.listen(4000, () => {
    console.log("Listening for requests on port 4000")
})