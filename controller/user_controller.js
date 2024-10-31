import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const getAllUser = async(req, res) => {
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
export const getUserById = async(req, res) => {
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
export const addUser = async(req, res) => {
    try {
        const {nama, username, password} = req.body
        const result = await prisma.user.create({
            data:{
                nama_user: nama, 
                username: username,
               password : password
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
export const UpdateUser = async(req, res) => {
    try {
        const {nama, usename, password} = req.body
        const result = await prisma.user.update({
            where:{
                id_user : req.params.id
            },
            data:{
                nama_user: nama, 
                username: usename,
                password: password
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
export const DelateUser = async(req, res) => {
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
    }
}