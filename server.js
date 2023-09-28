import express from 'express'

const app = express();

const PORT = 5000;

app.use(express.json())
app.listen(PORT, () => { console.log(`Server is running on Port ${PORT}`) })

const movies =
    [
        { id: 0, title: 'Jaws', year: 1975, rating: 8 },
        { id: 1, title: 'Avatar', year: 2009, rating: 7.8 },
        { id: 2, title: 'Brazil', year: 1985, rating: 8 },
        { id: 3, title: 'الإرهاب والكباب', year: 1992, rating: 6.2 }
    ]
    let currentId = 3;

app.get('/test', (req, res) => {
    res.status(200).json({ message: "test" })
})
app.get('/hello/:id?/', (req, res) => {
    const id = req.params.id || "";
    res.status(200).json({ message: `Hello ${id}` })
})



app.get('/test', (req, res) => {
    res.status(200).json({ message: "test" })
})


app.get('/search', (req, res) => {
    const search = req.query.s
    if (search) {
        res.status(200).json({ message: search })

    }
    else {
        res.status(500).json({ message: "error no search param" })

    }
})
app.get('/movies/read/:sortParam?', (req, res) => {
    const sortParam = req.params.sortParam;
    if (!sortParam) {
        return res.status(200).json({ data: movies })

    }
    else {
        let sort = ""
        if (sortParam == 'by-date')   { sort = "year" }
        if (sortParam == 'by-title')  { sort = "title" }
        if (sortParam == 'by-rating') { sort = "rating" }

        movies.sort(function (a, b) {
            a = a[sort];
            b = b[sort];
            if (sort === 'title') {
                a.toLowerCase();
                b.toLowerCase();
            }
            if (sort === 'rating') {
                if (a > b) { return -1 }
                if (a < b) { return 1 }
            } else {
                if (a > b) { return 1 }
                if (a < b) { return -1 }
            }
            return 0;

        })

        return res.status(200).json({ data: movies })
    }

    return res.status(500).json({ message: "error no movies found" })


})
app.get('/movies/add', (req, res) => {

    if (movies) {
        res.status(200).json({ data: movies })

    }
    else {
        res.status(500).json({ message: "error no movies found" })

    }
})

app.get('/movies/read/id/:id?', (req, res) => {
    const id = req.params.id;
    const index = movies.findIndex(obj => obj.id == id)
    if (index === -1) {
        res.status(200).json({ message: "No movie found" })

    }
    res.status(200).json({ data: movies[index] })

})


app.post('/movies/add/', (req, res) => {
    const {year,title,rating=4} = req.query;
    if(!(year && title) || year.length !== 4 ){
        return res.status(200).json({ message: "no proper year or title values" })

    }
    else{
        currentId++;
        const movie= {};
        movie.id = currentId;
        movie.title = title;
        movie.year = parseInt(year);
        movie.rating = parseFloat(rating);
        movies.push(movie)
        return res.status(200).json({ data: movies })


    }
   return res.status(200).json({ message: rating })

    const index = movies.findIndex(obj => obj.id == id)
    if (index === -1) {
        res.status(200).json({ message: "No movie found" })

    }
    // res.status(200).json({ data: movies[index] })

})

app.delete('/movies/delete/:id?', (req, res) => {
    const id = req.params.id;
    const index = movies.findIndex(obj => obj.id == id)
    if (index === -1) {
        res.status(200).json({ message: "No movie found" })

    }
    movies.splice(index,1)
    res.status(200).json({ data: movies })

})