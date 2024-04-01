import express from "express";
import bodyParser from "body-parser";
import { v4 } from "uuid";

const app = express();
const port = 3000;
const posts = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(`public`));
app.set(`view engine`, `ejs`);


app.get(`/`, (req, res) => {
    res.render(`index`, { posts: posts })
});

app.get(`/post`, (req, res) => {
    res.render(`post`);
});

app.get(`/edit/:id`, (req, res) => {
    const postId = req.params.id;
    const post = posts.find(post => post.id === postId);

    if (post) {
        res.render('post', { post: post });
    }
});

app.get(`/delete/:id`, (req, res) => {
    const postId = req.params.id;
    const postIndex = posts.findIndex(post => post.id === postId);
    if (postIndex !== -1) {
        posts.splice(postIndex, 1);
    }

    res.redirect(`/`);
});

app.get(`/show-post/:id`, (req, res) => {
    const post = posts.find(post => post.id === req.params.id);
    if (post) {
        res.render(`show-post`, {post: post});
    }
});

app.post(`/post`, (req, res) => {
    const post = posts.find(post => post.id === req.body.id);

    if (post) {
        post.heading = req.body.title;
        post.content = req.body.content;

    } else {
        const newPost = {
            heading: req.body.title,
            content: req.body.content,
            id: v4()
        }
        posts.push(newPost);
    }
    res.redirect(`/`);

});


app.listen(port, () => {
    console.log(`Blog app listening at http://localhost:${port}`);
});
