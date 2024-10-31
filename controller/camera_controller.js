import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const getAllCamera= async(req, res) => {
    try {
        const result = await prisma.user.findMany()
        res.status(200).json({
            success: true,
            data : result
        })
    } catch (error) { 
        console.log(error);
        res.status(500).json({msg: Message.error})
    }
}
export const getCameraById = async(req, res) => {
    try {
        const result = await prisma.user.findUnique({
            where:{
                id_user: req.params.id 
            }
        })
        res.status(200).json({
            success: true,
            data : result
        })
    } catch (error) { 
        console.log(error);
        res.json({
            msg: Message.error
        })
    }
}
export const addCamera = async(req, res) => {
    try {
        const {name,brand,PricePerDay,status,desctription } = req.body
        const result = await prisma.user.create({
            data:{
                name : name,
                brand : brand,
                PricePerDay : PricePerDay,
                status : status,
                desctription: desctription
            }
        })
        res.status(200).json({
            success: true,
            data : result
        })
    } catch (error) { 
        console.log(error);
        res.json({
            msg: Message.error
        })
    }
}
export const UpdateCamera = async(req, res) => {
    try {
        const {name,brand,PricePerDay,status,desctription} = req.body
        const result = await prisma.user.update({
            where:{
                id_user : req.params.id
            },
            data:{
                name : name,
                brand : brand,
                PricePerDay : PricePerDay,
                status : status,
                desctription: desctription
            }
        })
        res.status(200).json({
            success: true,
            data : result
        })
    } catch (error) { 
        console.log(error);
        res.json({
            msg: Message.error
        })
    }
}
export const DelateCamera = async(req, res) => {
    try {
        const result = await prisma.user.delate({
            where:{
                success:req.params.id
            }
        })
        res.status(200).json({
            success: true,
            data : result
        })
    } catch (error) { 
        console.log(error);
        res.json({
            msg: Message.error
        })
    }}