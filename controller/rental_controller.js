import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const getAllRental = async(req, res) => {
    try {
        const result = await prisma.transaksi.findMany()
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
export const getRentalById = async(req, res) => {
    try {
        const result = await prisma.transaksi.findUnique({
            where:{
                id_transaksi: req.params.id 
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
export const addRental= async(req, res) => {
    let {id_user, id_meja, id_menu, nama_pelanggan} = req.body

    const [getUserId, getMejaId, getMenuId] = await Promise.all([
        prisma.user.findUnique({ where: { id_user: Number(id_user) } }),
        prisma.meja.findUnique({ where: { id_meja: Number(id_meja) } }),
        prisma.menu.findUnique({ where: { id_menu: Number(id_menu) } })
    ]);
    if(getUserId && getMenuId){
        try { 
            const result = await prisma.transaksi.create({
                data:{
                    nama_pelanggan: nama_pelanggan,
                    user:{
                        connect:{
                            id_user: Number(id_user)
                        }
                    },
                    meja:{
                        connect:{
                            id_meja: Number(id_meja)
                        }
                    }
                }
            })
            if(result){
                const createDetail = await prisma.detail_Transaksi.create({
                    data:{
                        transaksi:{
                            connect:{
                                id_transaksi: result.id_transaksi,
                            }
                        },
                        menu :{
                            connect:{
                                id_menu: Number(id_menu)
                            }
                        },
                        total_harga: getMenuId.harga
                    }
                })
                res.status(200).json({
                    success: true,
                    transaksi: result,
                    detail: createDetail
                });
            }else{
                res.status(400).json({msg: "transaksi gagal"})
            }
        } catch (error) {
            console.log(error)
            res.status(404).json({msg: error.message})
        }
    }else{
        res.json({msg: "pilih user, meja, dan menu yg tersedia"})
    }
}
export const UpdateTransaksi = async(req, res) => {
    try {
        const {tgl_transaksi, nama_pelanggan} = req.body
        const result = await prisma.transaksi.update({
            where:{
                id_transaksi : req.params.id
            },
            data:{
                tgl_transaksi : tgl_transaksi,
                nama_pelanggan : nama_pelanggan
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
export const DelateTransaksi = async(req, res) => {
    try {
        const result = await prisma.transaksi.delate({
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