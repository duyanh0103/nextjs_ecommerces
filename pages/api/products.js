import { Product } from "../../models/Product";
import { mongooseConnect } from "../../lib/mongoose";

export default async function handle(req, res) {
    const { method } = req;
    // mongoose.connect(clientPromise.url) //url db
    // mongoose.Promise = clientPromise; //connection
    await mongooseConnect();

    if (method === "GET") {
        if (req.query?.id) {
            res.json(await Product.findOne({_id:req.query.id}));
        } else {
            // the 'res.json()' function is used to send the list of products in JSON format as the response to the client's request.
            res.json(await Product.find())
        }

    }

    if (method === 'POST') {
        // create a product
        // TODO: to put product inside the database => use mongoose to create database layer connection
        const { title, description, price } = req.body;
        const productDoc = await Product.create({
            title, description, price,
        })
        res.json(productDoc);
    }

    if (method === 'PUT') {
        const { title, description, price, _id} = req.body;
        // update product
        await Product.updateOne({_id},{title,description, price});
        res.json(true);
    }

    if (method === 'DELETE') {
        if (req.query?.id) {
            await Product.deleteOne({_id:req.query?.id});
            res.json(true)
        }
    }
}