import { useDispatch, useSelector } from "react-redux";
import { HomeContainer, Header, MainContent, Card, Button, JsonView, StatusBar } from "./Home.styled";
import { getPosts } from "../../../apis/postApi";
import { useEffect } from "react";
import { getProducts } from "../../../apis/productApi";

const Home = () => {

    const dispatch = useDispatch();
    const { posts, postStatus } = useSelector((state) => state.post);
    const { products, productStatus } = useSelector((state) => state.product);

    const handleGetPosts = () => {
        dispatch(getPosts());
    };

    const handleGetProducts = () => {
        dispatch(getProducts());
    };


    useEffect( () => {
        console.log("Posts state updated:");
        console.log(posts);
        console.log("Products state updated:");
        console.log(products);
    }, [posts, products]);

    return (
        <HomeContainer>
            <Header>
                <h1>API Playground</h1>
                <p>Minimalist REST Client</p>
            </Header>

            <MainContent>
                {/* --- POSTS SECTION --- */}
                <Card>
                    <div className="card-header">
                        <div className="meta">
                            <h3>Posts</h3>
                            <span className="endpoint">GET /api/v1/posts</span>
                        </div>
                        <Button onClick={handleGetPosts} disabled={postStatus.loading}>
                            {postStatus.loading ? "Fetching..." : "Send Request"}
                        </Button>
                    </div>
                    
                    <div className="card-body">
                        {(postStatus.status == 200 || posts) && (
                            <StatusBar status={postStatus.status}>
                                <span className="status">Status: {postStatus.status || '...'}</span>
                                <span className="time">{postStatus.time || "999+"}ms</span>
                            </StatusBar>
                        )}
                        <JsonView>
                            {posts 
                                ? JSON.stringify(posts, null, 2) 
                                : <span className="placeholder">// Waiting for request...</span>}
                        </JsonView>
                    </div>
                </Card>

                {/* --- PRODUCTS SECTION --- */}
                <Card>
                    <div className="card-header">
                        <div className="meta">
                            <h3>Products</h3>
                            <span className="endpoint">GET /api/v1/products</span>
                        </div>
                        <Button $primary onClick={() => handleGetProducts()} disabled={false}>
                            {productStatus.loading ? "Processing..." : "Send Request"}
                        </Button>
                    </div>

                    <div className="card-body">
                        {(productStatus.status || products) && (
                            <StatusBar status={productStatus.status}>
                                <span className="status">Status: {productStatus.status || '...'}</span>
                                <span className="time">{productStatus.time}ms</span>
                            </StatusBar>
                        )}
                        <JsonView>
                             {products 
                                ? JSON.stringify(products, null, 2) 
                                : <span className="placeholder">// Ready to fetch data...</span>}
                        </JsonView>
                    </div>
                </Card> 
            </MainContent>
        </HomeContainer>
    );
};

export default Home;