const user = require('../../Models/users')

const GetAllFiles = async(req,res) => {
    const new_data = req.data;
    const {email,name} = new_data

    const data = await user.find({ email: email })
    function buildTree(objects, parentId = null) {
      const tree = [];
      for (const obj of objects) {
        if (obj.parent === parentId) {
          const children = buildTree(objects, obj._id);
          if (children.length > 0) {
            obj.children = children;
          }
          tree.push(obj);
        }
      }
      return tree;
    }
      
      const tree = buildTree(data[0].files);
    try{
        res.json({username:name , data:data[0].files, status:200, tree})
    }
    catch{
        res.json({status:500})
    }
}

module.exports = {
    GetAllFiles
}