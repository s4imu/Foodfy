const db = require('../../config/db')

module.exports = {
    create(data){
        const query = `
        INSERT INTO files (
            name,
            path
        ) VALUES ($1, $2)
        RETURNING id`
        const values = [
            data.filename,
            data.path,
        ]
        try{
            return db.query(query, values)
        } catch (err) {
            throw new Error(err)
        }  
    },
    createRecipeFiles(fileId, recipeId){
        const query = `
            INSERT INTO recipe_files (
                recipe_id,
                file_id
            ) VALUES ($1, $2)
        `
        const values = [
            recipeId,
            fileId
        ]
        try{
            return db.query(query, values)
        } catch (err) {
            throw new Error(err)
        }  
    }
}