



const getAll = (req, res) => {

    const parametro = req.params.busqueda
    res.json({message: 'holaaaa', parametro});
}




module.exports = {getAll}