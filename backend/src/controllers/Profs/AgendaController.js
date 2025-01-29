import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const createAgenda = async (req,res)=>{
    const {id_prof,tache,date_tache} = req.body

    try{
        const newProgramme = await prisma.programmeAgenda.create({
            data:{
                id_prof,
                tache,
                date_tache
            }
        })

        return res.status(200).json({newProgramme})

    }catch(error){
        return res.status(500).json({errorMessage: "Erreur lors de l'ajout du nouveau programme ", error})
    }
}

export const listPrograms = async (req,res)=>{
    const {id_prof} = req.params
    try{
        const programs = await prisma.programmeAgenda.findMany({
            where:{
                id_prof: parseInt(id_prof)
            }
        })

       return res.status(200).json(programs)

    }catch(error){
        return res.status(500).json(error)
    }
}