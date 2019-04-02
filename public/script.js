var app = new Vue({
    el: '#reviews',
    data: {
        itemSelected: "",
        review: "",
        name: "",
        reviews: [],
        addItem: "",
    },
    methods: {
        async getReviews() {
            try {
                let response = await axios.get("/api/get/" + this.itemSelected);
                console.log(response);
                this.reviews = response.data;
                return true;
            } catch(error) {
                console.log(error);
            }
        },
        async addReview() {
            try {
                let response = await axios.post("/api/newReview", {
                    reviewerName: this.name,
                    review: this.review,
                    movie: this.itemSelected
                });
                this.addItem = response.data;
                this.getReviews();
            } catch(error) {
                console.log(error);
            }
        },
        async deleteReview(review) {
            try {
                console.log(review);
                let response = axios.delete("/api/delete/" + review);
                console.log(response);
                this.getReviews();
                return true;
            } catch (error) {
                console.log(error);
            }
        }
    },
});

// app.delete("/api/delete/:movie/:name", async (req, res) => {
//     console.log("Delete");
//     try{
//         await Item.deleteOne({
//             movie: req.body.movie,
//             reviewerName: req.body.name
//         });
//         res.sendStatus(200);
//     } catch(error) {
//         console.log(error);
//         res.sendStatus(500);
//     }
// });