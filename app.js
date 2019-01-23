const morgan = require("morgan");
const express = require("express");
const app = express();
// const {db, page, user} = require('./models');
const models = require('./models');
const wikiRouter = require('./routes/wiki')
const user = require('./routes/user')

const port = 3000;

app.use('/', wikiRouter);
app.use('/wiki', wikiRouter)

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
// app.use(express.urlencoded())

models.db.authenticate().then( () => {
    console.log("authenticated")
})

const init = async () => {
    await models.db.sync();
    app.listen(port, () => {
        console.log(`listening on ${port}`)
    })
}
init()

app.get('/', (req, res, next) => {
    res.redirect('/wiki');
})
