const { date } = require('../../lib/utils')
const db = require('../../config/db')

module.exports = {
    all() {
        return db.query(`
        SELECT recipes.*, chefs.name AS author
        FROM recipes
        LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
        ORDER BY title ASC`)
    },
    create(data) {
        const query = `
        INSERT INTO recipes (
            title,
            ingredients,
            preparation,
            information,
            created_at
        ) VALUES ($1, $2, $3, $4, $5)
        RETURNING id`

        const values = [
            data.title,
            data.ingredients,
            data.preparation,
            data.information,
            date(Date.now()).iso
        ]

        return db.query(query, values)
    },
    find(id) {
        return db.query(`
        SELECT *
        FROM recipes
        WHERE recipes.id = $1`, [id])
    },
    update(data) {

        const query = `
        UPDATE recipes SET
            title=($1),
            ingredients=($2),
            preparation=($3),
            information=($4),
            chef_id=($5)
        WHERE id = $6
        `
        const values = [
            data.title,
            data.ingredients,
            data.preparation,
            data.information,
            data.chef_id,
            data.id
        ]

        return db.query(query, values)
    },
    delete(id) {

        return db.query(`DELETE from recipes WHERE id = $1`, [id])
    },
    chefRecipes(id) {
        return db.query(`
            SELECT *
            FROM recipes
            WHERE recipes.chef_id = $1`)
    },
    chefSelectOption() {
        return db.query(`
        SELECT name, id 
        FROM chefs
        `)
    },
    findBy(filter) {
        return db.query(`
        SELECT recipes.*, chefs.name AS author
        FROM recipes
        LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
        WHERE recipes.title ILIKE '%${filter}%'
        ORDER BY title ASC`)

    }
}